---
title: "Serving LLMs on H100 vs. B300: Throughput, Latency, and Cost Notes"
date: 2026-08-14
tags: ["LLM Serving", "Hardware", "Inference"]
summary: "How I structure H100 vs. B300 comparisons so the throughput number does not hide the latency and cost story."
lang: en
canonical_url: ""
draft: true
---

GPU comparisons get flattened into one bar chart. For LLM serving, that chart is usually misleading. The useful question is not which card has more throughput; it is which configuration meets the latency target at the lowest cost per useful token.

## Cost per token

A simple starting point:

$$
C_{\text{1M tokens}} = \frac{\text{GPU hourly rate}}{\text{tokens per second} \times 3600} \times 10^6
$$

Run this at several concurrency levels. A configuration that looks cheap at maximum batch size can be useless when the p95 latency crosses the product's budget. B300 changes the compute and memory envelope, but the right batch size and sequence mix still decide the outcome.

![Two GPU profiles compared across throughput and latency](/images/h100-b300.svg "Figure 5. Compare cost at the latency target, not at peak throughput.")

## Benchmark protocol

- Fix model weights, quantization, and context length.
- Warm up the server, then measure p50 and p95 over multiple runs.
- Report prefill and decode separately.
- Include queueing time; it is part of the user experience.

```python
def cost_per_million(tokens_per_sec, gpu_hourly):
    return gpu_hourly / (tokens_per_sec * 3600) * 1_000_000

for concurrency, tps in [(1, 42), (8, 280), (32, 910)]:
    print(concurrency, round(cost_per_million(tps, 3.50), 3))
```

The practical takeaway is to tune for a latency SLO, then compare cost. Peak throughput is a hardware property; served cost is a systems property.

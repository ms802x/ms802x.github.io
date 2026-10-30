---
title: "Your post title"
date: 2026-01-15
tags: ["Tag One", "Tag Two"]
summary: "One or two sentences that explain what the post covers and why it is useful."
lang: en # en | ar
canonical_url: "" # Optional: original URL if this post was cross-posted
draft: true
---

Open with the problem, the constraint, and what you measured. Keep the first paragraph useful
without requiring the reader to scroll.

## Context

Explain the setup: model, hardware, dataset, or system. State the baseline.

![Describe the image](/images/your-image.svg "Figure 1. Add a useful caption here.")

## What I tried

Use `inline code` for symbols and a fenced block for runnable snippets.

```python
def measure(fn, runs=50):
    return [fn() for _ in range(runs)]
```

For a display equation:

$$
T_{\text{total}} = \sum_{i=1}^{N} t_i
$$

## What happened

Report the result, the caveat, and the next experiment. Link to related work where useful.

## Takeaway

End with the one thing you want the reader to remember.

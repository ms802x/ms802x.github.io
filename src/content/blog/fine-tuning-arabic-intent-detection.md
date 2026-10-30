---
title: "Fine-Tuning Arabic Intent Detection Models: Datasets, Pitfalls, and Results"
date: 2026-08-29
tags: ["Arabic NLP", "Intent Detection", "Fine-Tuning"]
summary: "What mattered when fine-tuning intent classifiers for Arabic: clean label boundaries, dialect splits, and resisting the urge to overfit a single test set."
lang: en
canonical_url: ""
draft: true
---

Intent detection looks like a straightforward classification task until the labels meet real users. Arabic adds another layer: the same intent can be phrased in MSA, Gulf, Egyptian, or a mix, and a model trained on one register often learns the vocabulary rather than the intent.

## Build the split before the model

I split by speaker and dialect where possible, then stratify by intent. Random row splits overstate performance because near-duplicate utterances land on both sides. A useful baseline is a small multilingual encoder plus a linear head.

The training objective is standard cross-entropy:

$$
\mathcal{L} = -\frac{1}{N}\sum_{i=1}^{N}\sum_{c=1}^{C} y_{i,c}\log \hat{p}_{i,c}
$$

![Utterances grouped into intent clusters with a dialect split](/images/intent-detection.svg "Figure 4. Split by speaker and dialect, then check per-intent recall.")

## Pitfalls I keep seeing

- Intents that overlap semantically but have different operational actions.
- Rare intents that disappear from the test set entirely.
- Preprocessing that removes useful negation cues.
- Evaluating only accuracy when the cost of a false positive is high.

```python
from collections import Counter

def report_per_intent(y_true, y_pred, labels):
    for label in labels:
        idx = [i for i, y in enumerate(y_true) if y == label]
        correct = sum(y_pred[i] == label for i in idx)
        print(label, f"{correct / max(1, len(idx)):.3f}", f"n={len(idx)}")
```

The most reliable improvement was not a bigger backbone. It was adding 300 carefully reviewed examples around the confusing intent boundaries.

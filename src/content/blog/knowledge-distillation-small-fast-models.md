---
title: "Knowledge Distillation for Small, Fast Models: What Worked and What Didn't"
date: 2026-09-27
tags: ["Distillation", "Efficiency", "Training"]
summary: "Notes on temperature, soft targets, and the failure modes that show up when a smaller student is asked to absorb a larger teacher."
lang: en
canonical_url: ""
draft: true
---

Distillation sounds simple: train a small student on the teacher's soft outputs. In practice, most of the work is in the data and the loss, not the model surgery. A student can match the teacher on the training distribution and still fail badly on the slice you care about.

## The loss

For a temperature $T$, the soft-target loss is a KL divergence between the teacher and student distributions:

$$
\mathcal{L}_{\text{KD}} = T^2 \, \mathrm{KL}\!\left(p_T(\text{teacher}) \,\|\, p_T(\text{student})\right)
$$

Mixing that with a hard-label cross-entropy term helped early in training. Later, it mostly added noise. The right mixing weight was task-specific, so I stopped treating it as a universal constant.

![A large teacher network transferring soft labels to a compact student](/images/distillation.svg "Figure 2. The student inherits the teacher's ranking behaviour, not necessarily its calibration.")

## What worked

- Distilling on augmented inputs, not just clean examples.
- Matching intermediate representations for the first few epochs.
- Evaluating on a hard, hand-curated slice before trusting aggregate accuracy.

## What didn't

A larger teacher was not automatically better. A teacher trained on a different label taxonomy produced confident but unhelpful targets. The student learned the taxonomy mismatch faster than the task.

```python
def kd_loss(student_logits, teacher_logits, temperature=2.0):
    student = (student_logits / temperature).log_softmax(dim=-1)
    teacher = (teacher_logits / temperature).softmax(dim=-1)
    return (teacher * (teacher.log() - student)).sum(dim=-1).mean()
```

The takeaway: treat distillation as a data-transfer problem. The teacher's outputs are a dataset, and that dataset needs the same scrutiny as any other.

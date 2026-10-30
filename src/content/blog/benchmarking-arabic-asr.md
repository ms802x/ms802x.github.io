---
title: "Benchmarking Arabic ASR Models: Whisper vs. Alternatives on Real-World Audio"
date: 2026-09-12
tags: ["Arabic NLP", "ASR", "Benchmarks"]
summary: "A benchmark design for Arabic speech that goes beyond clean read audio — and why WER alone can hide the failure modes that matter."
lang: en
canonical_url: ""
draft: true
---

Arabic ASR benchmarks are easy to make flattering. Use clean Modern Standard Arabic, strip diacritics, normalize every spelling variant, and most models look close. The gap appears when the audio is noisy, code-switched, or recorded in a dialect the training set barely covered.

## Measure the right error

Word error rate remains the baseline:

$$
\mathrm{WER} = \frac{S + D + I}{N}
$$

where $S$, $D$, and $I$ are substitutions, deletions, and insertions, and $N$ is the number of reference words. Report WER by slice: MSA, Gulf, Egyptian, Levantine, and noisy real-world recordings. A single aggregate number can be dominated by whichever slice has the most samples.

![A waveform split into clean, noisy, and dialect slices](/images/arabic-asr.svg "Figure 3. Slice-level results are more useful than one aggregate WER.")

## Normalize consistently

Arabic normalization choices change WER. Decide whether to remove diacritics, normalize alef forms, and map ta marbuta. Apply the same function to every hypothesis and reference. Also check for label leakage: if the reference transcript came from the same ASR vendor, the benchmark is measuring agreement, not accuracy.

```python
import re

def normalize_arabic(text: str) -> str:
    text = re.sub(r"[\u064B-\u0652]", "", text)  # diacritics
    text = re.sub("[إأآ]", "ا", text)
    text = re.sub("ى", "ي", text)
    return re.sub(r"\s+", " ", text).strip()
```

My benchmark harness now reports WER, insertion rate, and a small human-rated intelligibility score. The last one catches fluent-sounding hallucinations that a word-level metric misses.

---
title: "Building a Real-Time Voice Agent with LiveKit: Architecture Lessons"
date: 2026-07-30
tags: ["Voice AI", "LiveKit", "Systems"]
summary: "Architecture notes from wiring STT, an LLM, and TTS into a live voice loop — including the latency budget that makes or breaks the experience."
lang: en
canonical_url: ""
draft: true
---

A real-time voice agent is a latency product disguised as an AI product. Users forgive a slightly worse transcription; they do not forgive a two-second pause after they stop speaking. The architecture has to make the critical path short and observable.

## The latency budget

End-to-end response time is the sum of the stages plus network and scheduling overhead:

$$
T_{\text{e2e}} = T_{\text{STT}} + T_{\text{LLM}} + T_{\text{TTS}} + T_{\text{network}}
$$

I budget each stage, measure p95, and leave headroom for jitter. Streaming partial transcripts and sentence-level TTS help, but only when the agent can start responding before the full turn is complete.

![A voice loop connecting audio input, STT, LLM, TTS, and audio output](/images/voice-agent.svg "Figure 6. Instrument every stage; the slowest p95 is usually not the model you expected.")

## Lessons

- Treat interruption and barge-in as first-class states.
- Keep the LLM prompt small; every token adds time to first token.
- Stream audio in small frames and monitor underruns.
- Log turn IDs across STT, LLM, and TTS so failures are debuggable.

```python
async def on_transcript(turn, agent, tts):
    reply = await agent.respond(turn.text)  # stream tokens
    await tts.speak_stream(reply)
```

The hardest bugs were state bugs: double responses after a reconnect, stale audio after barge-in, and transcripts arriving after the turn had already moved on. A simple explicit turn state machine fixed more than any model change.

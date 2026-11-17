For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending
`.md` to the page URL.

## Search the API docs

Search docs

### Suggested

response\_formatreasoning\_effortstreamingtools

Primary navigation

## Choose language

[English](https://developers.openai.com/api/docs/models) [简体中文Chinese (Simplified)](https://developers.openai.com/zh-Hans/api/docs/models) [繁體中文Chinese (Traditional)](https://developers.openai.com/zh-Hant/api/docs/models) [FrançaisFrench](https://developers.openai.com/fr-FR/api/docs/models) [DeutschGerman](https://developers.openai.com/de-DE/api/docs/models) [日本語Japanese](https://developers.openai.com/ja-JP/api/docs/models) [한국어Korean](https://developers.openai.com/ko-KR/api/docs/models) [Português (Brasil)Portuguese (Brazil)](https://developers.openai.com/pt-BR/api/docs/models) [Español (Latinoamérica)Spanish (Latin America)](https://developers.openai.com/es-419/api/docs/models)

Theme Light  Dark  System

Search docs

### Suggested

response\_formatreasoning\_effortstreamingtools

Overview  Models  Agents  Tools  Audio & voice  Production  API reference

DocsModels

- [Model catalog](https://developers.openai.com/api/docs/models)

### Choose a model

- [Pricing](https://developers.openai.com/api/docs/pricing)
- [Model selection](https://developers.openai.com/api/docs/guides/model-selection)

### Text and code

- [Text generation](https://developers.openai.com/api/docs/guides/text)
- [Code generation](https://developers.openai.com/api/docs/guides/code-generation)
- [Structured output](https://developers.openai.com/api/docs/guides/structured-outputs)

### Prompting

- [Overview](https://developers.openai.com/api/docs/guides/prompting)
- [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering)
- [Citation formatting](https://developers.openai.com/api/docs/guides/citation-formatting)
- [Migration guide](https://developers.openai.com/api/docs/guides/prompting/migrate-from-prompt-object)
- [Prompt generation](https://developers.openai.com/api/docs/guides/prompt-generation)
- [Frontend prompting](https://developers.openai.com/api/docs/guides/frontend-prompt)

### Reasoning

- [Reasoning models](https://developers.openai.com/api/docs/guides/reasoning)
- [Reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices)

### Images

- [Images and vision](https://developers.openai.com/api/docs/guides/images-vision)

  - [Image input cost calculator](https://developers.openai.com/api/docs/guides/image-cost-calculator)

- [Image generation](https://developers.openai.com/api/docs/guides/image-generation)

  - [Overview](https://developers.openai.com/api/docs/guides/image-generation)
  - [Image prompting](https://developers.openai.com/api/docs/guides/image-prompting)

### Realtime and audio

- [Audio and speech](https://developers.openai.com/api/docs/guides/audio)
- [Getting started](https://developers.openai.com/api/docs/guides/realtime)
- [Voice agents](https://developers.openai.com/api/docs/guides/voice-agents)

### Specialized models

- [Embeddings](https://developers.openai.com/api/docs/guides/embeddings)
- [Moderation](https://developers.openai.com/api/docs/guides/moderation)

[API Dashboard](https://platform.openai.com/login)

[Try ChatGPT](https://chatgpt.com/)

# Models

## Choosing a model

If you're not sure where to start, use [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra), our flagship model for complex reasoning and coding. Choose [GPT-6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol) to balance intelligence and cost, or [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna) for cost-sensitive, high-volume workloads.

All latest OpenAI models support text and image input, text output, multilingual capabilities, and vision. Models are available via the [Responses API](https://developers.openai.com/api/docs/api-reference/responses) and our [Client SDKs](https://developers.openai.com/api/docs/libraries).

## Flagship models

Compare model capabilities and specifications.

View allCompare models

[Astra\\
\\
GPT-6 Astra\\
\\
Our most capable model for the most demanding work.](https://developers.openai.com/api/docs/models/gpt-6-astra)

Model ID

gpt-6-astra

[Reasoning](https://developers.openai.com/api/docs/guides/reasoning#reasoning-effort)

lowmediumhighxhighmax

Input price

$10 / Input MTok

Output price

$50 / Output MTok

Max output

128K tokens

Context window

1.05M

Knowledge cutoff

Apr 30, 2026

[Tools](https://developers.openai.com/api/docs/guides/tools)

Functions, Web search, File search, Computer use

[Sol\\
\\
GPT-6.1 Sol\\
\\
Near-Astra performance for complex work at a lower cost.](https://developers.openai.com/api/docs/models/gpt-6.1-sol)

Model ID

gpt-6.1-sol

[Reasoning](https://developers.openai.com/api/docs/guides/reasoning#reasoning-effort)

lowmediumhighxhighmax

Input price

$2 / Input MTok

Output price

$10 / Output MTok

Max output

128K tokens

Context window

1.05M

Knowledge cutoff

Apr 30, 2026

[Tools](https://developers.openai.com/api/docs/guides/tools)

Functions, Web search, File search, Computer use

[Terra\\
\\
GPT-6.1 Terra\\
\\
A fast, efficient model for visual reasoning, precise computer use, and clear, natural writing.](https://developers.openai.com/api/docs/models/gpt-6.1-terra)

Model ID

gpt-6.1-terra

[Reasoning](https://developers.openai.com/api/docs/guides/reasoning#reasoning-effort)

nonelowmediumhighxhighmax

Input price

$1 / Input MTok

Output price

$5 / Output MTok

Max output

128K tokens

Context window

1.05M

Knowledge cutoff

Jun 1, 2026

[Tools](https://developers.openai.com/api/docs/guides/tools)

Functions, Web search, File search, Computer use

[Luna\\
\\
GPT-6 Luna\\
\\
Our most efficient model for focused, high-volume tasks.](https://developers.openai.com/api/docs/models/gpt-6-luna)

Model ID

gpt-6-luna

[Reasoning](https://developers.openai.com/api/docs/guides/reasoning#reasoning-effort)

nonelowmediumhighxhighmax

Input price

$0.1 / Input MTok

Output price

$0.5 / Output MTok

Max output

128K tokens

Context window

1.05M

Knowledge cutoff

May 18, 2026

[Tools](https://developers.openai.com/api/docs/guides/tools)

Functions, Web search, File search, Computer use

View more

## Specialized models

Purpose-built for specific tasks.

OpenAI Daybreak

Advanced cyber models for defenders

[![gpt-6-cyber](https://developers.openai.com/images/api/models/icons/gpt-6-cyber.png)\\
\\
GPT-6 Cyber\\
\\
Investigate a vulnerability, reproduce it in an authorized test environment, or verify a fix.](https://developers.openai.com/api/docs/models/gpt-6-cyber) [![gpt-5.6-cyber](https://developers.openai.com/images/api/models/icons/gpt-5.6-cyber.png)\\
\\
GPT-5.6 Cyber\\
\\
Cybersecurity model for authorized vulnerability research and security testing.](https://developers.openai.com/api/docs/models/gpt-5.6-cyber)

Life sciences

Models for life sciences research

[![gpt-rosalind-research](https://developers.openai.com/images/api/models/icons/gpt-rosalind-research.webp)\\
\\
GPT-RosalindLife sciences reasoning for approved organizations](https://developers.openai.com/api/docs/pricing#specialized-models)

Image

Models for image generation and editing

[![gpt-image-2.6-sunburst](https://developers.openai.com/images/api/models/icons/gpt-image-2.6-sunburst.png)\\
\\
GPT-Image-2.6 Sunburst\\
\\
Image generation and editing for detailed visual work](https://developers.openai.com/api/docs/models/gpt-image-2.6-sunburst) [![gpt-image-2.6-flare](https://developers.openai.com/images/api/models/icons/gpt-image-2.6-flare.png)\\
\\
GPT-Image-2.6 Flare\\
\\
Image generation and editing for fast iteration](https://developers.openai.com/api/docs/models/gpt-image-2.6-flare) [![gpt-image-2.5-sunburst](https://developers.openai.com/images/api/models/icons/gpt-image-2.5-sunburst.png)\\
\\
GPT-Image-2.5 Sunburst\\
\\
Our most capable model for image generation and editing](https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst) [![gpt-image-2.5-flare](https://developers.openai.com/images/api/models/icons/gpt-image-2.5-flare.png)\\
\\
GPT-Image-2.5 Flare\\
\\
Fast, high-quality everyday image generation](https://developers.openai.com/api/docs/models/gpt-image-2.5-flare)

Realtime

Models for realtime speech and translation

[![gpt-live-1](https://developers.openai.com/images/api/models/icons/gpt-live-1.png)\\
\\
GPT-Live-1\\
\\
Our premier model for natural, expressive voice conversations with smooth interruption handling.](https://developers.openai.com/api/docs/models/gpt-live-1) [![gpt-realtime-2.1](https://developers.openai.com/images/api/models/icons/gpt-realtime-2.1.png)\\
\\
GPT-Realtime-2.1\\
\\
Reasoning model with tool use](https://developers.openai.com/api/docs/models/gpt-realtime-2.1) [![gpt-realtime-2.1-mini](https://developers.openai.com/images/api/models/icons/gpt-realtime-2.1-mini.png)\\
\\
GPT-Realtime-2.1 mini\\
\\
Reasoning model with tool use](https://developers.openai.com/api/docs/models/gpt-realtime-2.1-mini) [![gpt-realtime-2](https://developers.openai.com/images/api/models/icons/gpt-realtime-2.png)\\
\\
GPT-Realtime-2\\
\\
Reasoning model with tool use](https://developers.openai.com/api/docs/models/gpt-realtime-2) [![gpt-realtime-translate](https://developers.openai.com/images/api/models/icons/gpt-realtime-translate.png)\\
\\
GPT-Realtime-Translate\\
\\
Streaming speech-to-speech translation model](https://developers.openai.com/api/docs/models/gpt-realtime-translate) [![gpt-realtime-1.5](https://developers.openai.com/images/api/models/icons/gpt-realtime-1.5.png)\\
\\
GPT-Realtime-1.5\\
\\
The best voice model for audio in, audio out](https://developers.openai.com/api/docs/models/gpt-realtime-1.5)

Transcription

Models for transcribing speech into text

[![gpt-transcribe](https://developers.openai.com/images/api/models/icons/gpt-transcribe.png)\\
\\
GPT-Transcribe\\
\\
High-accuracy speech-to-text model for file and Realtime input transcription](https://developers.openai.com/api/docs/models/gpt-transcribe) [![gpt-live-transcribe](https://developers.openai.com/images/api/models/icons/gpt-live-transcribe.png)\\
\\
GPT-Live-Transcribe\\
\\
Low-latency speech-to-text model for realtime transcription](https://developers.openai.com/api/docs/models/gpt-live-transcribe) [![gpt-realtime-whisper](https://developers.openai.com/images/api/models/icons/gpt-realtime-whisper.png)\\
\\
GPT-Realtime-Whisper\\
\\
Streaming speech-to-text model for realtime transcription](https://developers.openai.com/api/docs/models/gpt-realtime-whisper)

## Browse our full catalog of models

Diverse models for a variety of tasks

View all modelsCompare models

[How we use your data](https://developers.openai.com/api/docs/guides/your-data)· [Deprecated models](https://developers.openai.com/api/docs/deprecations)

Ask AI

Loading docs agent...
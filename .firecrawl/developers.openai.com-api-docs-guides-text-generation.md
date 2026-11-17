For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending
`.md` to the page URL.

## Search the API docs

Search docs

### Suggested

response\_formatreasoning\_effortstreamingtools

Primary navigation

## Choose language

[English](https://developers.openai.com/api/docs/guides/text) [简体中文Chinese (Simplified)](https://developers.openai.com/zh-Hans/api/docs/guides/text) [繁體中文Chinese (Traditional)](https://developers.openai.com/zh-Hant/api/docs/guides/text) [FrançaisFrench](https://developers.openai.com/fr-FR/api/docs/guides/text) [DeutschGerman](https://developers.openai.com/de-DE/api/docs/guides/text) [日本語Japanese](https://developers.openai.com/ja-JP/api/docs/guides/text) [한국어Korean](https://developers.openai.com/ko-KR/api/docs/guides/text) [Português (Brasil)Portuguese (Brazil)](https://developers.openai.com/pt-BR/api/docs/guides/text) [Español (Latinoamérica)Spanish (Latin America)](https://developers.openai.com/es-419/api/docs/guides/text)

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

Copy Page

With the OpenAI API, you can use a [large language model](https://developers.openai.com/api/docs/models) to generate text from a prompt, as you might using [ChatGPT](https://chatgpt.com/). Models can generate almost any kind of text response—like code, mathematical equations, structured JSON data, or human-like prose.

Use the [Responses API](https://developers.openai.com/api/docs/api-reference/responses) for direct model requests like this text-generation call.

Generate text from a simple prompt

TypeScript

```
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-6-astra",
  input: "Write a one-sentence bedtime story about a unicorn.",
});

console.log(response.output_text);
```

```
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="Write a one-sentence bedtime story about a unicorn.",
)

print(response.output_text)
```

```
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()

	resp, err := client.Responses.New(context.TODO(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{OfString: openai.String("Say this is a test")},
	})
	if err != nil {
		panic(err.Error())
	}

	fmt.Println(resp.OutputText())
}
```

```
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;

public class Main {
  public static void main(String[] args) {
    OpenAIClient client = OpenAIOkHttpClient.fromEnv();

    ResponseCreateParams params =
        ResponseCreateParams.builder().input("Say this is a test").model("gpt-6-astra").build();

    Response response = client.responses().create(params);
    response.output().stream()
        .flatMap(item -> item.message().stream())
        .flatMap(message -> message.content().stream())
        .flatMap(content -> content.outputText().stream())
        .forEach(outputText -> System.out.println(outputText.text()));
  }
}
```

```
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

ResponseResult response = await client.CreateResponseAsync(
    "gpt-6-astra",
    "Say 'this is a test.'"
);

Console.WriteLine($"[ASSISTANT]: {response.GetOutputText()}");
```

```
require "openai"

openai = OpenAI::Client.new

response = openai.responses.create(
  model: "gpt-6-astra",
  input: "Write a one-sentence bedtime story about a unicorn."
)

puts(response.output_text)
```

```
openai responses create \
  --model "gpt-6-astra" \
  --input "Write a one-sentence bedtime story about a unicorn." \
  --raw-output \
  --transform 'output.#(type=="message").content.0.text'
```

```
curl "https://api.openai.com/v1/responses" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-6-astra",
        "input": "Write a one-sentence bedtime story about a unicorn."
    }'
```

An array of content generated by the model is in the `output` property of the response. In this simple example, we have just one output which looks like this:

```
[\
  {\
    "id": "msg_67b73f697ba4819183a15cc17d011509",\
    "type": "message",\
    "role": "assistant",\
    "content": [\
      {\
        "type": "output_text",\
        "text": "Under the soft glow of the moon, Luna the unicorn danced through fields of twinkling stardust, leaving trails of dreams for every child asleep.",\
        "annotations": []\
      }\
    ]\
  }\
]


```

**The `output` array often has more than one item in it!** It can contain tool calls, data about reasoning tokens generated by [reasoning models](https://developers.openai.com/api/docs/guides/reasoning), and other items. It is not safe to assume that the model’s text output is present at `output[0].content[0].text`.

Some of our [official SDKs](https://developers.openai.com/api/docs/libraries) include an `output_text` property on model responses for convenience, which aggregates all text outputs from the model into a single string. This may be useful as a shortcut to access text output from the model.

In addition to plain text, you can also have the model return structured data in JSON format—this feature is called [**Structured Outputs**](https://developers.openai.com/api/docs/guides/structured-outputs).

## Prompt engineering

**Prompt engineering** is the process of writing effective instructions for a model, such that it consistently generates content that meets your requirements.

Because the content generated from a model is non-deterministic, prompting to get your desired output is a mix of art and science. However, you can apply techniques and best practices to get good results consistently.

Some prompt engineering techniques work with every model, like using message roles. But different models might need to be prompted differently to produce the best results. Even different snapshots of models within the same family could produce different results. As you build more complex applications, we strongly recommend:

- Pinning your production applications to specific [model snapshots](https://developers.openai.com/api/docs/models) (like `gpt-5.5-2026-04-23` for example) to ensure consistent behavior
- Building tests and evaluation suites that measure prompt behavior so you can monitor performance as you iterate, or when you change and upgrade model versions

Now, let’s examine some tools and techniques available to you to construct prompts.

## Choosing models and APIs

OpenAI has many different [models](https://developers.openai.com/api/docs/models) and several APIs to choose from. [Reasoning models](https://developers.openai.com/api/docs/guides/reasoning), like [`gpt-6-astra`](https://developers.openai.com/api/docs/models/gpt-6-astra), behave differently from chat models and respond better to different prompts. One important note is that reasoning models perform better and demonstrate higher intelligence when used with the Responses API.

If you’re building any text generation app, we recommend using the Responses API over the older Chat Completions API. And if you’re using a reasoning model, it’s especially useful to [migrate to Responses](https://developers.openai.com/api/docs/guides/migrate-to-responses).

## Message roles and instruction following

You can provide instructions to the model with [differing levels of authority](https://model-spec.openai.com/2025-02-12.html#chain_of_command) using the `instructions` API parameter along with **message roles**.

The `instructions` parameter gives the model high-level instructions on how it should behave while generating a response, including tone, goals, and examples of correct responses. Any instructions provided this way will take priority over a prompt in the `input` parameter.

Generate text with instructions

TypeScript

```
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-6-astra",
  reasoning: { effort: "low" },
  instructions: "Talk like a pirate.",
  input: "Are semicolons optional in JavaScript?",
});

console.log(response.output_text);
```

```
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    reasoning={"effort": "low"},
    instructions="Talk like a pirate.",
    input="Are semicolons optional in JavaScript?",
)

print(response.output_text)
```

```
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model:        "gpt-6-astra",
		Instructions: openai.String("Talk like a pirate."),
		Reasoning: responses.ReasoningParam{
			Effort: responses.ReasoningEffortLow,
		},
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Are semicolons optional in JavaScript?"),
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(response.OutputText())
}
```

```
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.Reasoning;
import com.openai.models.ReasoningEffort;
import com.openai.models.responses.ResponseCreateParams;

String semicolonsDevMsg = "Talk like a pirate.";

String semicolonsPrompt = "Are semicolons optional in JavaScript?";

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input(semicolonsPrompt)
        .instructions(semicolonsDevMsg)
        .reasoning(Reasoning.builder().effort(ReasoningEffort.LOW).build())
        .build();

client.responses().create(params).output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new()
{
    Model = "gpt-6-astra",
    Instructions = "Talk like a pirate.",
    ReasoningOptions = new ResponseReasoningOptions
    {
        ReasoningEffortLevel = ResponseReasoningEffortLevel.Low,
    },
};
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem("Are semicolons optional in JavaScript?")
);

ResponseResult response = await client.CreateResponseAsync(options);

Console.WriteLine(response.GetOutputText());
```

```
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6-astra",
  instructions: "Talk like a pirate.",
  reasoning: { effort: :low },
  input: "Are semicolons optional in JavaScript?"
)

puts(response.output_text)
```

```
curl "https://api.openai.com/v1/responses" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-6-astra",
        "reasoning": {"effort": "low"},
        "instructions": "Talk like a pirate.",
        "input": "Are semicolons optional in JavaScript?"
    }'
```

The example above is roughly equivalent to using the following input messages in the `input` array:

Generate text with messages using different roles

TypeScript

```
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-6-astra",
  reasoning: { effort: "low" },
  input: [\
    {\
      role: "developer",\
      content: "Talk like a pirate.",\
    },\
    {\
      role: "user",\
      content: "Are semicolons optional in JavaScript?",\
    },\
  ],
});

console.log(response.output_text);
```

```
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    reasoning={"effort": "low"},
    input=[\
        {"role": "developer", "content": "Talk like a pirate."},\
        {"role": "user", "content": "Are semicolons optional in JavaScript?"},\
    ],
)

print(response.output_text)
```

```
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Reasoning: responses.ReasoningParam{
			Effort: responses.ReasoningEffortLow,
		},
		Input: responses.ResponseNewParamsInputUnion{
			OfInputItemList: responses.ResponseInputParam{
				responses.ResponseInputItemParamOfMessage(
					"Talk like a pirate.",
					responses.EasyInputMessageRoleDeveloper,
				),
				responses.ResponseInputItemParamOfMessage(
					"Are semicolons optional in JavaScript?",
					responses.EasyInputMessageRoleUser,
				),
			},
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(response.OutputText())
}
```

```
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.Reasoning;
import com.openai.models.ReasoningEffort;
import com.openai.models.responses.EasyInputMessage;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputItem;
import java.util.List;

String semicolonsDevMsg = "Talk like a pirate.";

String semicolonsPrompt = "Are semicolons optional in JavaScript?";

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input(
            ResponseCreateParams.Input.ofResponse(
                List.of(
                    ResponseInputItem.ofEasyInputMessage(
                        EasyInputMessage.builder()
                            .role(EasyInputMessage.Role.DEVELOPER)
                            .content(semicolonsDevMsg)
                            .build()),
                    ResponseInputItem.ofEasyInputMessage(
                        EasyInputMessage.builder()
                            .role(EasyInputMessage.Role.USER)
                            .content(semicolonsPrompt)
                            .build()))))
        .reasoning(Reasoning.builder().effort(ReasoningEffort.LOW).build())
        .build();

client.responses().create(params).output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

```
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new()
{
    Model = "gpt-6-astra",
    ReasoningOptions = new ResponseReasoningOptions
    {
        ReasoningEffortLevel = ResponseReasoningEffortLevel.Low,
    },
};
options.InputItems.Add(
    ResponseItem.CreateDeveloperMessageItem("Talk like a pirate.")
);
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem("Are semicolons optional in JavaScript?")
);

ResponseResult response = await client.CreateResponseAsync(options);

Console.WriteLine(response.GetOutputText());
```

```
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6-astra",
  reasoning: { effort: :low },
  input: [\
    {\
      role: :developer,\
      content: "Talk like a pirate."\
    },\
    {\
      role: :user,\
      content: "Are semicolons optional in JavaScript?"\
    }\
  ]
)

puts(response.output_text)
```

```
curl "https://api.openai.com/v1/responses" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-6-astra",
        "reasoning": {"effort": "low"},
        "input": [\
            {\
                "role": "developer",\
                "content": "Talk like a pirate."\
            },\
            {\
                "role": "user",\
                "content": "Are semicolons optional in JavaScript?"\
            }\
        ]
    }'
```

Note that the `instructions` parameter only applies to the current response generation request. If you are [managing conversation state](https://developers.openai.com/api/docs/guides/conversation-state) with the `previous_response_id` parameter, the `instructions` used on previous turns will not be present in the context.

The [OpenAI model spec](https://model-spec.openai.com/2025-02-12.html#chain_of_command) describes how our models give different levels of priority to messages with different roles.

| developer | user | assistant |
| --- | --- | --- |
| `developer` messages are instructions provided by the application<br>developer, prioritized ahead of user messages. | `user` messages are instructions provided by an end user, prioritized<br>behind developer messages. | Messages generated by the model have the `assistant` role. |

A multi-turn conversation may consist of several messages of these types, along with other content types provided by both you and the model. Learn more about [managing conversation state here](https://developers.openai.com/api/docs/guides/conversation-state).

You could think about `developer` and `user` messages like a function and its arguments in a programming language.

- `developer` messages provide the system’s rules and business logic, like a function definition.
- `user` messages provide inputs and configuration to which the `developer` message instructions are applied, like arguments to a function.

## Version prompts in code

Store production prompts in your application code instead of creating reusable prompt objects. Code-managed prompts let you use typed inputs, code review, tests, and your normal deployment process to change model behavior.

OpenAI is deprecating reusable prompt objects in the API. Prompt creation will
be de-emphasized beginning June 3, 2026, and `v1/prompts` is scheduled to shut
down on November 30, 2026. See the [deprecations\\
page](https://developers.openai.com/api/docs/deprecations#2026-06-03-reusable-prompts) for the current
timeline.

For new text-generation work:

- Keep prompt builders in a small module near the feature they support.
- Use typed function arguments or schemas for dynamic values such as customer data, files, or task options.
- Pass the generated `instructions` and `input` directly to the [Responses API](https://developers.openai.com/api/docs/api-reference/responses/create).
- Add representative fixtures, tests, and evaluation checks before changing production prompts.
- Roll out prompt changes through your deployment system, using feature flags or configuration when you need staged releases.

If your integration already calls a saved prompt with a prompt ID or version, use the [prompt object migration guide](https://developers.openai.com/api/docs/guides/prompting/migrate-from-prompt-object) to move that prompt into code.

## Next steps

Now that you know the basics of text inputs and outputs, you might want to check out one of these resources next.

[Build a prompt in the Playground\\
\\
Use the Playground to develop and iterate on prompts.](https://platform.openai.com/chat/edit) [Generate JSON data with Structured Outputs\\
\\
Ensure JSON data emitted from a model conforms to a JSON schema.](https://developers.openai.com/api/docs/guides/structured-outputs) [Full API reference\\
\\
Check out all the options for text generation in the API reference.](https://developers.openai.com/api/docs/api-reference/responses)

Ask AI

Loading docs agent...
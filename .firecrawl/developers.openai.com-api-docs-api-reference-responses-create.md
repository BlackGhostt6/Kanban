[Skip to content](https://developers.openai.com/api/reference/resources/responses/methods/create#_top)

For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending
`.md` to the page URL.

Copy Markdown

# Create a model response

POST

/responses

Creates a model response. Provide [text](https://developers.openai.com/api/docs/guides/text) or
[image](https://developers.openai.com/api/docs/guides/images-vision) inputs to generate [text](https://developers.openai.com/api/docs/guides/text)
or [JSON](https://developers.openai.com/api/docs/guides/structured-outputs) outputs. Have the model call
your own [custom code](https://developers.openai.com/api/docs/guides/function-calling) or use built-in
[tools](https://developers.openai.com/api/docs/guides/tools) like [web search](https://developers.openai.com/api/docs/guides/tools-web-search)
or [file search](https://developers.openai.com/api/docs/guides/tools-file-search) to use your own data
as input for the model’s response.

File inputFile searchFunctionsImage inputReasoningStreamingText inputWeb search

### Create a model response

SDK languageHTTP

```
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "input": [\
      {\
        "role": "user",\
        "content": [\
          {"type": "input_text", "text": "what is in this file?"},\
          {\
            "type": "input_file",\
            "file_url": "https://www.berkshirehathaway.com/letters/2024ltr.pdf",\
            "detail": "auto"\
          }\
        ]\
      }\
    ]
  }'
```

Response example

```
{
  "id": "resp_686eef60237881a2bd1180bb8b13de430e34c516d176ff86",
  "object": "response",
  "access_programs": null,
  "created_at": 1752100704,
  "status": "completed",
  "completed_at": 1752100705,
  "background": false,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "max_tool_calls": null,
  "model": "gpt-6-astra",
  "output": [\
    {\
      "id": "msg_686eef60d3e081a29283bdcbc4322fd90e34c516d176ff86",\
      "type": "message",\
      "status": "completed",\
      "content": [\
        {\
          "type": "output_text",\
          "annotations": [],\
          "logprobs": [],\
          "text": "The file seems to contain excerpts from a letter to the shareholders of Berkshire Hathaway Inc., likely written by Warren Buffett. It covers several topics:\n\n1. **Communication Philosophy**: Buffett emphasizes the importance of transparency and candidness in reporting mistakes and successes to shareholders.\n\n2. **Mistakes and Learnings**: The letter acknowledges past mistakes in business assessments and management hires, highlighting the importance of correcting errors promptly.\n\n3. **CEO Succession**: Mention of Greg Abel stepping in as the new CEO and continuing the tradition of honest communication.\n\n4. **Pete Liegl Story**: A detailed account of acquiring Forest River and the relationship with its founder, highlighting trust and effective business decisions.\n\n5. **2024 Performance**: Overview of business performance, particularly in insurance and investment activities, with a focus on GEICO's improvement.\n\n6. **Tax Contributions**: Discussion of significant tax payments to the U.S. Treasury, credited to shareholders' reinvestments.\n\n7. **Investment Strategy**: A breakdown of Berkshire\u2019s investments in both controlled subsidiaries and marketable equities, along with a focus on long-term holding strategies.\n\n8. **American Capitalism**: Reflections on America\u2019s economic development and Berkshire\u2019s role within it.\n\n9. **Property-Casualty Insurance**: Insights into the P/C insurance business model and its challenges and benefits.\n\n10. **Japanese Investments**: Information about Berkshire\u2019s investments in Japanese companies and future plans.\n\n11. **Annual Meeting**: Details about the upcoming annual gathering in Omaha, including schedule changes and new book releases.\n\n12. **Personal Anecdotes**: Light-hearted stories about family and interactions, conveying Buffett's personable approach.\n\n13. **Financial Performance Data**: Tables comparing Berkshire\u2019s annual performance to the S&P 500, showing impressive long-term gains.\n\nOverall, the letter reinforces Berkshire Hathaway's commitment to transparency, investment in both its businesses and the wider economy, and emphasizes strong leadership and prudent financial management."\
        }\
      ],\
      "role": "assistant"\
    }\
  ],
  "parallel_tool_calls": true,
  "previous_response_id": null,
  "reasoning": {
    "effort": null,
    "summary": null
  },
  "service_tier": "default",
  "store": true,
  "temperature": 1.0,
  "text": {
    "format": {
      "type": "text"
    }
  },
  "tool_choice": "auto",
  "tools": [],
  "top_logprobs": 0,
  "top_p": 1.0,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 8438,
    "input_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0
    },
    "output_tokens": 398,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 8836
  },
  "user": null,
  "metadata": {}
}
```

##### Body Parameters JSON Expand Collapse

access\_programs: optional object { cyber }

Domain-specific access programs to use for this request.

cyber: optional "standard" or "daybreak\_blue" or "daybreak\_red" The Cyber access program to use for this request. Supported values are standard, daybreak\_blue, and daybreak\_red. If omitted, the API resolves the program from the model’s Cyber tier and your organization and project access, subject to model-specific eligibility restrictions. By default, models without a Cyber tier use Standard. Blue-tier models use Daybreak Blue when authorized; otherwise they fall back to Standard unless the model requires Daybreak access. Red-tier models use Daybreak Red and require authorization. Requests that require unavailable Daybreak access return 403. An implicit Standard fallback is represented by null in the response’s access\_programs field, rather than an explicit Standard selection.
One of the following: "standard" "daybreak\_blue" "daybreak\_red"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20access_programs%20%3E%20(schema))

background: optional booleanornull (default: false)

Whether to run the model response in the background.
[Learn more](https://developers.openai.com/api/docs/guides/background).

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20background%20%3E%20(schema))

context\_management: optional array of object { type, compact\_threshold } ornull

Context management configuration for this request.

minItems1

type: string

The context management entry type. Currently only ‘compaction’ is supported.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20context_management%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20type)

compact\_threshold: optional integerornull

Token threshold at which compaction should be triggered for this entry.

minimum1000

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20context_management%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20compact_threshold)

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20context_management%20%3E%20(schema))

conversation: optional stringor[ResponseConversationParam](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20response_conversation_param%20%3E%20(schema)) { id } ornull

The conversation that this response belongs to. Items from this conversation are prepended to `input_items` for this response request.
Input items and output items from this response are automatically added to this conversation after this response completes.

One of the following: ConversationID = string The unique ID of the conversation.
ResponseConversationParam { id } The conversation that this response belongs to.
id: string The unique ID of the conversation.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20conversation%20%3E%20(schema))

image: optional object { context\_compression }

Request level image options.

context\_compression: optional "auto" or "enabled" or "disabled" Controls image context optimization. Defaults to auto, which uses the model, transport, and input to select a policy. Use enabled to require compression support or disabled to turn it off.
One of the following: "auto" "enabled" "disabled"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20image%20%3E%20(schema))

include: optional array of [ResponseIncludable](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20response_includable%20%3E%20(schema))ornull

Specify additional output data to include in the model response. Currently supported values are:

- `web_search_call.action.sources`: Include the sources of the web search tool call.
- `code_interpreter_call.outputs`: Includes the outputs of python code execution in code interpreter tool call items.
- `computer_call_output.output.image_url`: Include image urls from the computer call output.
- `file_search_call.results`: Include the search results of the file search tool call.
- `message.input_image.image_url`: Include image urls from the input message.
- `message.output_text.logprobs`: Include logprobs with assistant messages.
- `reasoning.encrypted_content`: Includes an encrypted version of reasoning tokens in reasoning item outputs. This enables reasoning items to be used in multi-turn conversations when using the Responses API statelessly (like when the `store` parameter is set to `false`, or when an organization is enrolled in the zero data retention program).

One of the following: "file\_search\_call.results" "web\_search\_call.results" "web\_search\_call.action.sources" "message.input\_image.image\_url" "computer\_call\_output.output.image\_url" "code\_interpreter\_call.outputs" "reasoning.encrypted\_content" "message.output\_text.logprobs"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20include%20%3E%20(schema))

input: optional stringorarray of [EasyInputMessage](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20easy_input_message%20%3E%20(schema)) { content, role, phase, type } orMessage { content, role, status, type } or[ResponseOutputMessage](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20response_output_message%20%3E%20(schema)) { id, content, role, 3 more } or30 more

Text, image, or file inputs to the model, used to generate a response.

Learn more:

- [Text inputs and outputs](https://developers.openai.com/api/docs/guides/text)
- [Image inputs](https://developers.openai.com/api/docs/guides/images-vision)
- [File inputs](https://developers.openai.com/api/docs/guides/file-inputs)
- [Conversation state](https://developers.openai.com/api/docs/guides/conversation-state)
- [Function calling](https://developers.openai.com/api/docs/guides/function-calling)

One of the following: TextInput = string A text input to the model, equivalent to a text input with the
user role.
InputItemList = array of EasyInputMessage or Message or ResponseOutputMessage or 30 more A list of one or many input items to the model, containing
different content types.
One of the following: EasyInputMessage { content, role, phase, type } A message input to the model with a role indicating instruction following
hierarchy. Instructions given with the developer or system role take
precedence over instructions given with the user role. Messages with the
assistant role are presumed to have been generated by the model in previous
interactions.
content: string or ResponseInputMessageContentList Text, image, or audio input to the model, used to generate a response.
Can also contain previous assistant responses.
One of the following: TextInput = string A text input to the model.
ResponseInputMessageContentList = array of ResponseInputContent A list of one or many input items to the model, containing different content
types.
One of the following: ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" role: "user" or "assistant" or "system" or "developer" The role of the message input. One of user, assistant, system, or
developer.
One of the following: "user" "assistant" "system" "developer" phase: optional "commentary" or "final\_answer" or null Labels an assistant message as intermediate commentary (commentary) or the final answer (final\_answer).
For models like gpt-5.3-codex and beyond, when sending follow-up requests, preserve and resend
phase on all assistant messages — dropping it can degrade performance. Not used for user messages.
One of the following: "commentary" "final\_answer" type: optional "message" The type of the message input. Always message.
Message { content, role, status, type } A message input to the model with a role indicating instruction following
hierarchy. Instructions given with the developer or system role take
precedence over instructions given with the user role.
content: ResponseInputMessageContentList { , , } A list of one or many input items to the model, containing different content
types.
One of the following: ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" role: "user" or "system" or "developer" The role of the message input. One of user, system, or developer.
One of the following: "user" "system" "developer" status: optional "in\_progress" or "completed" or "incomplete" The status of item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: optional "message" The type of the message input. Always set to message.
ResponseOutputMessage { id, content, role, 3 more } An output message from the model.
id: string The unique ID of the output message.
content: array of ResponseOutputText or ResponseOutputRefusal The content of the output message.
One of the following: ResponseOutputText { annotations, logprobs, text, type } A text output from the model.
annotations: array of FileCitation or URLCitation or ContainerFileCitation or FilePath The annotations of the text output.
One of the following: FileCitation { file\_id, filename, index, type } A citation to a file.
file\_id: string The ID of the file.
filename: string The filename of the file cited.
index: integer The index in the output text at which to insert the file citation.
type: "file\_citation" (default: "file\_citation") The type of the file citation. Always file\_citation.
URLCitation { end\_index, start\_index, title, 2 more } A citation for a web resource used to generate a model response.
end\_index: integer The index of the last character of the URL citation in the message.
start\_index: integer The index of the first character of the URL citation in the message.
title: string The title of the web resource.
type: "url\_citation" (default: "url\_citation") The type of the URL citation. Always url\_citation.
url: string The URL of the web resource.
formaturi ContainerFileCitation { container\_id, end\_index, file\_id, 3 more } A citation for a container file used to generate a model response.
container\_id: string The ID of the container file.
end\_index: integer The index of the last character of the container file citation in the message.
file\_id: string The ID of the file.
filename: string The filename of the container file cited.
start\_index: integer The index of the first character of the container file citation in the message.
type: "container\_file\_citation" (default: "container\_file\_citation") The type of the container file citation. Always container\_file\_citation.
FilePath { file\_id, index, type } A path to a file.
file\_id: string The ID of the file.
index: integer The index of the file in the list of files.
type: "file\_path" The type of the file path. Always file\_path.
logprobs: array of { token, bytes, logprob, top\_logprobs } token: string bytes: array of number logprob: number top\_logprobs: array of { token, bytes, logprob } token: string bytes: array of number logprob: number text: string The text output from the model.
type: "output\_text" (default: "output\_text") The type of the output text. Always output\_text.
ResponseOutputRefusal { refusal, type } A refusal from the model.
refusal: string The refusal explanation from the model.
type: "refusal" (default: "refusal") The type of the refusal. Always refusal.
role: "assistant" The role of the output message. Always assistant.
status: "in\_progress" or "completed" or "incomplete" The status of the message input. One of in\_progress, completed, or
incomplete. Populated when input items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: "message" The type of the output message. Always message.
phase: optional "commentary" or "final\_answer" or null Labels an assistant message as intermediate commentary (commentary) or the final answer (final\_answer).
For models like gpt-5.3-codex and beyond, when sending follow-up requests, preserve and resend
phase on all assistant messages — dropping it can degrade performance. Not used for user messages.
One of the following: "commentary" "final\_answer" FileSearchCall { id, queries, status, 2 more } The results of a file search tool call. See the
file search guide for more information.
id: string The unique ID of the file search tool call.
queries: array of string The queries used to search for files.
status: "in\_progress" or "searching" or "completed" or 2 more The status of the file search tool call. One of in\_progress,
searching, incomplete or failed,
One of the following: "in\_progress" "searching" "completed" "incomplete" "failed" type: "file\_search\_call" The type of the file search tool call. Always file\_search\_call.
results: optional array of object or null The results of the file search tool call.
attributes: optional map\[string or number or boolean\] or null Set of 16 key-value pairs that can be attached to an object. This can be
useful for storing additional information about the object in a structured
format, and querying for objects via API or the dashboard. Keys are strings
with a maximum length of 64 characters. Values are strings with a maximum
length of 512 characters, booleans, or numbers.
One of the following: string maxLength512 number boolean file\_id: optional string The unique ID of the file.
filename: optional string The name of the file.
score: optional number The relevance score of the file - a value between 0 and 1.
formatfloat text: optional string The text that was retrieved from the file.
ComputerCall { id, call\_id, pending\_safety\_checks, 4 more } A tool call to a computer use tool. See the
computer use guide for more information.
id: string The unique ID of the computer call.
call\_id: string An identifier used when responding to the tool call with output.
pending\_safety\_checks: array of { id, code, message } The pending safety checks for the computer call.
id: string The ID of the pending safety check.
code: optional string or null The type of the pending safety check.
message: optional string or null Details about the pending safety check.
status: "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: "computer\_call" (default: "computer\_call") The type of the computer call. Always computer\_call.
action: optional ComputerAction A click action.
One of the following: Click { button, type, x, 2 more } A click action.
button: "left" or "right" or "wheel" or 2 more Indicates which mouse button was pressed during the click. One of left, right, wheel, back, or forward.
One of the following: "left" "right" "wheel" "back" "forward" type: "click" (default: "click") Specifies the event type. For a click action, this property is always click.
x: integer The x-coordinate where the click occurred.
y: integer The y-coordinate where the click occurred.
keys: optional array of string or null The keys being held while clicking.
DoubleClick { keys, type, x, y } A double click action.
keys: array of string or null The keys being held while double-clicking.
type: "double\_click" (default: "double\_click") Specifies the event type. For a double click action, this property is always set to double\_click.
x: integer The x-coordinate where the double click occurred.
y: integer The y-coordinate where the double click occurred.
Drag { path, type, keys } A drag action.
path: array of { x, y } An array of coordinates representing the path of the drag action. Coordinates will appear as an array of objects, eg
\[\
{ x: 100, y: 200 },\
{ x: 200, y: 300 }\
\]
x: integer The x-coordinate.
y: integer The y-coordinate.
type: "drag" (default: "drag") Specifies the event type. For a drag action, this property is always set to drag.
keys: optional array of string or null The keys being held while dragging the mouse.
Keypress { keys, type } A collection of keypresses the model would like to perform.
keys: array of string The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key.
type: "keypress" (default: "keypress") Specifies the event type. For a keypress action, this property is always set to keypress.
Move { type, x, y, keys } A mouse move action.
type: "move" (default: "move") Specifies the event type. For a move action, this property is always set to move.
x: integer The x-coordinate to move to.
y: integer The y-coordinate to move to.
keys: optional array of string or null The keys being held while moving the mouse.
Screenshot { type } A screenshot action.
type: "screenshot" (default: "screenshot") Specifies the event type. For a screenshot action, this property is always set to screenshot.
Scroll { scroll\_x, scroll\_y, type, 3 more } A scroll action.
scroll\_x: integer The horizontal scroll distance.
scroll\_y: integer The vertical scroll distance.
type: "scroll" (default: "scroll") Specifies the event type. For a scroll action, this property is always set to scroll.
x: integer The x-coordinate where the scroll occurred.
y: integer The y-coordinate where the scroll occurred.
keys: optional array of string or null The keys being held while scrolling.
Type { text, type } An action to type in text.
text: string The text to type.
type: "type" (default: "type") Specifies the event type. For a type action, this property is always set to type.
Wait { type } A wait action.
type: "wait" (default: "wait") Specifies the event type. For a wait action, this property is always set to wait.
actions: optional ComputerActionList { Click, DoubleClick, Drag, 6 more } Flattened batched actions for computer\_use. Each action includes an
type discriminator and action-specific fields.
One of the following: Click { button, type, x, 2 more } A click action.
button: "left" or "right" or "wheel" or 2 more Indicates which mouse button was pressed during the click. One of left, right, wheel, back, or forward.
One of the following: "left" "right" "wheel" "back" "forward" type: "click" (default: "click") Specifies the event type. For a click action, this property is always click.
x: integer The x-coordinate where the click occurred.
y: integer The y-coordinate where the click occurred.
keys: optional array of string or null The keys being held while clicking.
DoubleClick { keys, type, x, y } A double click action.
keys: array of string or null The keys being held while double-clicking.
type: "double\_click" (default: "double\_click") Specifies the event type. For a double click action, this property is always set to double\_click.
x: integer The x-coordinate where the double click occurred.
y: integer The y-coordinate where the double click occurred.
Drag { path, type, keys } A drag action.
path: array of { x, y } An array of coordinates representing the path of the drag action. Coordinates will appear as an array of objects, eg
\[\
{ x: 100, y: 200 },\
{ x: 200, y: 300 }\
\]
x: integer The x-coordinate.
y: integer The y-coordinate.
type: "drag" (default: "drag") Specifies the event type. For a drag action, this property is always set to drag.
keys: optional array of string or null The keys being held while dragging the mouse.
Keypress { keys, type } A collection of keypresses the model would like to perform.
keys: array of string The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key.
type: "keypress" (default: "keypress") Specifies the event type. For a keypress action, this property is always set to keypress.
Move { type, x, y, keys } A mouse move action.
type: "move" (default: "move") Specifies the event type. For a move action, this property is always set to move.
x: integer The x-coordinate to move to.
y: integer The y-coordinate to move to.
keys: optional array of string or null The keys being held while moving the mouse.
Screenshot { type } A screenshot action.
type: "screenshot" (default: "screenshot") Specifies the event type. For a screenshot action, this property is always set to screenshot.
Scroll { scroll\_x, scroll\_y, type, 3 more } A scroll action.
scroll\_x: integer The horizontal scroll distance.
scroll\_y: integer The vertical scroll distance.
type: "scroll" (default: "scroll") Specifies the event type. For a scroll action, this property is always set to scroll.
x: integer The x-coordinate where the scroll occurred.
y: integer The y-coordinate where the scroll occurred.
keys: optional array of string or null The keys being held while scrolling.
Type { text, type } An action to type in text.
text: string The text to type.
type: "type" (default: "type") Specifies the event type. For a type action, this property is always set to type.
Wait { type } A wait action.
type: "wait" (default: "wait") Specifies the event type. For a wait action, this property is always set to wait.
ComputerCallOutput { call\_id, output, type, 3 more } The output of a computer tool call.
call\_id: string The ID of the computer tool call that produced the output.
minLength1 maxLength64 output: ResponseComputerToolCallOutputScreenshot { type, file\_id, image\_url } A computer screenshot image used with the computer use tool.
type: "computer\_screenshot" (default: "computer\_screenshot") Specifies the event type. For a computer screenshot, this property is
always set to computer\_screenshot.
file\_id: optional string The identifier of an uploaded file that contains the screenshot.
image\_url: optional string The URL of the screenshot image.
formaturi type: "computer\_call\_output" (default: "computer\_call\_output") The type of the computer tool call output. Always computer\_call\_output.
id: optional string or null The ID of the computer tool call output.
acknowledged\_safety\_checks: optional array of object or null The safety checks reported by the API that have been acknowledged by the developer.
id: string The ID of the pending safety check.
code: optional string or null The type of the pending safety check.
message: optional string or null Details about the pending safety check.
status: optional "in\_progress" or "completed" or "incomplete" or null The status of the message input. One of in\_progress, completed, or incomplete. Populated when input items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" WebSearchCall { id, status, type, action } The results of a web search tool call. See the
web search guide for more information.
id: string The unique ID of the web search tool call.
status: "in\_progress" or "searching" or "completed" or 2 more The status of the web search tool call.
One of the following: "in\_progress" "searching" "completed" "failed" "incomplete" type: "web\_search\_call" The type of the web search tool call. Always web\_search\_call.
action: optional Search or OpenPage or FindInPage An object describing the specific action taken in this web search call.
Includes details on how the model used the web (search, open\_page, find\_in\_page).
One of the following: Search { type, queries, query, sources } Action type “search” - Performs a web search query.
type: "search" The action type.
queries: optional array of string The search queries.
query: optional string Deprecated.
The search query.
sources: optional array of { type, url } The sources used in the search.
type: "url" The type of source. Always url.
url: string The URL of the source.
formaturi OpenPage { type, url } Action type “open\_page” - Opens a specific URL from search results.
type: "open\_page" The action type.
url: optional string or null The URL opened by the model.
formaturi FindInPage { pattern, type, url } Action type “find\_in\_page”: Searches for a pattern within a loaded page.
pattern: string The pattern or text to search for within the page.
type: "find\_in\_page" The action type.
url: optional string or null The URL of the page searched for the pattern, when available.
formaturi FunctionCall { arguments, call\_id, name, 6 more } A tool call to run a function. See the
function calling guide for more information.
arguments: string A JSON string of the arguments to pass to the function.
call\_id: string The unique ID of the function tool call generated by the model.
name: string The name of the function to run.
type: "function\_call" The type of the function tool call. Always function\_call.
id: optional string The unique ID of the function tool call.
async: optional boolean Whether the function tool call runs asynchronously.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") namespace: optional string The namespace of the function to run.
status: optional "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" FunctionCallOutput { output, type, id, 5 more } The output of a function tool call.
output: string or array of ResponseInputTextContent or ResponseInputImageContent or ResponseInputFileContent Text, image, or file output of the function tool call.
One of the following: string A JSON string of the output of the function tool call.
maxLength10485760 array of ResponseInputTextContent or ResponseInputImageContent or ResponseInputFileContent An array of content outputs (text, image, file) for the function tool call.
One of the following: ResponseInputTextContent { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
maxLength10485760 type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional object or null Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImageContent { type, detail, file\_id, 2 more } An image input to the model. Learn about image inputs
type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
detail: optional ImageDetail or null The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
maxLength20971520 formaturi prompt\_cache\_breakpoint: optional object or null Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFileContent { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string or null The base64-encoded data of the file to be sent to the model.
maxLength73400320 file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string or null The URL of the file to be sent to the model.
formaturi filename: optional string or null The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional object or null Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" type: "function\_call\_output" (default: "function\_call\_output") The type of the function tool call output. Always function\_call\_output.
id: optional string or null The unique ID of the function tool call output. Populated when this item is returned via API.
call\_id: optional string or null The unique ID of the function tool call generated by the model.
minLength1 maxLength64 caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
name: optional string or null The name of the tool that produced the output.
minLength1 maxLength128 namespace: optional string or null The namespace of the tool that produced the output.
pattern^\[a-zA-Z0-9\_-\]+$ minLength1 maxLength128 status: optional "in\_progress" or "completed" or "incomplete" or null The status of the item. One of in\_progress, completed, or incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" ToolSearchCall { arguments, type, id, 3 more } arguments: unknown The arguments supplied to the tool search call.
type: "tool\_search\_call" (default: "tool\_search\_call") The item type. Always tool\_search\_call.
id: optional string or null The unique ID of this tool search call.
call\_id: optional string or null The unique ID of the tool search call generated by the model.
minLength1 maxLength64 execution: optional "server" or "client" Whether tool search was executed by the server or by the client.
One of the following: "server" "client" status: optional "in\_progress" or "completed" or "incomplete" or null The status of the tool search call.
One of the following: "in\_progress" "completed" "incomplete" ToolSearchOutput { tools, type, id, 3 more } tools: array of Function or FileSearch or Computer or 13 more The loaded tool definitions returned by the tool search output.
One of the following: Function { name, parameters, strict, 6 more } Defines a function in your own code the model can choose to call. Learn more about function calling.
name: string The name of the function to call.
parameters: map\[unknown\] or null A JSON schema object describing the parameters of the function.
strict: boolean or null Whether strict parameter validation is enforced for this function tool.
type: "function" (default: "function") The type of the function tool. Always function.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
One of the following: "direct" "programmatic" async: optional boolean defer\_loading: optional boolean Whether this function is deferred and loaded via tool search.
description: optional string or null A description of the function. Used by the model to determine whether or not to call the function.
output\_schema: optional map\[unknown\] or null A JSON schema object describing the JSON value encoded in string outputs for this function.
FileSearch { type, vector\_store\_ids, filters, 2 more } A tool that searches for relevant content from uploaded files. Learn more about the file search tool.
type: "file\_search" (default: "file\_search") The type of the file search tool. Always file\_search.
vector\_store\_ids: array of string The IDs of the vector stores to search.
filters: optional ComparisonFilter or CompoundFilter or null A filter to apply.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } Combine multiple filters using and or or.
filters: array of ComparisonFilter or CompoundFilter Array of filters to combine. Items can be ComparisonFilter or CompoundFilter.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } This type repeats the enclosing schema. type: "and" or "or" Type of operation: and or or.
One of the following: "and" "or" max\_num\_results: optional integer The maximum number of results to return. This number should be between 1 and 50 inclusive.
ranking\_options: optional { hybrid\_search, ranker, score\_threshold } Ranking options for search.
hybrid\_search: optional { embedding\_weight, text\_weight } Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.
embedding\_weight: number The weight of the embedding in the reciprocal ranking fusion.
text\_weight: number The weight of the text in the reciprocal ranking fusion.
ranker: optional "auto" or "default-2024-11-15" The ranker to use for the file search.
One of the following: "auto" "default-2024-11-15" score\_threshold: optional number The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.
Computer { type } A tool that controls a virtual computer. Learn more about the computer tool.
type: "computer" (default: "computer") The type of the computer tool. Always computer.
ComputerUsePreview { display\_height, display\_width, environment, type } A tool that controls a virtual computer. Learn more about the computer tool.
display\_height: integer The height of the computer display.
display\_width: integer The width of the computer display.
environment: "windows" or "mac" or "linux" or 2 more The type of computer environment to control.
One of the following: "windows" "mac" "linux" "ubuntu" "browser" type: "computer\_use\_preview" (default: "computer\_use\_preview") The type of the computer use tool. Always computer\_use\_preview.
WebSearch { type, external\_web\_access, filters, 2 more } Search the Internet for sources related to the prompt. Learn more about the
web search tool.
type: "web\_search" or "web\_search\_2025\_08\_26" (default: "web\_search") The type of the web search tool. One of web\_search or web\_search\_2025\_08\_26.
One of the following: "web\_search" "web\_search\_2025\_08\_26" external\_web\_access: optional boolean (default: true) Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content.
filters: optional object or null Filters for the search.
allowed\_domains: optional array of string or null (default: \[\]) Allowed domains for the search. If not provided, all domains are allowed.
Subdomains of the provided domains are allowed as well.
Example: \["pubmed.ncbi.nlm.nih.gov"\]
search\_context\_size: optional "low" or "medium" or "high" (default: "medium") High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the
United States. To avoid this fallback, pass {"type": "approximate"} without
location fields. To localize results, provide the relevant location fields.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
type: optional "approximate" (default: "approximate") The type of location approximation. Always approximate.
Mcp { server\_label, type, allowed\_callers, 9 more } Give the model access to additional tools via remote Model Context Protocol
(MCP) servers. Learn more about MCP.
server\_label: string A label for this MCP server, used to identify it in tool calls.
type: "mcp" The type of the MCP tool. Always mcp.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" allowed\_tools: optional array of string or McpToolFilter or null List of allowed tool names or a filter object.
One of the following: McpAllowedTools = array of string A string array of allowed tool names
McpToolFilter { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
authorization: optional string An OAuth access token that can be used with a remote MCP server, either
with a custom MCP server URL or a service connector. Your application
must handle the OAuth authorization flow and provide the token here.
connector\_id: optional "connector\_dropbox" or "connector\_gmail" or "connector\_googlecalendar" or 5 more Deprecated.
Identifier for service connectors, like those available in ChatGPT. One of
server\_url, connector\_id, or tunnel\_id must be provided. Learn more
about service connectors here.
This field is deprecated for models released after September 1, 2026.
Use server\_url to connect to a remote MCP server, or tunnel\_id to
connect through a Secure MCP Tunnel.
Currently supported connector\_id values are:

Dropbox: connector\_dropbox
Gmail: connector\_gmail
Google Calendar: connector\_googlecalendar
Google Drive: connector\_googledrive
Microsoft Teams: connector\_microsoftteams
Outlook Calendar: connector\_outlookcalendar
Outlook Email: connector\_outlookemail
SharePoint: connector\_sharepoint

One of the following: "connector\_dropbox" "connector\_gmail" "connector\_googlecalendar" "connector\_googledrive" "connector\_microsoftteams" "connector\_outlookcalendar" "connector\_outlookemail" "connector\_sharepoint" defer\_loading: optional boolean Whether this MCP tool is deferred and discovered via tool search.
headers: optional map\[string\] or null Optional HTTP headers to send to the MCP server. Use for authentication
or other purposes.
require\_approval: optional McpToolApprovalFilter or "always" or "never" or null (default: "always") Specify which of the MCP server’s tools require approval.
One of the following: McpToolApprovalFilter { always, never } Specify which of the MCP server’s tools require approval. Can be
always, never, or a filter object associated with tools
that require approval.
always: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
never: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
McpToolApprovalSetting = "always" or "never" Specify a single approval policy for all tools. One of always or
never. When set to always, all tools will require approval. When
set to never, all tools will not require approval.
One of the following: "always" "never" server\_description: optional string Optional description of the MCP server, used to provide more context.
server\_url: optional string The URL for the MCP server. One of server\_url, connector\_id, or
tunnel\_id must be provided.
formaturi tunnel\_id: optional string The Secure MCP Tunnel ID to use instead of a direct server URL. One of
server\_url, connector\_id, or tunnel\_id must be provided.
pattern^tunnel\_\[a-z0-9\]{32}$ CodeInterpreter { container, type, allowed\_callers } A tool that runs Python code to help generate a response to a prompt.
container: string or CodeInterpreterToolAuto The code interpreter container. Can be a container ID or an object that
specifies uploaded file IDs to make available to your code, along with an
optional memory\_limit setting.
One of the following: string The container ID.
CodeInterpreterToolAuto { type, file\_ids, memory\_limit, network\_policy } Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.
type: "auto" (default: "auto") Always auto.
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the code interpreter container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 type: "code\_interpreter" The type of the code interpreter tool. Always code\_interpreter.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" ProgrammaticToolCalling { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The type of the tool. Always programmatic\_tool\_calling.
ImageGeneration { type, action, background, 13 more } A tool that generates images using the GPT image models.
type: "image\_generation" The type of the image generation tool. Always image\_generation.
action: optional "generate" or "edit" or "auto" Whether to generate a new image or edit an existing image. Default: auto.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" (default: "auto") Set the background of the generated image. One of transparent, opaque,
or auto. gpt-image-2.5-sunburst and gpt-image-2.5-flare, including
their 2026-09-08 snapshots, support opaque and transparent
backgrounds. Transparent backgrounds are available for supported GPT Image
models. For gpt-image-2 and gpt-image-2-2026-04-21, this support is in
preview. When using transparent, set the output format to png or webp.
Default: auto.
One of the following: "transparent" "opaque" "auto" complexity: optional "low" or "medium" or "high" Computation spent planning the image, independently of rendering quality.
Overrides the outer response’s reasoning.effort for image generation.
When omitted, inherits a supported outer reasoning effort or uses the
image model’s configured default.
For SVG output, controls the reference image, not the SVG author’s
reasoning.
One of the following: "low" "medium" "high" frame\_count: optional integer (default: 9) Number of GIF frames. Requires output\_format to be gif. Default: 9.
minimum2 maximum16 frame\_duration\_ms: optional integer (default: 200) Duration of each GIF frame in milliseconds, rounded to 10 ms.
Requires output\_format to be gif. Default: 200.
minimum20 maximum2000 input\_fidelity: optional "high" or "low" or null Control how much effort the model will exert to match the style and features, especially facial features, of input images. Supports high and low on gpt-image-1.5; gpt-image-1-mini supports only low. For gpt-image-2, omit this parameter. Defaults to low on supported models.
One of the following: "high" "low" input\_image\_mask: optional { file\_id, image\_url } Optional mask for inpainting. Contains image\_url
(string, optional) and file\_id (string, optional).
file\_id: optional string File ID for the mask image.
image\_url: optional string Base64-encoded mask image.
model: optional string or "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: string "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: "gpt-image-1-mini" "gpt-image-2" "gpt-image-2-2026-04-21" "gpt-image-2.5-sunburst" "gpt-image-2.5-sunburst-2026-09-08" "gpt-image-2.5-flare" "gpt-image-2.5-flare-2026-09-08" "gpt-image-2.6-sunburst" "gpt-image-2.6-flare" "gpt-image-1.5" "chatgpt-image-latest" "gpt-image-1" Deprecated. GPT Image 1 was shut down on October 23, 2026. Use gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
moderation: optional "auto" or "low" (default: "auto") Moderation level for the generated image. Default: auto.
One of the following: "auto" "low" output\_compression: optional integer (default: 100) Compression level for the output image. Default: 100.
minimum0 maximum100 output\_format: optional "png" or "webp" or "jpeg" or 2 more (default: "png") The output format of the generated image. One of png, webp, jpeg,
gif, or svg. Default: png. GIF and SVG output require a model
that supports the selected format. GIF output does not support
partial image streaming (partial\_images greater than 0),
input\_image\_mask, or custom output\_compression.
Responses lifecycle events can still be streamed for GIF output.
One of the following: "png" "webp" "jpeg" "gif" "svg" partial\_images: optional integer (default: 0) Number of partial images to generate in streaming mode, from 0 (default value) to 3.
minimum0 maximum3 quality: optional "low" or "medium" or "high" or 3 more (default: "auto") The quality of the generated image. The GPT image models support low,
medium, and high. gpt-image-2.5-sunburst and gpt-image-2.5-flare,
including their 2026-09-08 snapshots, also support xhigh and max.
Default: auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or "auto" (default: "auto") The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" or "auto" The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: "1024x1024" "1024x1536" "1536x1024" "auto" svg: optional { model, reasoning } SVG author model settings. Requires output\_format to be svg.
When SVG model selection is enabled, omitting this object uses the
outer response model. Otherwise, the default SVG author is used and
explicit model overrides are unavailable.
model: optional string minLength1 reasoning: optional object or null Reasoning effort for SVG authoring. When omitted, uses the author model’s default in both Images and Responses.
effort: optional "none" or "minimal" or "low" or 4 more Controls how much effort the model should spend on reasoning for this request.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" LocalShell { type } A tool that allows the model to execute shell commands in a local environment.
type: "local\_shell" (default: "local\_shell") The type of the local shell tool. Always local\_shell.
Shell { type, allowed\_callers, environment } A tool that allows the model to execute shell commands.
type: "shell" (default: "shell") The type of the shell tool. Always shell.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" environment: optional ContainerAuto or LocalEnvironment or ContainerReference or null One of the following: ContainerAuto { type, file\_ids, memory\_limit, 2 more } type: "container\_auto" (default: "container\_auto") Automatically creates a container for this request
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 skills: optional array of SkillReference or InlineSkill An optional list of skills referenced by id or inline data.
maxItems200 One of the following: SkillReference { skill\_id, type, version } skill\_id: string The ID of the referenced skill.
minLength1 maxLength64 type: "skill\_reference" (default: "skill\_reference") References a skill created with the /v1/skills endpoint.
version: optional string Optional skill version. Use a positive integer or ‘latest’. Omit for default.
InlineSkill { description, name, source, type } description: string The description of the skill.
name: string The name of the skill.
source: InlineSkillSource { data, media\_type, type } Inline skill payload
data: string Base64-encoded skill zip bundle.
minLength1 maxLength70254592 media\_type: "application/zip" (default: "application/zip") The media type of the inline skill payload. Must be application/zip.
type: "base64" (default: "base64") The type of the inline skill source. Must be base64.
type: "inline" (default: "inline") Defines an inline skill for this request.
LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
ToolSearchOutputNamespaceTool { description, name, tools, type } Groups function/custom tools under a shared namespace.
description: string A description of the namespace shown to the model.
name: string The namespace name used in tool calls (for example, crm).
minLength1 tools: array of Function or Custom The function/custom tools loaded inside this namespace.
minItems1 One of the following: Function { name, type, allowed\_callers, 6 more } name: string The name of the loaded function tool.
pattern^(?!\[\\s\\S\]\*\[\\r\\n\])\[a-zA-Z0-9\_.-\]+$ minLength1 maxLength128 type: "function" (default: "function") allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this function should be deferred and discovered via tool search.
description: optional string or null output\_schema: optional map\[unknown\] or null A JSON Schema describing the JSON value encoded in string outputs for this function tool. This does not describe content-array outputs.
parameters: optional unknown or null strict: optional boolean or null Whether to enforce strict parameter validation. If omitted, Responses attempts to use strict validation when the schema is compatible, and falls back to non-strict validation otherwise.
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
type: "namespace" (default: "namespace") The type of the tool. Always namespace.
ToolSearch { type, description, execution, parameters } Hosted or BYOT tool search configuration for deferred tools.
type: "tool\_search" (default: "tool\_search") The type of the tool. Always tool\_search.
description: optional string or null Description shown to the model for a client-executed tool search tool.
execution: optional "server" or "client" Whether tool search is executed by the server or by the client.
One of the following: "server" "client" parameters: optional unknown or null Parameter schema for a client-executed tool search tool.
WebSearchPreview { type, search\_content\_types, search\_context\_size, user\_location } This tool searches the web for relevant results to use in a response. Learn more about the web search tool.
type: "web\_search\_preview" or "web\_search\_preview\_2025\_03\_11" (default: "web\_search\_preview") The type of the web search tool. One of web\_search\_preview or web\_search\_preview\_2025\_03\_11.
One of the following: "web\_search\_preview" "web\_search\_preview\_2025\_03\_11" search\_content\_types: optional array of "text" or "image" One of the following: "text" "image" search\_context\_size: optional "low" or "medium" or "high" High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the United States. To avoid this fallback, pass {"type": "approximate"} without location fields. To localize results, provide the relevant location fields.
type: "approximate" (default: "approximate") The type of location approximation. Always approximate.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
ApplyPatch { type, allowed\_callers } Allows the assistant to create, delete, or update files using unified diffs.
type: "apply\_patch" (default: "apply\_patch") The type of the tool. Always apply\_patch.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" type: "tool\_search\_output" (default: "tool\_search\_output") The item type. Always tool\_search\_output.
id: optional string or null The unique ID of this tool search output.
call\_id: optional string or null The unique ID of the tool search call generated by the model.
minLength1 maxLength64 execution: optional "server" or "client" Whether tool search was executed by the server or by the client.
One of the following: "server" "client" status: optional "in\_progress" or "completed" or "incomplete" or null The status of the tool search output.
One of the following: "in\_progress" "completed" "incomplete" AdditionalTools { role, tools, type, id } role: "developer" (default: "developer") The role that provided the additional tools. Only developer is supported.
tools: array of Function or FileSearch or Computer or 13 more A list of additional tools made available at this item.
One of the following: Function { name, parameters, strict, 6 more } Defines a function in your own code the model can choose to call. Learn more about function calling.
name: string The name of the function to call.
parameters: map\[unknown\] or null A JSON schema object describing the parameters of the function.
strict: boolean or null Whether strict parameter validation is enforced for this function tool.
type: "function" (default: "function") The type of the function tool. Always function.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
One of the following: "direct" "programmatic" async: optional boolean defer\_loading: optional boolean Whether this function is deferred and loaded via tool search.
description: optional string or null A description of the function. Used by the model to determine whether or not to call the function.
output\_schema: optional map\[unknown\] or null A JSON schema object describing the JSON value encoded in string outputs for this function.
FileSearch { type, vector\_store\_ids, filters, 2 more } A tool that searches for relevant content from uploaded files. Learn more about the file search tool.
type: "file\_search" (default: "file\_search") The type of the file search tool. Always file\_search.
vector\_store\_ids: array of string The IDs of the vector stores to search.
filters: optional ComparisonFilter or CompoundFilter or null A filter to apply.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } Combine multiple filters using and or or.
filters: array of ComparisonFilter or CompoundFilter Array of filters to combine. Items can be ComparisonFilter or CompoundFilter.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } This type repeats the enclosing schema. type: "and" or "or" Type of operation: and or or.
One of the following: "and" "or" max\_num\_results: optional integer The maximum number of results to return. This number should be between 1 and 50 inclusive.
ranking\_options: optional { hybrid\_search, ranker, score\_threshold } Ranking options for search.
hybrid\_search: optional { embedding\_weight, text\_weight } Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.
embedding\_weight: number The weight of the embedding in the reciprocal ranking fusion.
text\_weight: number The weight of the text in the reciprocal ranking fusion.
ranker: optional "auto" or "default-2024-11-15" The ranker to use for the file search.
One of the following: "auto" "default-2024-11-15" score\_threshold: optional number The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.
Computer { type } A tool that controls a virtual computer. Learn more about the computer tool.
type: "computer" (default: "computer") The type of the computer tool. Always computer.
ComputerUsePreview { display\_height, display\_width, environment, type } A tool that controls a virtual computer. Learn more about the computer tool.
display\_height: integer The height of the computer display.
display\_width: integer The width of the computer display.
environment: "windows" or "mac" or "linux" or 2 more The type of computer environment to control.
One of the following: "windows" "mac" "linux" "ubuntu" "browser" type: "computer\_use\_preview" (default: "computer\_use\_preview") The type of the computer use tool. Always computer\_use\_preview.
WebSearch { type, external\_web\_access, filters, 2 more } Search the Internet for sources related to the prompt. Learn more about the
web search tool.
type: "web\_search" or "web\_search\_2025\_08\_26" (default: "web\_search") The type of the web search tool. One of web\_search or web\_search\_2025\_08\_26.
One of the following: "web\_search" "web\_search\_2025\_08\_26" external\_web\_access: optional boolean (default: true) Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content.
filters: optional object or null Filters for the search.
allowed\_domains: optional array of string or null (default: \[\]) Allowed domains for the search. If not provided, all domains are allowed.
Subdomains of the provided domains are allowed as well.
Example: \["pubmed.ncbi.nlm.nih.gov"\]
search\_context\_size: optional "low" or "medium" or "high" (default: "medium") High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the
United States. To avoid this fallback, pass {"type": "approximate"} without
location fields. To localize results, provide the relevant location fields.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
type: optional "approximate" (default: "approximate") The type of location approximation. Always approximate.
Mcp { server\_label, type, allowed\_callers, 9 more } Give the model access to additional tools via remote Model Context Protocol
(MCP) servers. Learn more about MCP.
server\_label: string A label for this MCP server, used to identify it in tool calls.
type: "mcp" The type of the MCP tool. Always mcp.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" allowed\_tools: optional array of string or McpToolFilter or null List of allowed tool names or a filter object.
One of the following: McpAllowedTools = array of string A string array of allowed tool names
McpToolFilter { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
authorization: optional string An OAuth access token that can be used with a remote MCP server, either
with a custom MCP server URL or a service connector. Your application
must handle the OAuth authorization flow and provide the token here.
connector\_id: optional "connector\_dropbox" or "connector\_gmail" or "connector\_googlecalendar" or 5 more Deprecated.
Identifier for service connectors, like those available in ChatGPT. One of
server\_url, connector\_id, or tunnel\_id must be provided. Learn more
about service connectors here.
This field is deprecated for models released after September 1, 2026.
Use server\_url to connect to a remote MCP server, or tunnel\_id to
connect through a Secure MCP Tunnel.
Currently supported connector\_id values are:

Dropbox: connector\_dropbox
Gmail: connector\_gmail
Google Calendar: connector\_googlecalendar
Google Drive: connector\_googledrive
Microsoft Teams: connector\_microsoftteams
Outlook Calendar: connector\_outlookcalendar
Outlook Email: connector\_outlookemail
SharePoint: connector\_sharepoint

One of the following: "connector\_dropbox" "connector\_gmail" "connector\_googlecalendar" "connector\_googledrive" "connector\_microsoftteams" "connector\_outlookcalendar" "connector\_outlookemail" "connector\_sharepoint" defer\_loading: optional boolean Whether this MCP tool is deferred and discovered via tool search.
headers: optional map\[string\] or null Optional HTTP headers to send to the MCP server. Use for authentication
or other purposes.
require\_approval: optional McpToolApprovalFilter or "always" or "never" or null (default: "always") Specify which of the MCP server’s tools require approval.
One of the following: McpToolApprovalFilter { always, never } Specify which of the MCP server’s tools require approval. Can be
always, never, or a filter object associated with tools
that require approval.
always: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
never: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
McpToolApprovalSetting = "always" or "never" Specify a single approval policy for all tools. One of always or
never. When set to always, all tools will require approval. When
set to never, all tools will not require approval.
One of the following: "always" "never" server\_description: optional string Optional description of the MCP server, used to provide more context.
server\_url: optional string The URL for the MCP server. One of server\_url, connector\_id, or
tunnel\_id must be provided.
formaturi tunnel\_id: optional string The Secure MCP Tunnel ID to use instead of a direct server URL. One of
server\_url, connector\_id, or tunnel\_id must be provided.
pattern^tunnel\_\[a-z0-9\]{32}$ CodeInterpreter { container, type, allowed\_callers } A tool that runs Python code to help generate a response to a prompt.
container: string or CodeInterpreterToolAuto The code interpreter container. Can be a container ID or an object that
specifies uploaded file IDs to make available to your code, along with an
optional memory\_limit setting.
One of the following: string The container ID.
CodeInterpreterToolAuto { type, file\_ids, memory\_limit, network\_policy } Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.
type: "auto" (default: "auto") Always auto.
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the code interpreter container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 type: "code\_interpreter" The type of the code interpreter tool. Always code\_interpreter.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" ProgrammaticToolCalling { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The type of the tool. Always programmatic\_tool\_calling.
ImageGeneration { type, action, background, 13 more } A tool that generates images using the GPT image models.
type: "image\_generation" The type of the image generation tool. Always image\_generation.
action: optional "generate" or "edit" or "auto" Whether to generate a new image or edit an existing image. Default: auto.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" (default: "auto") Set the background of the generated image. One of transparent, opaque,
or auto. gpt-image-2.5-sunburst and gpt-image-2.5-flare, including
their 2026-09-08 snapshots, support opaque and transparent
backgrounds. Transparent backgrounds are available for supported GPT Image
models. For gpt-image-2 and gpt-image-2-2026-04-21, this support is in
preview. When using transparent, set the output format to png or webp.
Default: auto.
One of the following: "transparent" "opaque" "auto" complexity: optional "low" or "medium" or "high" Computation spent planning the image, independently of rendering quality.
Overrides the outer response’s reasoning.effort for image generation.
When omitted, inherits a supported outer reasoning effort or uses the
image model’s configured default.
For SVG output, controls the reference image, not the SVG author’s
reasoning.
One of the following: "low" "medium" "high" frame\_count: optional integer (default: 9) Number of GIF frames. Requires output\_format to be gif. Default: 9.
minimum2 maximum16 frame\_duration\_ms: optional integer (default: 200) Duration of each GIF frame in milliseconds, rounded to 10 ms.
Requires output\_format to be gif. Default: 200.
minimum20 maximum2000 input\_fidelity: optional "high" or "low" or null Control how much effort the model will exert to match the style and features, especially facial features, of input images. Supports high and low on gpt-image-1.5; gpt-image-1-mini supports only low. For gpt-image-2, omit this parameter. Defaults to low on supported models.
One of the following: "high" "low" input\_image\_mask: optional { file\_id, image\_url } Optional mask for inpainting. Contains image\_url
(string, optional) and file\_id (string, optional).
file\_id: optional string File ID for the mask image.
image\_url: optional string Base64-encoded mask image.
model: optional string or "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: string "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: "gpt-image-1-mini" "gpt-image-2" "gpt-image-2-2026-04-21" "gpt-image-2.5-sunburst" "gpt-image-2.5-sunburst-2026-09-08" "gpt-image-2.5-flare" "gpt-image-2.5-flare-2026-09-08" "gpt-image-2.6-sunburst" "gpt-image-2.6-flare" "gpt-image-1.5" "chatgpt-image-latest" "gpt-image-1" Deprecated. GPT Image 1 was shut down on October 23, 2026. Use gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
moderation: optional "auto" or "low" (default: "auto") Moderation level for the generated image. Default: auto.
One of the following: "auto" "low" output\_compression: optional integer (default: 100) Compression level for the output image. Default: 100.
minimum0 maximum100 output\_format: optional "png" or "webp" or "jpeg" or 2 more (default: "png") The output format of the generated image. One of png, webp, jpeg,
gif, or svg. Default: png. GIF and SVG output require a model
that supports the selected format. GIF output does not support
partial image streaming (partial\_images greater than 0),
input\_image\_mask, or custom output\_compression.
Responses lifecycle events can still be streamed for GIF output.
One of the following: "png" "webp" "jpeg" "gif" "svg" partial\_images: optional integer (default: 0) Number of partial images to generate in streaming mode, from 0 (default value) to 3.
minimum0 maximum3 quality: optional "low" or "medium" or "high" or 3 more (default: "auto") The quality of the generated image. The GPT image models support low,
medium, and high. gpt-image-2.5-sunburst and gpt-image-2.5-flare,
including their 2026-09-08 snapshots, also support xhigh and max.
Default: auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or "auto" (default: "auto") The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" or "auto" The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: "1024x1024" "1024x1536" "1536x1024" "auto" svg: optional { model, reasoning } SVG author model settings. Requires output\_format to be svg.
When SVG model selection is enabled, omitting this object uses the
outer response model. Otherwise, the default SVG author is used and
explicit model overrides are unavailable.
model: optional string minLength1 reasoning: optional object or null Reasoning effort for SVG authoring. When omitted, uses the author model’s default in both Images and Responses.
effort: optional "none" or "minimal" or "low" or 4 more Controls how much effort the model should spend on reasoning for this request.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" LocalShell { type } A tool that allows the model to execute shell commands in a local environment.
type: "local\_shell" (default: "local\_shell") The type of the local shell tool. Always local\_shell.
Shell { type, allowed\_callers, environment } A tool that allows the model to execute shell commands.
type: "shell" (default: "shell") The type of the shell tool. Always shell.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" environment: optional ContainerAuto or LocalEnvironment or ContainerReference or null One of the following: ContainerAuto { type, file\_ids, memory\_limit, 2 more } type: "container\_auto" (default: "container\_auto") Automatically creates a container for this request
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 skills: optional array of SkillReference or InlineSkill An optional list of skills referenced by id or inline data.
maxItems200 One of the following: SkillReference { skill\_id, type, version } skill\_id: string The ID of the referenced skill.
minLength1 maxLength64 type: "skill\_reference" (default: "skill\_reference") References a skill created with the /v1/skills endpoint.
version: optional string Optional skill version. Use a positive integer or ‘latest’. Omit for default.
InlineSkill { description, name, source, type } description: string The description of the skill.
name: string The name of the skill.
source: InlineSkillSource { data, media\_type, type } Inline skill payload
data: string Base64-encoded skill zip bundle.
minLength1 maxLength70254592 media\_type: "application/zip" (default: "application/zip") The media type of the inline skill payload. Must be application/zip.
type: "base64" (default: "base64") The type of the inline skill source. Must be base64.
type: "inline" (default: "inline") Defines an inline skill for this request.
LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
Namespace { description, name, tools, type } Groups function/custom tools under a shared namespace.
description: string A description of the namespace shown to the model.
name: string The namespace name used in tool calls (for example, crm).
minLength1 tools: array of Function or Custom The function/custom tools available inside this namespace.
minItems1 One of the following: Function { name, type, allowed\_callers, 6 more } name: string pattern^\[a-zA-Z0-9\_-\]+$ minLength1 maxLength128 type: "function" (default: "function") allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this function should be deferred and discovered via tool search.
description: optional string or null output\_schema: optional map\[unknown\] or null A JSON Schema describing the JSON value encoded in string outputs for this function tool. This does not describe content-array outputs.
parameters: optional unknown or null strict: optional boolean or null Whether to enforce strict parameter validation. If omitted, Responses attempts to use strict validation when the schema is compatible, and falls back to non-strict validation otherwise.
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
type: "namespace" (default: "namespace") The type of the tool. Always namespace.
ToolSearch { type, description, execution, parameters } Hosted or BYOT tool search configuration for deferred tools.
type: "tool\_search" (default: "tool\_search") The type of the tool. Always tool\_search.
description: optional string or null Description shown to the model for a client-executed tool search tool.
execution: optional "server" or "client" Whether tool search is executed by the server or by the client.
One of the following: "server" "client" parameters: optional unknown or null Parameter schema for a client-executed tool search tool.
WebSearchPreview { type, search\_content\_types, search\_context\_size, user\_location } This tool searches the web for relevant results to use in a response. Learn more about the web search tool.
type: "web\_search\_preview" or "web\_search\_preview\_2025\_03\_11" (default: "web\_search\_preview") The type of the web search tool. One of web\_search\_preview or web\_search\_preview\_2025\_03\_11.
One of the following: "web\_search\_preview" "web\_search\_preview\_2025\_03\_11" search\_content\_types: optional array of "text" or "image" One of the following: "text" "image" search\_context\_size: optional "low" or "medium" or "high" High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the United States. To avoid this fallback, pass {"type": "approximate"} without location fields. To localize results, provide the relevant location fields.
type: "approximate" (default: "approximate") The type of location approximation. Always approximate.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
ApplyPatch { type, allowed\_callers } Allows the assistant to create, delete, or update files using unified diffs.
type: "apply\_patch" (default: "apply\_patch") The type of the tool. Always apply\_patch.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" type: "additional\_tools" (default: "additional\_tools") The item type. Always additional\_tools.
id: optional string or null The unique ID of this additional tools item.
ConfigurationUpdate { type, id, reasoning, text } An update to the conversation’s response configuration. Supply reasoning,
text, or both. Each setting stays in effect until a later update replaces it.
type: "configuration\_update" (default: "configuration\_update") The item type. Always configuration\_update.
id: optional string or null The unique ID of the configuration update item.
reasoning: optional { effort } Updates to reasoning configuration. Only effort is supported.
effort: optional ReasoningEffort or null (default: "medium") The reasoning effort to use for subsequent responses until another
configuration update replaces it.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" text: optional { format } The text output configuration for subsequent responses.
format: ResponseFormatText or ResponseFormatTextJSONSchemaConfig Use a JSON schema for structured output or text to return to plain text.
One of the following: ResponseFormatText { type } Default response format. Used to generate text responses.
type: "text" The type of response format being defined. Always text.
ResponseFormatTextJSONSchemaConfig { name, schema, type, 2 more } JSON Schema response format. Used to generate structured JSON responses.
Learn more about Structured Outputs.
name: string The name of the response format. Must be a-z, A-Z, 0-9, or contain
underscores and dashes, with a maximum length of 64.
schema: map\[unknown\] The schema for the response format, described as a JSON Schema object.
Learn how to build JSON schemas here.
type: "json\_schema" The type of response format being defined. Always json\_schema.
description: optional string A description of what the response format is for, used by the model to
determine how to respond in the format.
strict: optional boolean or null (default: false) Whether to enable strict schema adherence when generating the output.
If set to true, the model will always follow the exact schema defined
in the schema field. Only a subset of JSON Schema is supported when
strict is true. To learn more, read the Structured Outputs
guide.
Reasoning { id, summary, type, 3 more } A description of the chain of thought used by a reasoning model while generating
a response. Be sure to include these items in your input to the Responses API
for subsequent turns of a conversation if you are manually
managing context.
id: string The unique identifier of the reasoning content.
summary: array of SummaryTextContent { text, type } Reasoning summary content.
text: string A summary of the reasoning output from the model so far.
type: "summary\_text" (default: "summary\_text") The type of the object. Always summary\_text.
type: "reasoning" The type of the object. Always reasoning.
content: optional array of { text, type } Reasoning text content.
text: string The reasoning text from the model.
type: "reasoning\_text" (default: "reasoning\_text") The type of the reasoning text. Always reasoning\_text.
encrypted\_content: optional string or null The encrypted content of the reasoning item. This is populated by default
for reasoning items returned by POST /v1/responses and WebSocket
response.create requests.
When streaming, use the completed reasoning item and its
encrypted\_content from the response.output\_item.done event in
subsequent requests. The encrypted\_content in
response.output\_item.added may be incomplete. This is especially
important when store is false or when using Zero Data Retention.
status: optional "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" Compaction { encrypted\_content, type, id } A compaction item generated by the v1/responses/compact API.
encrypted\_content: string The encrypted content of the compaction summary.
maxLength104857600 type: "compaction" (default: "compaction") The type of the item. Always compaction.
id: optional string or null The ID of the compaction item.
ImageGenerationCall { id, result, status, 9 more } An image generation request made by the model.
id: string The unique ID of the image generation call.
result: string or null The generated image encoded in base64.
status: "in\_progress" or "completed" or "generating" or "failed" The status of the image generation call.
One of the following: "in\_progress" "completed" "generating" "failed" type: "image\_generation\_call" The type of the image generation call. Always image\_generation\_call.
action: optional "generate" or "edit" or "auto" or null The action used for image generation.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" or null The background setting used for generation.
One of the following: "transparent" "opaque" "auto" error: optional { code, message, param, 2 more } Details of a moderation failure, when available.
code: string or null The error code.
message: string A description of the error.
param: string or null The related request parameter.
type: string The error type.
moderation\_details: optional { categories, moderation\_stage } Public details for a moderation\_blocked error, when available.
categories: array of string Public moderation categories. New category values may be added over time.
moderation\_stage: "input" or "output" or "unknown" The stage where moderation blocked the image generation call.
One of the following: "input" "output" "unknown" output\_format: optional "png" or "webp" or "jpeg" or 2 more or null The output format used for generation.
One of the following: "png" "webp" "jpeg" "gif" "svg" quality: optional "low" or "medium" or "high" or 3 more or null The quality of the image generated by the image generation tool call. One of low, medium, high, xhigh, max, or auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" revised\_prompt: optional string or null The prompt that was used after any model prompt rewriting.
size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or null The image dimensions as a WIDTHxHEIGHT string, for example 1536x864.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" The image dimensions as a WIDTHxHEIGHT string, for example 1536x864.
One of the following: "1024x1024" "1024x1536" "1536x1024" svg\_usage: optional { input\_tokens, model, output\_tokens, 2 more } input\_tokens: integer model: string output\_tokens: integer reasoning\_tokens: integer total\_tokens: integer CodeInterpreterCall { id, code, container\_id, 3 more } A tool call to run code.
id: string The unique ID of the code interpreter tool call.
code: string or null The code to run, or null if not available.
container\_id: string The ID of the container used to run the code.
outputs: array of Logs or Image or null The outputs generated by the code interpreter, such as logs or images.
Can be null if no outputs are available.
One of the following: Logs { logs, type } The logs output from the code interpreter.
logs: string The logs output from the code interpreter.
type: "logs" (default: "logs") The type of the output. Always logs.
Image { type, url } The image output from the code interpreter.
type: "image" (default: "image") The type of the output. Always image.
url: string The URL of the image output from the code interpreter.
formaturi status: "in\_progress" or "completed" or "incomplete" or 2 more The status of the code interpreter tool call. Valid values are in\_progress, completed, incomplete, interpreting, and failed.
One of the following: "in\_progress" "completed" "incomplete" "interpreting" "failed" type: "code\_interpreter\_call" (default: "code\_interpreter\_call") The type of the code interpreter tool call. Always code\_interpreter\_call.
LocalShellCall { id, action, call\_id, 2 more } A tool call to run a command on the local shell.
id: string The unique ID of the local shell call.
action: { command, env, type, 3 more } Execute a shell command on the server.
command: array of string The command to run.
env: map\[string\] Environment variables to set for the command.
type: "exec" (default: "exec") The type of the local shell action. Always exec.
timeout\_ms: optional integer or null Optional timeout in milliseconds for the command.
user: optional string or null Optional user to run the command as.
working\_directory: optional string or null Optional working directory to run the command in.
call\_id: string The unique ID of the local shell tool call generated by the model.
status: "in\_progress" or "completed" or "incomplete" The status of the local shell call.
One of the following: "in\_progress" "completed" "incomplete" type: "local\_shell\_call" The type of the local shell call. Always local\_shell\_call.
LocalShellCallOutput { id, output, type, status } The output of a local shell tool call.
id: string The unique ID of the local shell tool call generated by the model.
output: string A JSON string of the output of the local shell tool call.
type: "local\_shell\_call\_output" The type of the local shell tool call output. Always local\_shell\_call\_output.
status: optional "in\_progress" or "completed" or "incomplete" or null The status of the item. One of in\_progress, completed, or incomplete.
One of the following: "in\_progress" "completed" "incomplete" ShellCall { action, call\_id, type, 4 more } A tool representing a request to execute one or more shell commands.
action: { commands, max\_output\_length, timeout\_ms } The shell commands and limits that describe how to run the tool call.
commands: array of string Ordered shell commands for the execution environment to run.
max\_output\_length: optional integer or null Maximum number of UTF-8 characters to capture from combined stdout and stderr output.
timeout\_ms: optional integer or null Maximum wall-clock time in milliseconds to allow the shell commands to run.
call\_id: string The unique ID of the shell tool call generated by the model.
minLength1 maxLength64 type: "shell\_call" (default: "shell\_call") The type of the item. Always shell\_call.
id: optional string or null The unique ID of the shell tool call. Populated when this item is returned via API.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
environment: optional LocalEnvironment or ContainerReference or null The environment to execute the shell commands in.
One of the following: LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
status: optional "in\_progress" or "completed" or "incomplete" or null The status of the shell call. One of in\_progress, completed, or incomplete.
One of the following: "in\_progress" "completed" "incomplete" ShellCallOutput { call\_id, output, type, 4 more } The streamed output items emitted by a shell tool call.
call\_id: string The unique ID of the shell tool call generated by the model.
minLength1 maxLength64 output: array of ResponseFunctionShellCallOutputContent { outcome, stderr, stdout } Captured chunks of stdout and stderr output, along with their associated outcomes.
outcome: Timeout or Exit The exit or timeout outcome associated with this shell call.
One of the following: Timeout { type } Indicates that the shell call exceeded its configured time limit.
type: "timeout" (default: "timeout") The outcome type. Always timeout.
Exit { exit\_code, type } Indicates that the shell commands finished and returned an exit code.
exit\_code: integer The exit code returned by the shell process.
type: "exit" (default: "exit") The outcome type. Always exit.
stderr: string Captured stderr output for the shell call.
maxLength10485760 stdout: string Captured stdout output for the shell call.
maxLength10485760 type: "shell\_call\_output" (default: "shell\_call\_output") The type of the item. Always shell\_call\_output.
id: optional string or null The unique ID of the shell tool call output. Populated when this item is returned via API.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
max\_output\_length: optional integer or null The maximum number of UTF-8 characters captured for this shell call’s combined output.
status: optional "in\_progress" or "completed" or "incomplete" or null The status of the shell call output.
One of the following: "in\_progress" "completed" "incomplete" ApplyPatchCall { call\_id, operation, status, 3 more } A tool call representing a request to create, delete, or update files using diff patches.
call\_id: string The unique ID of the apply patch tool call generated by the model.
minLength1 maxLength64 operation: CreateFile or DeleteFile or UpdateFile The specific create, delete, or update instruction for the apply\_patch tool call.
One of the following: CreateFile { diff, path, type } Instruction for creating a new file via the apply\_patch tool.
diff: string Unified diff content to apply when creating the file.
maxLength10485760 path: string Path of the file to create relative to the workspace root.
minLength1 type: "create\_file" (default: "create\_file") The operation type. Always create\_file.
DeleteFile { path, type } Instruction for deleting an existing file via the apply\_patch tool.
path: string Path of the file to delete relative to the workspace root.
minLength1 type: "delete\_file" (default: "delete\_file") The operation type. Always delete\_file.
UpdateFile { diff, path, type } Instruction for updating an existing file via the apply\_patch tool.
diff: string Unified diff content to apply to the existing file.
maxLength10485760 path: string Path of the file to update relative to the workspace root.
minLength1 type: "update\_file" (default: "update\_file") The operation type. Always update\_file.
status: "in\_progress" or "completed" The status of the apply patch tool call. One of in\_progress or completed.
One of the following: "in\_progress" "completed" type: "apply\_patch\_call" (default: "apply\_patch\_call") The type of the item. Always apply\_patch\_call.
id: optional string or null The unique ID of the apply patch tool call. Populated when this item is returned via API.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
ApplyPatchCallOutput { call\_id, status, type, 3 more } The streamed output emitted by an apply patch tool call.
call\_id: string The unique ID of the apply patch tool call generated by the model.
minLength1 maxLength64 status: "completed" or "failed" The status of the apply patch tool call output. One of completed or failed.
One of the following: "completed" "failed" type: "apply\_patch\_call\_output" (default: "apply\_patch\_call\_output") The type of the item. Always apply\_patch\_call\_output.
id: optional string or null The unique ID of the apply patch tool call output. Populated when this item is returned via API.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
output: optional string or null Optional human-readable log text from the apply patch tool (e.g., patch results or errors).
maxLength10485760 McpListTools { id, server\_label, tools, 2 more } A list of tools available on an MCP server.
id: string The unique ID of the list.
server\_label: string The label of the MCP server.
tools: array of { input\_schema, name, annotations, description } The tools available on the server.
input\_schema: unknown The JSON schema describing the tool’s input.
name: string The name of the tool.
annotations: optional unknown or null Additional annotations about the tool.
description: optional string or null The description of the tool.
type: "mcp\_list\_tools" The type of the item. Always mcp\_list\_tools.
error: optional string or null Error message if the server could not list tools.
McpApprovalRequest { id, arguments, name, 2 more } A request for human approval of a tool invocation.
id: string The unique ID of the approval request.
arguments: string A JSON string of arguments for the tool.
name: string The name of the tool to run.
server\_label: string The label of the MCP server making the request.
type: "mcp\_approval\_request" The type of the item. Always mcp\_approval\_request.
McpApprovalResponse { approval\_request\_id, approve, type, 2 more } A response to an MCP approval request.
approval\_request\_id: string The ID of the approval request being answered.
approve: boolean Whether the request was approved.
type: "mcp\_approval\_response" The type of the item. Always mcp\_approval\_response.
id: optional string or null The unique ID of the approval response
reason: optional string or null Optional reason for the decision.
McpCall { id, arguments, name, 6 more } An invocation of a tool on an MCP server.
id: string The unique ID of the tool call.
arguments: string A JSON string of the arguments passed to the tool.
name: string The name of the tool that was run.
server\_label: string The label of the MCP server running the tool.
type: "mcp\_call" The type of the item. Always mcp\_call.
approval\_request\_id: optional string or null Unique identifier for the MCP tool call approval request.
Include this value in a subsequent mcp\_approval\_response input to approve or reject the corresponding tool call.
error: optional McpToolCallError or null The error from the tool call, if any.
One of the following: McpProtocolError { code, message, type } code: integer message: string type: "mcp\_protocol\_error" (default: "mcp\_protocol\_error") McpToolExecutionError { content, type } content: unknown type: "mcp\_tool\_execution\_error" (default: "mcp\_tool\_execution\_error") HTTPError { code, message, type } code: integer message: string type: "http\_error" (default: "http\_error") output: optional string or null The output from the tool call.
status: optional "in\_progress" or "completed" or "incomplete" or 2 more The status of the tool call. One of in\_progress, completed, incomplete, calling, or failed.
One of the following: "in\_progress" "completed" "incomplete" "calling" "failed" CustomToolCallOutput { call\_id, output, type, 2 more } The output of a custom tool call from your code, being sent back to the model.
call\_id: string The call ID, used to map this custom tool call output to a custom tool call.
output: string or array of ResponseInputText or ResponseInputImage or ResponseInputFile The output from the custom tool call generated by your code.
Can be a string or an list of output content.
One of the following: StringOutput = string A string of the output of the custom tool call.
OutputContentList = array of ResponseInputText or ResponseInputImage or ResponseInputFile Text, image, or file output of the custom tool call.
One of the following: ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" type: "custom\_tool\_call\_output" The type of the custom tool call output. Always custom\_tool\_call\_output.
id: optional string The unique ID of the custom tool call output in the OpenAI platform.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
CustomToolCall { call\_id, input, name, 5 more } A call to a custom tool created by the model.
call\_id: string An identifier used to map this custom tool call to a tool call output.
input: string The input for the custom tool call generated by the model.
name: string The name of the custom tool being called.
type: "custom\_tool\_call" The type of the custom tool call. Always custom\_tool\_call.
id: optional string The unique ID of the custom tool call in the OpenAI platform.
async: optional boolean Whether the custom tool call runs asynchronously.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") namespace: optional string The namespace of the custom tool being called.
CompactionTrigger { type, id } Compacts the current context. Must be the final input item.
type: "compaction\_trigger" (default: "compaction\_trigger") The type of the item. Always compaction\_trigger.
id: optional string or null The unique ID of this compaction trigger.
ItemReference { id, type } An internal identifier for an item to reference.
id: string The ID of the item to reference.
type: optional "item\_reference" or null (default: "item\_reference") The type of item to reference. Always item\_reference.
Program { id, call\_id, code, 2 more } id: string The unique ID of this program item.
call\_id: string The stable call ID of the program item.
minLength1 maxLength64 code: string The JavaScript source executed by programmatic tool calling.
maxLength10485760 fingerprint: string Opaque program replay fingerprint that must be round-tripped.
maxLength10485760 type: "program" (default: "program") The item type. Always program.
ProgramOutput { id, call\_id, result, 2 more } id: string The unique ID of this program output item.
call\_id: string The call ID of the program item.
minLength1 maxLength64 result: string The result produced by the program item.
maxLength10485760 status: "completed" or "incomplete" The terminal status of the program output.
One of the following: "completed" "incomplete" type: "program\_output" (default: "program\_output") The item type. Always program\_output.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20input%20%3E%20(schema))

instructions: optional stringornull

A system (or developer) message inserted into the model’s context.

When using along with `previous_response_id`, the instructions from a previous
response will not be carried over to the next response. This makes it simple
to swap out system (or developer) messages in new responses.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20instructions%20%3E%20(schema))

max\_output\_tokens: optional integerornull

An upper bound for the number of tokens that can be generated for a response, including visible output tokens and [reasoning tokens](https://developers.openai.com/api/docs/guides/reasoning).

minimum16

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20max_output_tokens%20%3E%20(schema))

max\_tool\_calls: optional integerornull

The maximum number of total calls to built-in tools that can be processed in a response. This maximum number applies across all built-in tool calls, not per individual tool. Any further attempts to call a tool by the model will be ignored.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20max_tool_calls%20%3E%20(schema))

metadata: optional [Metadata](https://developers.openai.com/api/reference/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20metadata%20%3E%20(schema))ornull

Set of 16 key-value pairs that can be attached to an object. This can be
useful for storing additional information about the object in a structured
format, and querying for objects via API or the dashboard.

Keys are strings with a maximum length of 64 characters. Values are strings
with a maximum length of 512 characters.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20metadata%20%3E%20(schema))

model: optional [ResponsesModel](https://developers.openai.com/api/reference/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20responses_model%20%3E%20(schema))

Model ID used to generate the response, like `gpt-6-astra`. OpenAI
offers a wide range of models with different capabilities, performance
characteristics, and price points. Refer to the [model guide](https://developers.openai.com/api/docs/models)
to browse and compare available models.

One of the following: string "gpt-6-astra" or "gpt-6.1-sol" or "gpt-6.1-terra" or 87 more One of the following: "gpt-6-astra" "gpt-6.1-sol" "gpt-6.1-terra" "gpt-6-sol" "gpt-6-luna" "gpt-5.6-sol" "gpt-5.6-terra" "gpt-5.6-luna" "gpt-5.5" "gpt-5.5-2026-04-23" "gpt-5.4" "gpt-5.4-mini" "gpt-5.4-mini-2026-03-17" "gpt-5.2" "gpt-5.2-2025-12-11" "gpt-5.2-pro" "gpt-5.2-pro-2025-12-11" "gpt-5.4-nano" Deprecated. Announced shutdown date: 2027-04-01. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.4-nano-2026-03-17" Deprecated. Announced shutdown date: 2027-04-01. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.3-chat-latest" Deprecated. Announced shutdown date: 2026-08-10. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.2-chat-latest" Deprecated. Announced shutdown date: 2026-08-10. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1" Deprecated. Announced shutdown date: 2027-04-01. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1-2025-11-13" Deprecated. Announced shutdown date: 2027-04-01. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1-codex" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1-mini" Deprecated. Not a supported model ID. Retained for SDK compatibility.
"gpt-5.1-chat-latest" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-mini" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-nano" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-2025-08-07" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-mini-2025-08-07" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-nano-2025-08-07" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-chat-latest" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-mini" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-nano" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-2025-04-14" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-mini-2025-04-14" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-nano-2025-04-14" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o4-mini" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o4-mini-2025-04-16" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-2025-04-16" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-mini" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-mini-2025-01-31" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-2024-12-17" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-preview" Deprecated. Announced shutdown date: 2025-07-28. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-preview-2024-09-12" Deprecated. Announced shutdown date: 2025-07-28. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-mini" Deprecated. Announced shutdown date: 2025-10-27. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-mini-2024-09-12" Deprecated. Announced shutdown date: 2025-10-27. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-2024-11-20" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-2024-08-06" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-2024-05-13" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-audio-mini" Deprecated. Announced shutdown date: 2027-01-20. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-audio-mini-2025-12-15" Deprecated. Announced shutdown date: 2027-01-20. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-audio-preview" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-audio-preview-2024-10-01" Deprecated. Announced shutdown date: 2025-10-10. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-audio-preview-2024-12-17" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-audio-preview-2025-06-03" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-audio-preview" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-audio-preview-2024-12-17" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-search-preview" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-search-preview" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-search-preview-2025-03-11" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-search-preview-2025-03-11" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"chatgpt-4o-latest" Deprecated. Announced shutdown date: 2026-02-17. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"codex-mini-latest" Deprecated. Announced shutdown date: 2026-02-12. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-2024-07-18" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-turbo" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-turbo-2024-04-09" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-0125-preview" Deprecated. Announced shutdown date: 2026-03-26. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-turbo-preview" Deprecated. Announced shutdown date: 2026-03-26. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-1106-preview" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-vision-preview" Deprecated. Announced shutdown date: 2024-12-06. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-0314" Deprecated. Announced shutdown date: 2026-03-26. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-0613" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-32k" Deprecated. Announced shutdown date: 2025-06-06. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-32k-0314" Deprecated. Announced shutdown date: 2025-06-06. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-32k-0613" Deprecated. Announced shutdown date: 2025-06-06. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-16k" Deprecated. Announced shutdown date: 2024-09-13. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-0301" Deprecated. Announced shutdown date: 2024-09-13. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-0613" Deprecated. Announced shutdown date: 2024-09-13. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-1106" Deprecated. Announced shutdown date: 2026-09-28. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-0125" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-16k-0613" Deprecated. Announced shutdown date: 2024-09-13. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
ResponsesOnlyModel = "o1-pro" or "o1-pro-2025-03-19" or "o3-pro" or 19 more One of the following: "gpt-5.5-pro" "gpt-5.5-pro-2026-04-23" "gpt-daybreak-blue-latest" "gpt-daybreak-red-latest" "gpt-5.6-cyber" "gpt-6-cyber" "gpt-rosalind-research" "gpt-6-rosalind" "o1-pro" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-pro-2025-03-19" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-pro" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-pro-2025-06-10" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-deep-research" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-deep-research-2025-06-26" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o4-mini-deep-research" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o4-mini-deep-research-2025-06-26" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"computer-use-preview" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"computer-use-preview-2025-03-11" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-codex" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-pro" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-pro-2025-10-06" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1-codex-max" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20model%20%3E%20(schema))

moderation: optional object { model, policy } ornull

Configuration for running moderation on the input and output of this response.

model: string The moderation model to use for moderated completions, e.g. ‘omni-moderation-latest’.
policy: optional object or null The policy to apply to moderated response input and output.
input: optional object or null The moderation policy for the response input.
mode: "score" or "block" One of the following: "score" "block" output: optional object or null The moderation policy for the response output.
mode: "score" or "block" One of the following: "score" "block"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20moderation%20%3E%20(schema))

parallel\_tool\_calls: optional booleanornull (default: true)

Whether to allow the model to run tool calls in parallel.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20parallel_tool_calls%20%3E%20(schema))

previous\_response\_id: optional stringornull

The unique ID of the previous response to the model. Use this to
create multi-turn conversations. Learn more about
[conversation state](https://developers.openai.com/api/docs/guides/conversation-state). Cannot be used in conjunction with `conversation`.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20previous_response_id%20%3E%20(schema))

prompt: optional [ResponsePrompt](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20response_prompt%20%3E%20(schema)) { id, variables, version } ornull

Reference to a prompt template and its variables.
[Learn more](https://developers.openai.com/api/docs/guides/text?api-mode=responses#version-prompts-in-code).

id: string The unique identifier of the prompt template to use.
variables: optional map\[string or ResponseInputText or ResponseInputImage or ResponseInputFile\] or null Optional map of values to substitute in for variables in your
prompt. The substitution values can either be strings, or other
Response input types like images or files.
One of the following: string ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" version: optional string or null Optional version of the prompt template.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20prompt%20%3E%20(schema))

prompt\_cache\_key: optional stringornull

Used by OpenAI to cache responses for similar requests to optimize your cache hit rates. Replaces the `user` field. [Learn more](https://developers.openai.com/api/docs/guides/prompt-caching).

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20prompt_cache_key%20%3E%20(schema))

prompt\_cache\_options: optional object { comparison\_response\_id, mode, prewarm, ttl }

Options for prompt caching. Supported for `gpt-5.6` and later models. By default, OpenAI automatically chooses one implicit cache breakpoint. You can add explicit breakpoints to content blocks with `prompt_cache_breakpoint`. Each request can write up to four breakpoints. For cache matching, OpenAI considers up to the latest 80 breakpoints in the conversation, without a content-block lookback limit. Set `mode` to `explicit` to disable the implicit breakpoint. The `ttl` defaults to `30m`. Supported lifetimes depend on the API. See the [prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching) for current details.

comparison\_response\_id: optional string or null The ID of a response to compare when diagnosing prompt cache reuse. Supplying this field requests prompt cache diagnostics when the feature is enabled.
mode: optional "implicit" or "explicit" Controls whether OpenAI automatically creates an implicit cache breakpoint. Defaults to implicit. With implicit, OpenAI creates one implicit breakpoint and writes up to the latest three explicit breakpoints in the request. With explicit, OpenAI does not create an implicit breakpoint and writes up to the latest four explicit breakpoints. If there are no explicit breakpoints, the request does not use prompt caching.
One of the following: "implicit" "explicit" prewarm: optional boolean Prepares the prompt cache without generating output. Defaults to false. When set to true, overrides the generate field to false.
ttl: optional "30m" or "12h" The minimum lifetime applied to every implicit and explicit cache breakpoint written by the request. Supported values are 30m (the default) and 12h. The backend may retain cache entries for longer.
One of the following: "30m" "12h"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20prompt_cache_options%20%3E%20(schema))

prompt\_cache\_retention: optional "in\_memory"or"24h"ornull

**Deprecated.**

Deprecated. Use `prompt_cache_options.ttl` instead.

The retention policy for the prompt cache. Set to `24h` to enable extended prompt caching, which keeps cached prefixes active for longer, up to a maximum of 24 hours. [Learn more](https://developers.openai.com/api/docs/guides/prompt-caching#prompt-cache-retention).
This field expresses a maximum retention policy, while
`prompt_cache_options.ttl` expresses a minimum cache lifetime. The two
fields are independent and do not interact.
For `gpt-5.5`, `gpt-5.5-pro`, and future models, only `24h` is supported.

For older models that support both `in_memory` and `24h`, the default depends on your organization’s data retention policy:

- Organizations without ZDR enabled default to `24h`.
- Organizations with ZDR enabled default to `in_memory` when `prompt_cache_retention` is not specified.

One of the following:

"in\_memory"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20prompt_cache_retention%20%3E%20(schema)%20%3E%20(member)%200)

"24h"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20prompt_cache_retention%20%3E%20(schema)%20%3E%20(member)%201)

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20prompt_cache_retention%20%3E%20(schema))

reasoning: optional [Reasoning](https://developers.openai.com/api/reference/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20reasoning%20%3E%20(schema)) { context, effort, generate\_summary, 2 more } ornull

Configuration options for
[reasoning models](https://developers.openai.com/api/docs/guides/reasoning).

context: optional "auto" or "current\_turn" or "all\_turns" or null Controls which reasoning items are rendered back to the model on later turns.
If omitted or set to auto, the model determines the context mode. The
gpt-5.6 model family defaults to all\_turns; earlier models default to
current\_turn.
When returned on a response, this is the effective reasoning context mode
used for the response.
One of the following: "auto" "current\_turn" "all\_turns" effort: optional ReasoningEffort or null (default: "medium") Constrains effort on reasoning for reasoning models. Currently supported
values are none, minimal, low, medium, high, xhigh, and max.
Reducing reasoning effort can result in faster responses and fewer tokens
used on reasoning in a response. Not all reasoning models support every
value. See the
reasoning guide
for model-specific support.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" generate\_summary: optional "auto" or "concise" or "detailed" or null Deprecated.
Deprecated: use summary instead.
A summary of the reasoning performed by the model. This can be
useful for debugging and understanding the model’s reasoning process.
One of auto, concise, or detailed.
One of the following: "auto" "concise" "detailed" mode: optional string or "standard" or "pro" Controls the reasoning execution mode for the request.
When returned on a response, this is the effective execution mode.
One of the following: string "standard" or "pro" Controls the reasoning execution mode for the request.
When returned on a response, this is the effective execution mode.
One of the following: "standard" "pro" summary: optional "auto" or "concise" or "detailed" or null A summary of the reasoning performed by the model. This can be
useful for debugging and understanding the model’s reasoning process.
One of auto, concise, or detailed.
concise is supported for computer-use-preview models and all reasoning models after gpt-5.
One of the following: "auto" "concise" "detailed"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20reasoning%20%3E%20(schema))

safety\_identifier: optional stringornull

A stable identifier used to help detect users of your application that may be violating OpenAI’s usage policies.
The IDs should be a string that uniquely identifies each user, with a maximum length of 128 characters. We recommend hashing their username or email address, in order to avoid sending us any identifying information. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).

maxLength128

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20safety_identifier%20%3E%20(schema))

service\_tier: optional [ServiceTier](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20service_tier%20%3E%20(schema))ornull (default: "auto")

Specifies the processing type used for serving the request.

- If set to ‘auto’, then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use ‘default’.
- If set to ‘default’, then the request will be processed with the standard pricing and performance for the selected model.
- If set to ‘ [flex](https://developers.openai.com/api/docs/guides/flex-processing)’, then the request will be processed with the Flex Processing service tier.
- To opt-in to [Fast mode](https://developers.openai.com/api/docs/guides/fast-mode) at the request level, include the `service_tier=fast` or `service_tier=priority` parameter for Responses or Chat Completions. The response will show `service_tier=priority` regardless of if you specify `service_tier=fast` or `priority` in your request.
- If set to ‘ultrafast’, then the request will be processed with the access-controlled Ultrafast Processing service tier. This tier is currently available for `gpt-5.6-sol`; a response served through it will show `service_tier=ultrafast`.
- When not set, the default behavior is ‘auto’.

When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.

One of the following: "auto" "default" "flex" "scale" "priority" "fast" "ultrafast"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20service_tier%20%3E%20(schema))

store: optional booleanornull (default: true)

Whether to store the generated model response for later retrieval via
API.
Defaults to true when omitted.
If set to true, response data will be stored for at least 30 days, subject to the [data retention exceptions](https://developers.openai.com/api/docs/guides/your-data#v1responses).

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20store%20%3E%20(schema))

stream: optional booleanornull (default: false)

If set to true, the model response data will be streamed to the client
as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
See the [Streaming section below](https://developers.openai.com/api/reference/resources/responses/streaming-events)
for more information.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20stream%20%3E%20(schema))

stream\_options: optional object { include\_obfuscation } ornull

Options for streaming responses. Only set this when you set `stream: true`.

include\_obfuscation: optional boolean

When true, stream obfuscation will be enabled. Stream obfuscation adds
random characters to an `obfuscation` field on streaming delta events to
normalize payload sizes as a mitigation to certain side-channel attacks.
These obfuscation fields are included by default, but add a small amount
of overhead to the data stream. You can set `include_obfuscation` to
false to optimize for bandwidth if you trust the network links between
your application and the OpenAI API.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20stream_options%20%3E%20(schema)%20%3E%20(property)%20include_obfuscation)

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20stream_options%20%3E%20(schema))

temperature: optional numberornull (default: 1)

What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
We generally recommend altering this or `top_p` but not both.

minimum0

maximum2

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20temperature%20%3E%20(schema))

text: optional [ResponseTextConfig](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20response_text_config%20%3E%20(schema)) { format, verbosity }

Configuration options for a text response from the model. Can be plain
text or structured JSON data. Learn more:

- [Text inputs and outputs](https://developers.openai.com/api/docs/guides/text)
- [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)

format: optional ResponseFormatTextConfig An object specifying the format that the model must output.
Configuring { "type": "json\_schema" } enables Structured Outputs,
which ensures the model will match your supplied JSON schema. Learn more in the
Structured Outputs guide.
The default format is { "type": "text" } with no additional options.
Not recommended for gpt-4o and newer models:
Setting to { "type": "json\_object" } enables the older JSON mode, which
ensures the message the model generates is valid JSON. Using json\_schema
is preferred for models that support it.
One of the following: ResponseFormatText { type } Default response format. Used to generate text responses.
type: "text" The type of response format being defined. Always text.
ResponseFormatTextJSONSchemaConfig { name, schema, type, 2 more } JSON Schema response format. Used to generate structured JSON responses.
Learn more about Structured Outputs.
name: string The name of the response format. Must be a-z, A-Z, 0-9, or contain
underscores and dashes, with a maximum length of 64.
schema: map\[unknown\] The schema for the response format, described as a JSON Schema object.
Learn how to build JSON schemas here.
type: "json\_schema" The type of response format being defined. Always json\_schema.
description: optional string A description of what the response format is for, used by the model to
determine how to respond in the format.
strict: optional boolean or null (default: false) Whether to enable strict schema adherence when generating the output.
If set to true, the model will always follow the exact schema defined
in the schema field. Only a subset of JSON Schema is supported when
strict is true. To learn more, read the Structured Outputs
guide.
ResponseFormatJSONObject { type } JSON object response format. An older method of generating JSON responses.
Using json\_schema is recommended for models that support it. Note that the
model will not generate JSON without a system or user message instructing it
to do so.
type: "json\_object" The type of response format being defined. Always json\_object.
verbosity: optional "low" or "medium" or "high" or null (default: "medium") Constrains the verbosity of the model’s response. Lower values will result in
more concise responses, while higher values will result in more verbose responses.
Currently supported values are low, medium, and high. The default is
medium.
One of the following: "low" "medium" "high"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20text%20%3E%20(schema))

tool\_choice: optional [ToolChoiceOptions](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20tool_choice_options%20%3E%20(schema))or[ToolChoiceAllowed](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20tool_choice_allowed%20%3E%20(schema)) { mode, tools, type } or[ToolChoiceTypes](https://developers.openai.com/api/reference/resources/responses#(resource)%20responses%20%3E%20(model)%20tool_choice_types%20%3E%20(schema)) { type } or6 more

How the model should select which tool (or tools) to use when generating
a response. See the `tools` parameter to see how to specify which tools
the model can call.

One of the following: ToolChoiceOptions = "none" or "auto" or "required" Controls which (if any) tool is called by the model.
none means the model will not call any tool and instead generates a message.
auto means the model can pick between generating a message or calling one or
more tools.
required means the model must call one or more tools.
One of the following: "none" "auto" "required" ToolChoiceAllowed { mode, tools, type } Constrains the tools available to the model to a pre-defined set.
mode: "auto" or "required" Constrains the tools available to the model to a pre-defined set.
auto allows the model to pick from among the allowed tools and generate a
message.
required requires the model to call one or more of the allowed tools.
One of the following: "auto" "required" tools: array of map\[unknown\] A list of tool definitions that the model should be allowed to call.
For the Responses API, the list of tool definitions might look like:
\[\
{ "type": "function", "name": "get\_weather" },\
{ "type": "mcp", "server\_label": "deepwiki" },\
{ "type": "image\_generation" }\
\]
type: "allowed\_tools" Allowed tool configuration type. Always allowed\_tools.
ToolChoiceTypes { type } Indicates that the model should use a built-in tool to generate a response.
Learn more about built-in tools.
type: "file\_search" or "web\_search\_preview" or "computer" or 5 more The type of hosted tool the model should to use. Learn more about
built-in tools.
Allowed values are:

file\_search
web\_search\_preview
computer
computer\_use\_preview
computer\_use
code\_interpreter
image\_generation

One of the following: "file\_search" "web\_search\_preview" "computer" "computer\_use\_preview" "computer\_use" "web\_search\_preview\_2025\_03\_11" "image\_generation" "code\_interpreter" ToolChoiceFunction { name, type } Use this option to force the model to call a specific function.
name: string The name of the function to call.
type: "function" For function calling, the type is always function.
ToolChoiceMcp { server\_label, type, name } Use this option to force the model to call a specific tool on a remote MCP server.
server\_label: string The label of the MCP server to use.
type: "mcp" For MCP tools, the type is always mcp.
name: optional string or null The name of the tool to call on the server.
ToolChoiceCustom { name, type } Use this option to force the model to call a specific custom tool.
name: string The name of the custom tool to call.
type: "custom" For custom tool calling, the type is always custom.
SpecificProgrammaticToolCallingParam { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The tool to call. Always programmatic\_tool\_calling.
ToolChoiceApplyPatch { type } Forces the model to call the apply\_patch tool when executing a tool call.
type: "apply\_patch" (default: "apply\_patch") The tool to call. Always apply\_patch.
ToolChoiceShell { type } Forces the model to call the shell tool when a tool call is required.
type: "shell" (default: "shell") The tool to call. Always shell.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20tool_choice%20%3E%20(schema))

tools: optional array of Function { name, parameters, strict, 6 more } orFileSearch { type, vector\_store\_ids, filters, 2 more } orComputer { type } or13 more

An array of tools the model may call while generating a response. You
can specify which tool to use by setting the `tool_choice` parameter.

We support the following categories of tools:

- **Built-in tools**: Tools that are provided by OpenAI that extend the
model’s capabilities, like [web search](https://developers.openai.com/api/docs/guides/tools-web-search)
or [file search](https://developers.openai.com/api/docs/guides/tools-file-search). Learn more about
[built-in tools](https://developers.openai.com/api/docs/guides/tools).
- **MCP Tools**: Integrations with third-party systems via custom MCP servers
or predefined connectors such as Google Drive and SharePoint. Learn more about
[MCP Tools](https://developers.openai.com/api/docs/guides/tools-connectors-mcp).
- **Function calls (custom tools)**: Functions that are defined by you,
enabling the model to call your own code with strongly typed arguments
and outputs. Learn more about
[function calling](https://developers.openai.com/api/docs/guides/function-calling). You can also use
custom tools to call your own code.

One of the following: Function { name, parameters, strict, 6 more } Defines a function in your own code the model can choose to call. Learn more about function calling.
name: string The name of the function to call.
parameters: map\[unknown\] or null A JSON schema object describing the parameters of the function.
strict: boolean or null Whether strict parameter validation is enforced for this function tool.
type: "function" (default: "function") The type of the function tool. Always function.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
One of the following: "direct" "programmatic" async: optional boolean defer\_loading: optional boolean Whether this function is deferred and loaded via tool search.
description: optional string or null A description of the function. Used by the model to determine whether or not to call the function.
output\_schema: optional map\[unknown\] or null A JSON schema object describing the JSON value encoded in string outputs for this function.
FileSearch { type, vector\_store\_ids, filters, 2 more } A tool that searches for relevant content from uploaded files. Learn more about the file search tool.
type: "file\_search" (default: "file\_search") The type of the file search tool. Always file\_search.
vector\_store\_ids: array of string The IDs of the vector stores to search.
filters: optional ComparisonFilter or CompoundFilter or null A filter to apply.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } Combine multiple filters using and or or.
filters: array of ComparisonFilter or CompoundFilter Array of filters to combine. Items can be ComparisonFilter or CompoundFilter.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } This type repeats the enclosing schema. type: "and" or "or" Type of operation: and or or.
One of the following: "and" "or" max\_num\_results: optional integer The maximum number of results to return. This number should be between 1 and 50 inclusive.
ranking\_options: optional { hybrid\_search, ranker, score\_threshold } Ranking options for search.
hybrid\_search: optional { embedding\_weight, text\_weight } Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.
embedding\_weight: number The weight of the embedding in the reciprocal ranking fusion.
text\_weight: number The weight of the text in the reciprocal ranking fusion.
ranker: optional "auto" or "default-2024-11-15" The ranker to use for the file search.
One of the following: "auto" "default-2024-11-15" score\_threshold: optional number The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.
Computer { type } A tool that controls a virtual computer. Learn more about the computer tool.
type: "computer" (default: "computer") The type of the computer tool. Always computer.
ComputerUsePreview { display\_height, display\_width, environment, type } A tool that controls a virtual computer. Learn more about the computer tool.
display\_height: integer The height of the computer display.
display\_width: integer The width of the computer display.
environment: "windows" or "mac" or "linux" or 2 more The type of computer environment to control.
One of the following: "windows" "mac" "linux" "ubuntu" "browser" type: "computer\_use\_preview" (default: "computer\_use\_preview") The type of the computer use tool. Always computer\_use\_preview.
WebSearch { type, external\_web\_access, filters, 2 more } Search the Internet for sources related to the prompt. Learn more about the
web search tool.
type: "web\_search" or "web\_search\_2025\_08\_26" (default: "web\_search") The type of the web search tool. One of web\_search or web\_search\_2025\_08\_26.
One of the following: "web\_search" "web\_search\_2025\_08\_26" external\_web\_access: optional boolean (default: true) Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content.
filters: optional object or null Filters for the search.
allowed\_domains: optional array of string or null (default: \[\]) Allowed domains for the search. If not provided, all domains are allowed.
Subdomains of the provided domains are allowed as well.
Example: \["pubmed.ncbi.nlm.nih.gov"\]
search\_context\_size: optional "low" or "medium" or "high" (default: "medium") High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the
United States. To avoid this fallback, pass {"type": "approximate"} without
location fields. To localize results, provide the relevant location fields.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
type: optional "approximate" (default: "approximate") The type of location approximation. Always approximate.
Mcp { server\_label, type, allowed\_callers, 9 more } Give the model access to additional tools via remote Model Context Protocol
(MCP) servers. Learn more about MCP.
server\_label: string A label for this MCP server, used to identify it in tool calls.
type: "mcp" The type of the MCP tool. Always mcp.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" allowed\_tools: optional array of string or McpToolFilter or null List of allowed tool names or a filter object.
One of the following: McpAllowedTools = array of string A string array of allowed tool names
McpToolFilter { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
authorization: optional string An OAuth access token that can be used with a remote MCP server, either
with a custom MCP server URL or a service connector. Your application
must handle the OAuth authorization flow and provide the token here.
connector\_id: optional "connector\_dropbox" or "connector\_gmail" or "connector\_googlecalendar" or 5 more Deprecated.
Identifier for service connectors, like those available in ChatGPT. One of
server\_url, connector\_id, or tunnel\_id must be provided. Learn more
about service connectors here.
This field is deprecated for models released after September 1, 2026.
Use server\_url to connect to a remote MCP server, or tunnel\_id to
connect through a Secure MCP Tunnel.
Currently supported connector\_id values are:

Dropbox: connector\_dropbox
Gmail: connector\_gmail
Google Calendar: connector\_googlecalendar
Google Drive: connector\_googledrive
Microsoft Teams: connector\_microsoftteams
Outlook Calendar: connector\_outlookcalendar
Outlook Email: connector\_outlookemail
SharePoint: connector\_sharepoint

One of the following: "connector\_dropbox" "connector\_gmail" "connector\_googlecalendar" "connector\_googledrive" "connector\_microsoftteams" "connector\_outlookcalendar" "connector\_outlookemail" "connector\_sharepoint" defer\_loading: optional boolean Whether this MCP tool is deferred and discovered via tool search.
headers: optional map\[string\] or null Optional HTTP headers to send to the MCP server. Use for authentication
or other purposes.
require\_approval: optional McpToolApprovalFilter or "always" or "never" or null (default: "always") Specify which of the MCP server’s tools require approval.
One of the following: McpToolApprovalFilter { always, never } Specify which of the MCP server’s tools require approval. Can be
always, never, or a filter object associated with tools
that require approval.
always: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
never: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
McpToolApprovalSetting = "always" or "never" Specify a single approval policy for all tools. One of always or
never. When set to always, all tools will require approval. When
set to never, all tools will not require approval.
One of the following: "always" "never" server\_description: optional string Optional description of the MCP server, used to provide more context.
server\_url: optional string The URL for the MCP server. One of server\_url, connector\_id, or
tunnel\_id must be provided.
formaturi tunnel\_id: optional string The Secure MCP Tunnel ID to use instead of a direct server URL. One of
server\_url, connector\_id, or tunnel\_id must be provided.
pattern^tunnel\_\[a-z0-9\]{32}$ CodeInterpreter { container, type, allowed\_callers } A tool that runs Python code to help generate a response to a prompt.
container: string or CodeInterpreterToolAuto The code interpreter container. Can be a container ID or an object that
specifies uploaded file IDs to make available to your code, along with an
optional memory\_limit setting.
One of the following: string The container ID.
CodeInterpreterToolAuto { type, file\_ids, memory\_limit, network\_policy } Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.
type: "auto" (default: "auto") Always auto.
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the code interpreter container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 type: "code\_interpreter" The type of the code interpreter tool. Always code\_interpreter.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" ProgrammaticToolCalling { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The type of the tool. Always programmatic\_tool\_calling.
ImageGeneration { type, action, background, 13 more } A tool that generates images using the GPT image models.
type: "image\_generation" The type of the image generation tool. Always image\_generation.
action: optional "generate" or "edit" or "auto" Whether to generate a new image or edit an existing image. Default: auto.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" (default: "auto") Set the background of the generated image. One of transparent, opaque,
or auto. gpt-image-2.5-sunburst and gpt-image-2.5-flare, including
their 2026-09-08 snapshots, support opaque and transparent
backgrounds. Transparent backgrounds are available for supported GPT Image
models. For gpt-image-2 and gpt-image-2-2026-04-21, this support is in
preview. When using transparent, set the output format to png or webp.
Default: auto.
One of the following: "transparent" "opaque" "auto" complexity: optional "low" or "medium" or "high" Computation spent planning the image, independently of rendering quality.
Overrides the outer response’s reasoning.effort for image generation.
When omitted, inherits a supported outer reasoning effort or uses the
image model’s configured default.
For SVG output, controls the reference image, not the SVG author’s
reasoning.
One of the following: "low" "medium" "high" frame\_count: optional integer (default: 9) Number of GIF frames. Requires output\_format to be gif. Default: 9.
minimum2 maximum16 frame\_duration\_ms: optional integer (default: 200) Duration of each GIF frame in milliseconds, rounded to 10 ms.
Requires output\_format to be gif. Default: 200.
minimum20 maximum2000 input\_fidelity: optional "high" or "low" or null Control how much effort the model will exert to match the style and features, especially facial features, of input images. Supports high and low on gpt-image-1.5; gpt-image-1-mini supports only low. For gpt-image-2, omit this parameter. Defaults to low on supported models.
One of the following: "high" "low" input\_image\_mask: optional { file\_id, image\_url } Optional mask for inpainting. Contains image\_url
(string, optional) and file\_id (string, optional).
file\_id: optional string File ID for the mask image.
image\_url: optional string Base64-encoded mask image.
model: optional string or "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: string "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: "gpt-image-1-mini" "gpt-image-2" "gpt-image-2-2026-04-21" "gpt-image-2.5-sunburst" "gpt-image-2.5-sunburst-2026-09-08" "gpt-image-2.5-flare" "gpt-image-2.5-flare-2026-09-08" "gpt-image-2.6-sunburst" "gpt-image-2.6-flare" "gpt-image-1.5" "chatgpt-image-latest" "gpt-image-1" Deprecated. GPT Image 1 was shut down on October 23, 2026. Use gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
moderation: optional "auto" or "low" (default: "auto") Moderation level for the generated image. Default: auto.
One of the following: "auto" "low" output\_compression: optional integer (default: 100) Compression level for the output image. Default: 100.
minimum0 maximum100 output\_format: optional "png" or "webp" or "jpeg" or 2 more (default: "png") The output format of the generated image. One of png, webp, jpeg,
gif, or svg. Default: png. GIF and SVG output require a model
that supports the selected format. GIF output does not support
partial image streaming (partial\_images greater than 0),
input\_image\_mask, or custom output\_compression.
Responses lifecycle events can still be streamed for GIF output.
One of the following: "png" "webp" "jpeg" "gif" "svg" partial\_images: optional integer (default: 0) Number of partial images to generate in streaming mode, from 0 (default value) to 3.
minimum0 maximum3 quality: optional "low" or "medium" or "high" or 3 more (default: "auto") The quality of the generated image. The GPT image models support low,
medium, and high. gpt-image-2.5-sunburst and gpt-image-2.5-flare,
including their 2026-09-08 snapshots, also support xhigh and max.
Default: auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or "auto" (default: "auto") The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" or "auto" The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: "1024x1024" "1024x1536" "1536x1024" "auto" svg: optional { model, reasoning } SVG author model settings. Requires output\_format to be svg.
When SVG model selection is enabled, omitting this object uses the
outer response model. Otherwise, the default SVG author is used and
explicit model overrides are unavailable.
model: optional string minLength1 reasoning: optional object or null Reasoning effort for SVG authoring. When omitted, uses the author model’s default in both Images and Responses.
effort: optional "none" or "minimal" or "low" or 4 more Controls how much effort the model should spend on reasoning for this request.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" LocalShell { type } A tool that allows the model to execute shell commands in a local environment.
type: "local\_shell" (default: "local\_shell") The type of the local shell tool. Always local\_shell.
Shell { type, allowed\_callers, environment } A tool that allows the model to execute shell commands.
type: "shell" (default: "shell") The type of the shell tool. Always shell.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" environment: optional ContainerAuto or LocalEnvironment or ContainerReference or null One of the following: ContainerAuto { type, file\_ids, memory\_limit, 2 more } type: "container\_auto" (default: "container\_auto") Automatically creates a container for this request
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 skills: optional array of SkillReference or InlineSkill An optional list of skills referenced by id or inline data.
maxItems200 One of the following: SkillReference { skill\_id, type, version } skill\_id: string The ID of the referenced skill.
minLength1 maxLength64 type: "skill\_reference" (default: "skill\_reference") References a skill created with the /v1/skills endpoint.
version: optional string Optional skill version. Use a positive integer or ‘latest’. Omit for default.
InlineSkill { description, name, source, type } description: string The description of the skill.
name: string The name of the skill.
source: InlineSkillSource { data, media\_type, type } Inline skill payload
data: string Base64-encoded skill zip bundle.
minLength1 maxLength70254592 media\_type: "application/zip" (default: "application/zip") The media type of the inline skill payload. Must be application/zip.
type: "base64" (default: "base64") The type of the inline skill source. Must be base64.
type: "inline" (default: "inline") Defines an inline skill for this request.
LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
Namespace { description, name, tools, type } Groups function/custom tools under a shared namespace.
description: string A description of the namespace shown to the model.
name: string The namespace name used in tool calls (for example, crm).
minLength1 tools: array of Function or Custom The function/custom tools available inside this namespace.
minItems1 One of the following: Function { name, type, allowed\_callers, 6 more } name: string pattern^\[a-zA-Z0-9\_-\]+$ minLength1 maxLength128 type: "function" (default: "function") allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this function should be deferred and discovered via tool search.
description: optional string or null output\_schema: optional map\[unknown\] or null A JSON Schema describing the JSON value encoded in string outputs for this function tool. This does not describe content-array outputs.
parameters: optional unknown or null strict: optional boolean or null Whether to enforce strict parameter validation. If omitted, Responses attempts to use strict validation when the schema is compatible, and falls back to non-strict validation otherwise.
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
type: "namespace" (default: "namespace") The type of the tool. Always namespace.
ToolSearch { type, description, execution, parameters } Hosted or BYOT tool search configuration for deferred tools.
type: "tool\_search" (default: "tool\_search") The type of the tool. Always tool\_search.
description: optional string or null Description shown to the model for a client-executed tool search tool.
execution: optional "server" or "client" Whether tool search is executed by the server or by the client.
One of the following: "server" "client" parameters: optional unknown or null Parameter schema for a client-executed tool search tool.
WebSearchPreview { type, search\_content\_types, search\_context\_size, user\_location } This tool searches the web for relevant results to use in a response. Learn more about the web search tool.
type: "web\_search\_preview" or "web\_search\_preview\_2025\_03\_11" (default: "web\_search\_preview") The type of the web search tool. One of web\_search\_preview or web\_search\_preview\_2025\_03\_11.
One of the following: "web\_search\_preview" "web\_search\_preview\_2025\_03\_11" search\_content\_types: optional array of "text" or "image" One of the following: "text" "image" search\_context\_size: optional "low" or "medium" or "high" High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the United States. To avoid this fallback, pass {"type": "approximate"} without location fields. To localize results, provide the relevant location fields.
type: "approximate" (default: "approximate") The type of location approximation. Always approximate.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
ApplyPatch { type, allowed\_callers } Allows the assistant to create, delete, or update files using unified diffs.
type: "apply\_patch" (default: "apply\_patch") The type of the tool. Always apply\_patch.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20tools%20%3E%20(schema))

top\_logprobs: optional integerornull

An integer between 0 and 20 specifying the maximum number of most likely
tokens to return at each token position, each with an associated log
probability. In some cases, the number of returned tokens may be fewer than
requested.

minimum0

maximum20

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20top_logprobs%20%3E%20(schema))

top\_p: optional numberornull (default: 1)

An alternative to sampling with temperature, called nucleus sampling,
where the model considers the results of the tokens with top\_p probability
mass. So 0.1 means only the tokens comprising the top 10% probability mass
are considered.

We generally recommend altering this or `temperature` but not both.

minimum0

maximum1

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20top_p%20%3E%20(schema))

truncation: optional "auto"or"disabled"ornull (default: "disabled")

**Deprecated.**

The truncation strategy to use for the model response.

- `auto`: If the input to this Response exceeds
the model’s context window size, the model will truncate the
response to fit the context window by dropping items from the beginning of the conversation.
On some models, trimming can begin earlier because the API subtracts the model’s
maximum output allowance from its input limit, even if you set a lower `max_output_tokens`.
- `disabled` (default): If the input size will exceed the context window
size for a model, the request will fail with a 400 error.

One of the following:

"auto"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20truncation%20%3E%20(schema)%20%3E%20(member)%200)

"disabled"

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20truncation%20%3E%20(schema)%20%3E%20(member)%201)

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20truncation%20%3E%20(schema))

user: optional stringornull

**Deprecated.**

This field is being replaced by `safety_identifier` and `prompt_cache_key`. Use `prompt_cache_key` instead to maintain caching optimizations.
A stable identifier for your end-users.
Used to boost cache hit rates by better bucketing similar requests and to help OpenAI detect and prevent abuse. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(method)%20create%20%3E%20(params)%200.non_streaming%20%3E%20(param)%20user%20%3E%20(schema))

##### ReturnsExpand Collapse

Responseobject { id, access\_programs, created\_at, 37 more }

id: string Unique identifier for this Response.
access\_programs: object or null cyber: "standard" or "daybreak\_blue" or "daybreak\_red" The effective Cyber access program used for this response.
One of the following: "standard" "daybreak\_blue" "daybreak\_red" created\_at: number Unix timestamp (in seconds) of when this Response was created.
formatunixtime error: ResponseError or null An error object returned when the model fails to generate a Response.
code: "server\_error" or "rate\_limit\_exceeded" or "invalid\_prompt" or 18 more The error code for the response.
One of the following: "server\_error" "rate\_limit\_exceeded" "invalid\_prompt" "data\_residency\_mismatch" "bio\_policy" "misalignment\_policy\_violation" "vector\_store\_timeout" "invalid\_image" "invalid\_image\_format" "invalid\_base64\_image" "invalid\_image\_url" "image\_too\_large" "image\_too\_small" "image\_parse\_error" "image\_content\_policy\_violation" "invalid\_image\_mode" "image\_file\_too\_large" "unsupported\_image\_media\_type" "empty\_image\_file" "failed\_to\_download\_image" "image\_file\_not\_found" message: string A human-readable description of the error.
misalignment: optional { detailed\_explanation, error\_type, review\_target, steer } detailed\_explanation: optional string The public explanation for this block.
error\_type: optional string or "potentially\_unintended\_data\_transfer" or "potentially\_unintended\_data\_access" or "potentially\_unintended\_destructive\_activity" or "other" An optional classification; clients must accept additional values.
One of the following: string SafetyAlertErrorType = "potentially\_unintended\_data\_transfer" or "potentially\_unintended\_data\_access" or "potentially\_unintended\_destructive\_activity" or "other" An optional classification; clients must accept additional values.
One of the following: "potentially\_unintended\_data\_transfer" "potentially\_unintended\_data\_access" "potentially\_unintended\_destructive\_activity" "other" review\_target: optional string or null An opaque target for explicitly continuing this review, or null when unavailable.
pattern^\[A-Za-z0-9.\_~:-\]+$ minLength1 maxLength96 steer: optional { message } An optional public continuation instruction.
message: string The public continuation instruction.
param: optional string or null The request parameter associated with the error, or null if none was recorded.
type: optional string or null The original error type, or null if it was not recorded.
incomplete\_details: object or null Details about why the response is incomplete.
reason: optional "max\_output\_tokens" or "max\_messages" or "content\_filter" or "steered" The reason why the response is incomplete. steered means
the response stopped at a safe output boundary after a
WebSocket response.steer event. The server can then create
a successor response automatically with the queued input.
One of the following: "max\_output\_tokens" "max\_messages" "content\_filter" "steered" instructions: string or array of EasyInputMessage or Message or ResponseOutputMessage or 30 more or null A system (or developer) message inserted into the model’s context.
When using along with previous\_response\_id, the instructions from a previous
response will not be carried over to the next response. This makes it simple
to swap out system (or developer) messages in new responses.
One of the following: string A text input to the model, equivalent to a text input with the
developer role.
InputItemList = array of EasyInputMessage or Message or ResponseOutputMessage or 30 more A list of one or many input items to the model, containing
different content types.
One of the following: EasyInputMessage { content, role, phase, type } A message input to the model with a role indicating instruction following
hierarchy. Instructions given with the developer or system role take
precedence over instructions given with the user role. Messages with the
assistant role are presumed to have been generated by the model in previous
interactions.
content: string or ResponseInputMessageContentList Text, image, or audio input to the model, used to generate a response.
Can also contain previous assistant responses.
One of the following: TextInput = string A text input to the model.
ResponseInputMessageContentList = array of ResponseInputContent A list of one or many input items to the model, containing different content
types.
One of the following: ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" role: "user" or "assistant" or "system" or "developer" The role of the message input. One of user, assistant, system, or
developer.
One of the following: "user" "assistant" "system" "developer" phase: optional "commentary" or "final\_answer" or null Labels an assistant message as intermediate commentary (commentary) or the final answer (final\_answer).
For models like gpt-5.3-codex and beyond, when sending follow-up requests, preserve and resend
phase on all assistant messages — dropping it can degrade performance. Not used for user messages.
One of the following: "commentary" "final\_answer" type: optional "message" The type of the message input. Always message.
Message { content, role, status, type } A message input to the model with a role indicating instruction following
hierarchy. Instructions given with the developer or system role take
precedence over instructions given with the user role.
content: ResponseInputMessageContentList { , , } A list of one or many input items to the model, containing different content
types.
One of the following: ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" role: "user" or "system" or "developer" The role of the message input. One of user, system, or developer.
One of the following: "user" "system" "developer" status: optional "in\_progress" or "completed" or "incomplete" The status of item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: optional "message" The type of the message input. Always set to message.
ResponseOutputMessage { id, content, role, 3 more } An output message from the model.
id: string The unique ID of the output message.
content: array of ResponseOutputText or ResponseOutputRefusal The content of the output message.
One of the following: ResponseOutputText { annotations, logprobs, text, type } A text output from the model.
annotations: array of FileCitation or URLCitation or ContainerFileCitation or FilePath The annotations of the text output.
One of the following: FileCitation { file\_id, filename, index, type } A citation to a file.
file\_id: string The ID of the file.
filename: string The filename of the file cited.
index: integer The index in the output text at which to insert the file citation.
type: "file\_citation" (default: "file\_citation") The type of the file citation. Always file\_citation.
URLCitation { end\_index, start\_index, title, 2 more } A citation for a web resource used to generate a model response.
end\_index: integer The index of the last character of the URL citation in the message.
start\_index: integer The index of the first character of the URL citation in the message.
title: string The title of the web resource.
type: "url\_citation" (default: "url\_citation") The type of the URL citation. Always url\_citation.
url: string The URL of the web resource.
formaturi ContainerFileCitation { container\_id, end\_index, file\_id, 3 more } A citation for a container file used to generate a model response.
container\_id: string The ID of the container file.
end\_index: integer The index of the last character of the container file citation in the message.
file\_id: string The ID of the file.
filename: string The filename of the container file cited.
start\_index: integer The index of the first character of the container file citation in the message.
type: "container\_file\_citation" (default: "container\_file\_citation") The type of the container file citation. Always container\_file\_citation.
FilePath { file\_id, index, type } A path to a file.
file\_id: string The ID of the file.
index: integer The index of the file in the list of files.
type: "file\_path" The type of the file path. Always file\_path.
logprobs: array of { token, bytes, logprob, top\_logprobs } token: string bytes: array of number logprob: number top\_logprobs: array of { token, bytes, logprob } token: string bytes: array of number logprob: number text: string The text output from the model.
type: "output\_text" (default: "output\_text") The type of the output text. Always output\_text.
ResponseOutputRefusal { refusal, type } A refusal from the model.
refusal: string The refusal explanation from the model.
type: "refusal" (default: "refusal") The type of the refusal. Always refusal.
role: "assistant" The role of the output message. Always assistant.
status: "in\_progress" or "completed" or "incomplete" The status of the message input. One of in\_progress, completed, or
incomplete. Populated when input items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: "message" The type of the output message. Always message.
phase: optional "commentary" or "final\_answer" or null Labels an assistant message as intermediate commentary (commentary) or the final answer (final\_answer).
For models like gpt-5.3-codex and beyond, when sending follow-up requests, preserve and resend
phase on all assistant messages — dropping it can degrade performance. Not used for user messages.
One of the following: "commentary" "final\_answer" FileSearchCall { id, queries, status, 2 more } The results of a file search tool call. See the
file search guide for more information.
id: string The unique ID of the file search tool call.
queries: array of string The queries used to search for files.
status: "in\_progress" or "searching" or "completed" or 2 more The status of the file search tool call. One of in\_progress,
searching, incomplete or failed,
One of the following: "in\_progress" "searching" "completed" "incomplete" "failed" type: "file\_search\_call" The type of the file search tool call. Always file\_search\_call.
results: optional array of object or null The results of the file search tool call.
attributes: optional map\[string or number or boolean\] or null Set of 16 key-value pairs that can be attached to an object. This can be
useful for storing additional information about the object in a structured
format, and querying for objects via API or the dashboard. Keys are strings
with a maximum length of 64 characters. Values are strings with a maximum
length of 512 characters, booleans, or numbers.
One of the following: string maxLength512 number boolean file\_id: optional string The unique ID of the file.
filename: optional string The name of the file.
score: optional number The relevance score of the file - a value between 0 and 1.
formatfloat text: optional string The text that was retrieved from the file.
ComputerCall { id, call\_id, pending\_safety\_checks, 4 more } A tool call to a computer use tool. See the
computer use guide for more information.
id: string The unique ID of the computer call.
call\_id: string An identifier used when responding to the tool call with output.
pending\_safety\_checks: array of { id, code, message } The pending safety checks for the computer call.
id: string The ID of the pending safety check.
code: optional string or null The type of the pending safety check.
message: optional string or null Details about the pending safety check.
status: "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: "computer\_call" (default: "computer\_call") The type of the computer call. Always computer\_call.
action: optional ComputerAction A click action.
One of the following: Click { button, type, x, 2 more } A click action.
button: "left" or "right" or "wheel" or 2 more Indicates which mouse button was pressed during the click. One of left, right, wheel, back, or forward.
One of the following: "left" "right" "wheel" "back" "forward" type: "click" (default: "click") Specifies the event type. For a click action, this property is always click.
x: integer The x-coordinate where the click occurred.
y: integer The y-coordinate where the click occurred.
keys: optional array of string or null The keys being held while clicking.
DoubleClick { keys, type, x, y } A double click action.
keys: array of string or null The keys being held while double-clicking.
type: "double\_click" (default: "double\_click") Specifies the event type. For a double click action, this property is always set to double\_click.
x: integer The x-coordinate where the double click occurred.
y: integer The y-coordinate where the double click occurred.
Drag { path, type, keys } A drag action.
path: array of { x, y } An array of coordinates representing the path of the drag action. Coordinates will appear as an array of objects, eg
\[\
{ x: 100, y: 200 },\
{ x: 200, y: 300 }\
\]
x: integer The x-coordinate.
y: integer The y-coordinate.
type: "drag" (default: "drag") Specifies the event type. For a drag action, this property is always set to drag.
keys: optional array of string or null The keys being held while dragging the mouse.
Keypress { keys, type } A collection of keypresses the model would like to perform.
keys: array of string The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key.
type: "keypress" (default: "keypress") Specifies the event type. For a keypress action, this property is always set to keypress.
Move { type, x, y, keys } A mouse move action.
type: "move" (default: "move") Specifies the event type. For a move action, this property is always set to move.
x: integer The x-coordinate to move to.
y: integer The y-coordinate to move to.
keys: optional array of string or null The keys being held while moving the mouse.
Screenshot { type } A screenshot action.
type: "screenshot" (default: "screenshot") Specifies the event type. For a screenshot action, this property is always set to screenshot.
Scroll { scroll\_x, scroll\_y, type, 3 more } A scroll action.
scroll\_x: integer The horizontal scroll distance.
scroll\_y: integer The vertical scroll distance.
type: "scroll" (default: "scroll") Specifies the event type. For a scroll action, this property is always set to scroll.
x: integer The x-coordinate where the scroll occurred.
y: integer The y-coordinate where the scroll occurred.
keys: optional array of string or null The keys being held while scrolling.
Type { text, type } An action to type in text.
text: string The text to type.
type: "type" (default: "type") Specifies the event type. For a type action, this property is always set to type.
Wait { type } A wait action.
type: "wait" (default: "wait") Specifies the event type. For a wait action, this property is always set to wait.
actions: optional ComputerActionList { Click, DoubleClick, Drag, 6 more } Flattened batched actions for computer\_use. Each action includes an
type discriminator and action-specific fields.
One of the following: Click { button, type, x, 2 more } A click action.
button: "left" or "right" or "wheel" or 2 more Indicates which mouse button was pressed during the click. One of left, right, wheel, back, or forward.
One of the following: "left" "right" "wheel" "back" "forward" type: "click" (default: "click") Specifies the event type. For a click action, this property is always click.
x: integer The x-coordinate where the click occurred.
y: integer The y-coordinate where the click occurred.
keys: optional array of string or null The keys being held while clicking.
DoubleClick { keys, type, x, y } A double click action.
keys: array of string or null The keys being held while double-clicking.
type: "double\_click" (default: "double\_click") Specifies the event type. For a double click action, this property is always set to double\_click.
x: integer The x-coordinate where the double click occurred.
y: integer The y-coordinate where the double click occurred.
Drag { path, type, keys } A drag action.
path: array of { x, y } An array of coordinates representing the path of the drag action. Coordinates will appear as an array of objects, eg
\[\
{ x: 100, y: 200 },\
{ x: 200, y: 300 }\
\]
x: integer The x-coordinate.
y: integer The y-coordinate.
type: "drag" (default: "drag") Specifies the event type. For a drag action, this property is always set to drag.
keys: optional array of string or null The keys being held while dragging the mouse.
Keypress { keys, type } A collection of keypresses the model would like to perform.
keys: array of string The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key.
type: "keypress" (default: "keypress") Specifies the event type. For a keypress action, this property is always set to keypress.
Move { type, x, y, keys } A mouse move action.
type: "move" (default: "move") Specifies the event type. For a move action, this property is always set to move.
x: integer The x-coordinate to move to.
y: integer The y-coordinate to move to.
keys: optional array of string or null The keys being held while moving the mouse.
Screenshot { type } A screenshot action.
type: "screenshot" (default: "screenshot") Specifies the event type. For a screenshot action, this property is always set to screenshot.
Scroll { scroll\_x, scroll\_y, type, 3 more } A scroll action.
scroll\_x: integer The horizontal scroll distance.
scroll\_y: integer The vertical scroll distance.
type: "scroll" (default: "scroll") Specifies the event type. For a scroll action, this property is always set to scroll.
x: integer The x-coordinate where the scroll occurred.
y: integer The y-coordinate where the scroll occurred.
keys: optional array of string or null The keys being held while scrolling.
Type { text, type } An action to type in text.
text: string The text to type.
type: "type" (default: "type") Specifies the event type. For a type action, this property is always set to type.
Wait { type } A wait action.
type: "wait" (default: "wait") Specifies the event type. For a wait action, this property is always set to wait.
ComputerCallOutput { call\_id, output, type, 3 more } The output of a computer tool call.
call\_id: string The ID of the computer tool call that produced the output.
minLength1 maxLength64 output: ResponseComputerToolCallOutputScreenshot { type, file\_id, image\_url } A computer screenshot image used with the computer use tool.
type: "computer\_screenshot" (default: "computer\_screenshot") Specifies the event type. For a computer screenshot, this property is
always set to computer\_screenshot.
file\_id: optional string The identifier of an uploaded file that contains the screenshot.
image\_url: optional string The URL of the screenshot image.
formaturi type: "computer\_call\_output" (default: "computer\_call\_output") The type of the computer tool call output. Always computer\_call\_output.
id: optional string or null The ID of the computer tool call output.
acknowledged\_safety\_checks: optional array of object or null The safety checks reported by the API that have been acknowledged by the developer.
id: string The ID of the pending safety check.
code: optional string or null The type of the pending safety check.
message: optional string or null Details about the pending safety check.
status: optional "in\_progress" or "completed" or "incomplete" or null The status of the message input. One of in\_progress, completed, or incomplete. Populated when input items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" WebSearchCall { id, status, type, action } The results of a web search tool call. See the
web search guide for more information.
id: string The unique ID of the web search tool call.
status: "in\_progress" or "searching" or "completed" or 2 more The status of the web search tool call.
One of the following: "in\_progress" "searching" "completed" "failed" "incomplete" type: "web\_search\_call" The type of the web search tool call. Always web\_search\_call.
action: optional Search or OpenPage or FindInPage An object describing the specific action taken in this web search call.
Includes details on how the model used the web (search, open\_page, find\_in\_page).
One of the following: Search { type, queries, query, sources } Action type “search” - Performs a web search query.
type: "search" The action type.
queries: optional array of string The search queries.
query: optional string Deprecated.
The search query.
sources: optional array of { type, url } The sources used in the search.
type: "url" The type of source. Always url.
url: string The URL of the source.
formaturi OpenPage { type, url } Action type “open\_page” - Opens a specific URL from search results.
type: "open\_page" The action type.
url: optional string or null The URL opened by the model.
formaturi FindInPage { pattern, type, url } Action type “find\_in\_page”: Searches for a pattern within a loaded page.
pattern: string The pattern or text to search for within the page.
type: "find\_in\_page" The action type.
url: optional string or null The URL of the page searched for the pattern, when available.
formaturi FunctionCall { arguments, call\_id, name, 6 more } A tool call to run a function. See the
function calling guide for more information.
arguments: string A JSON string of the arguments to pass to the function.
call\_id: string The unique ID of the function tool call generated by the model.
name: string The name of the function to run.
type: "function\_call" The type of the function tool call. Always function\_call.
id: optional string The unique ID of the function tool call.
async: optional boolean Whether the function tool call runs asynchronously.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") namespace: optional string The namespace of the function to run.
status: optional "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" FunctionCallOutput { output, type, id, 5 more } The output of a function tool call.
output: string or array of ResponseInputTextContent or ResponseInputImageContent or ResponseInputFileContent Text, image, or file output of the function tool call.
One of the following: string A JSON string of the output of the function tool call.
maxLength10485760 array of ResponseInputTextContent or ResponseInputImageContent or ResponseInputFileContent An array of content outputs (text, image, file) for the function tool call.
One of the following: ResponseInputTextContent { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
maxLength10485760 type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional object or null Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImageContent { type, detail, file\_id, 2 more } An image input to the model. Learn about image inputs
type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
detail: optional ImageDetail or null The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
maxLength20971520 formaturi prompt\_cache\_breakpoint: optional object or null Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFileContent { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string or null The base64-encoded data of the file to be sent to the model.
maxLength73400320 file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string or null The URL of the file to be sent to the model.
formaturi filename: optional string or null The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional object or null Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" type: "function\_call\_output" (default: "function\_call\_output") The type of the function tool call output. Always function\_call\_output.
id: optional string or null The unique ID of the function tool call output. Populated when this item is returned via API.
call\_id: optional string or null The unique ID of the function tool call generated by the model.
minLength1 maxLength64 caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
name: optional string or null The name of the tool that produced the output.
minLength1 maxLength128 namespace: optional string or null The namespace of the tool that produced the output.
pattern^\[a-zA-Z0-9\_-\]+$ minLength1 maxLength128 status: optional "in\_progress" or "completed" or "incomplete" or null The status of the item. One of in\_progress, completed, or incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" ToolSearchCall { arguments, type, id, 3 more } arguments: unknown The arguments supplied to the tool search call.
type: "tool\_search\_call" (default: "tool\_search\_call") The item type. Always tool\_search\_call.
id: optional string or null The unique ID of this tool search call.
call\_id: optional string or null The unique ID of the tool search call generated by the model.
minLength1 maxLength64 execution: optional "server" or "client" Whether tool search was executed by the server or by the client.
One of the following: "server" "client" status: optional "in\_progress" or "completed" or "incomplete" or null The status of the tool search call.
One of the following: "in\_progress" "completed" "incomplete" ToolSearchOutput { tools, type, id, 3 more } tools: array of Function or FileSearch or Computer or 13 more The loaded tool definitions returned by the tool search output.
One of the following: Function { name, parameters, strict, 6 more } Defines a function in your own code the model can choose to call. Learn more about function calling.
name: string The name of the function to call.
parameters: map\[unknown\] or null A JSON schema object describing the parameters of the function.
strict: boolean or null Whether strict parameter validation is enforced for this function tool.
type: "function" (default: "function") The type of the function tool. Always function.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
One of the following: "direct" "programmatic" async: optional boolean defer\_loading: optional boolean Whether this function is deferred and loaded via tool search.
description: optional string or null A description of the function. Used by the model to determine whether or not to call the function.
output\_schema: optional map\[unknown\] or null A JSON schema object describing the JSON value encoded in string outputs for this function.
FileSearch { type, vector\_store\_ids, filters, 2 more } A tool that searches for relevant content from uploaded files. Learn more about the file search tool.
type: "file\_search" (default: "file\_search") The type of the file search tool. Always file\_search.
vector\_store\_ids: array of string The IDs of the vector stores to search.
filters: optional ComparisonFilter or CompoundFilter or null A filter to apply.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } Combine multiple filters using and or or.
filters: array of ComparisonFilter or CompoundFilter Array of filters to combine. Items can be ComparisonFilter or CompoundFilter.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } This type repeats the enclosing schema. type: "and" or "or" Type of operation: and or or.
One of the following: "and" "or" max\_num\_results: optional integer The maximum number of results to return. This number should be between 1 and 50 inclusive.
ranking\_options: optional { hybrid\_search, ranker, score\_threshold } Ranking options for search.
hybrid\_search: optional { embedding\_weight, text\_weight } Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.
embedding\_weight: number The weight of the embedding in the reciprocal ranking fusion.
text\_weight: number The weight of the text in the reciprocal ranking fusion.
ranker: optional "auto" or "default-2024-11-15" The ranker to use for the file search.
One of the following: "auto" "default-2024-11-15" score\_threshold: optional number The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.
Computer { type } A tool that controls a virtual computer. Learn more about the computer tool.
type: "computer" (default: "computer") The type of the computer tool. Always computer.
ComputerUsePreview { display\_height, display\_width, environment, type } A tool that controls a virtual computer. Learn more about the computer tool.
display\_height: integer The height of the computer display.
display\_width: integer The width of the computer display.
environment: "windows" or "mac" or "linux" or 2 more The type of computer environment to control.
One of the following: "windows" "mac" "linux" "ubuntu" "browser" type: "computer\_use\_preview" (default: "computer\_use\_preview") The type of the computer use tool. Always computer\_use\_preview.
WebSearch { type, external\_web\_access, filters, 2 more } Search the Internet for sources related to the prompt. Learn more about the
web search tool.
type: "web\_search" or "web\_search\_2025\_08\_26" (default: "web\_search") The type of the web search tool. One of web\_search or web\_search\_2025\_08\_26.
One of the following: "web\_search" "web\_search\_2025\_08\_26" external\_web\_access: optional boolean (default: true) Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content.
filters: optional object or null Filters for the search.
allowed\_domains: optional array of string or null (default: \[\]) Allowed domains for the search. If not provided, all domains are allowed.
Subdomains of the provided domains are allowed as well.
Example: \["pubmed.ncbi.nlm.nih.gov"\]
search\_context\_size: optional "low" or "medium" or "high" (default: "medium") High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the
United States. To avoid this fallback, pass {"type": "approximate"} without
location fields. To localize results, provide the relevant location fields.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
type: optional "approximate" (default: "approximate") The type of location approximation. Always approximate.
Mcp { server\_label, type, allowed\_callers, 9 more } Give the model access to additional tools via remote Model Context Protocol
(MCP) servers. Learn more about MCP.
server\_label: string A label for this MCP server, used to identify it in tool calls.
type: "mcp" The type of the MCP tool. Always mcp.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" allowed\_tools: optional array of string or McpToolFilter or null List of allowed tool names or a filter object.
One of the following: McpAllowedTools = array of string A string array of allowed tool names
McpToolFilter { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
authorization: optional string An OAuth access token that can be used with a remote MCP server, either
with a custom MCP server URL or a service connector. Your application
must handle the OAuth authorization flow and provide the token here.
connector\_id: optional "connector\_dropbox" or "connector\_gmail" or "connector\_googlecalendar" or 5 more Deprecated.
Identifier for service connectors, like those available in ChatGPT. One of
server\_url, connector\_id, or tunnel\_id must be provided. Learn more
about service connectors here.
This field is deprecated for models released after September 1, 2026.
Use server\_url to connect to a remote MCP server, or tunnel\_id to
connect through a Secure MCP Tunnel.
Currently supported connector\_id values are:

Dropbox: connector\_dropbox
Gmail: connector\_gmail
Google Calendar: connector\_googlecalendar
Google Drive: connector\_googledrive
Microsoft Teams: connector\_microsoftteams
Outlook Calendar: connector\_outlookcalendar
Outlook Email: connector\_outlookemail
SharePoint: connector\_sharepoint

One of the following: "connector\_dropbox" "connector\_gmail" "connector\_googlecalendar" "connector\_googledrive" "connector\_microsoftteams" "connector\_outlookcalendar" "connector\_outlookemail" "connector\_sharepoint" defer\_loading: optional boolean Whether this MCP tool is deferred and discovered via tool search.
headers: optional map\[string\] or null Optional HTTP headers to send to the MCP server. Use for authentication
or other purposes.
require\_approval: optional McpToolApprovalFilter or "always" or "never" or null (default: "always") Specify which of the MCP server’s tools require approval.
One of the following: McpToolApprovalFilter { always, never } Specify which of the MCP server’s tools require approval. Can be
always, never, or a filter object associated with tools
that require approval.
always: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
never: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
McpToolApprovalSetting = "always" or "never" Specify a single approval policy for all tools. One of always or
never. When set to always, all tools will require approval. When
set to never, all tools will not require approval.
One of the following: "always" "never" server\_description: optional string Optional description of the MCP server, used to provide more context.
server\_url: optional string The URL for the MCP server. One of server\_url, connector\_id, or
tunnel\_id must be provided.
formaturi tunnel\_id: optional string The Secure MCP Tunnel ID to use instead of a direct server URL. One of
server\_url, connector\_id, or tunnel\_id must be provided.
pattern^tunnel\_\[a-z0-9\]{32}$ CodeInterpreter { container, type, allowed\_callers } A tool that runs Python code to help generate a response to a prompt.
container: string or CodeInterpreterToolAuto The code interpreter container. Can be a container ID or an object that
specifies uploaded file IDs to make available to your code, along with an
optional memory\_limit setting.
One of the following: string The container ID.
CodeInterpreterToolAuto { type, file\_ids, memory\_limit, network\_policy } Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.
type: "auto" (default: "auto") Always auto.
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the code interpreter container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 type: "code\_interpreter" The type of the code interpreter tool. Always code\_interpreter.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" ProgrammaticToolCalling { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The type of the tool. Always programmatic\_tool\_calling.
ImageGeneration { type, action, background, 13 more } A tool that generates images using the GPT image models.
type: "image\_generation" The type of the image generation tool. Always image\_generation.
action: optional "generate" or "edit" or "auto" Whether to generate a new image or edit an existing image. Default: auto.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" (default: "auto") Set the background of the generated image. One of transparent, opaque,
or auto. gpt-image-2.5-sunburst and gpt-image-2.5-flare, including
their 2026-09-08 snapshots, support opaque and transparent
backgrounds. Transparent backgrounds are available for supported GPT Image
models. For gpt-image-2 and gpt-image-2-2026-04-21, this support is in
preview. When using transparent, set the output format to png or webp.
Default: auto.
One of the following: "transparent" "opaque" "auto" complexity: optional "low" or "medium" or "high" Computation spent planning the image, independently of rendering quality.
Overrides the outer response’s reasoning.effort for image generation.
When omitted, inherits a supported outer reasoning effort or uses the
image model’s configured default.
For SVG output, controls the reference image, not the SVG author’s
reasoning.
One of the following: "low" "medium" "high" frame\_count: optional integer (default: 9) Number of GIF frames. Requires output\_format to be gif. Default: 9.
minimum2 maximum16 frame\_duration\_ms: optional integer (default: 200) Duration of each GIF frame in milliseconds, rounded to 10 ms.
Requires output\_format to be gif. Default: 200.
minimum20 maximum2000 input\_fidelity: optional "high" or "low" or null Control how much effort the model will exert to match the style and features, especially facial features, of input images. Supports high and low on gpt-image-1.5; gpt-image-1-mini supports only low. For gpt-image-2, omit this parameter. Defaults to low on supported models.
One of the following: "high" "low" input\_image\_mask: optional { file\_id, image\_url } Optional mask for inpainting. Contains image\_url
(string, optional) and file\_id (string, optional).
file\_id: optional string File ID for the mask image.
image\_url: optional string Base64-encoded mask image.
model: optional string or "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: string "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: "gpt-image-1-mini" "gpt-image-2" "gpt-image-2-2026-04-21" "gpt-image-2.5-sunburst" "gpt-image-2.5-sunburst-2026-09-08" "gpt-image-2.5-flare" "gpt-image-2.5-flare-2026-09-08" "gpt-image-2.6-sunburst" "gpt-image-2.6-flare" "gpt-image-1.5" "chatgpt-image-latest" "gpt-image-1" Deprecated. GPT Image 1 was shut down on October 23, 2026. Use gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
moderation: optional "auto" or "low" (default: "auto") Moderation level for the generated image. Default: auto.
One of the following: "auto" "low" output\_compression: optional integer (default: 100) Compression level for the output image. Default: 100.
minimum0 maximum100 output\_format: optional "png" or "webp" or "jpeg" or 2 more (default: "png") The output format of the generated image. One of png, webp, jpeg,
gif, or svg. Default: png. GIF and SVG output require a model
that supports the selected format. GIF output does not support
partial image streaming (partial\_images greater than 0),
input\_image\_mask, or custom output\_compression.
Responses lifecycle events can still be streamed for GIF output.
One of the following: "png" "webp" "jpeg" "gif" "svg" partial\_images: optional integer (default: 0) Number of partial images to generate in streaming mode, from 0 (default value) to 3.
minimum0 maximum3 quality: optional "low" or "medium" or "high" or 3 more (default: "auto") The quality of the generated image. The GPT image models support low,
medium, and high. gpt-image-2.5-sunburst and gpt-image-2.5-flare,
including their 2026-09-08 snapshots, also support xhigh and max.
Default: auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or "auto" (default: "auto") The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" or "auto" The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: "1024x1024" "1024x1536" "1536x1024" "auto" svg: optional { model, reasoning } SVG author model settings. Requires output\_format to be svg.
When SVG model selection is enabled, omitting this object uses the
outer response model. Otherwise, the default SVG author is used and
explicit model overrides are unavailable.
model: optional string minLength1 reasoning: optional object or null Reasoning effort for SVG authoring. When omitted, uses the author model’s default in both Images and Responses.
effort: optional "none" or "minimal" or "low" or 4 more Controls how much effort the model should spend on reasoning for this request.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" LocalShell { type } A tool that allows the model to execute shell commands in a local environment.
type: "local\_shell" (default: "local\_shell") The type of the local shell tool. Always local\_shell.
Shell { type, allowed\_callers, environment } A tool that allows the model to execute shell commands.
type: "shell" (default: "shell") The type of the shell tool. Always shell.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" environment: optional ContainerAuto or LocalEnvironment or ContainerReference or null One of the following: ContainerAuto { type, file\_ids, memory\_limit, 2 more } type: "container\_auto" (default: "container\_auto") Automatically creates a container for this request
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 skills: optional array of SkillReference or InlineSkill An optional list of skills referenced by id or inline data.
maxItems200 One of the following: SkillReference { skill\_id, type, version } skill\_id: string The ID of the referenced skill.
minLength1 maxLength64 type: "skill\_reference" (default: "skill\_reference") References a skill created with the /v1/skills endpoint.
version: optional string Optional skill version. Use a positive integer or ‘latest’. Omit for default.
InlineSkill { description, name, source, type } description: string The description of the skill.
name: string The name of the skill.
source: InlineSkillSource { data, media\_type, type } Inline skill payload
data: string Base64-encoded skill zip bundle.
minLength1 maxLength70254592 media\_type: "application/zip" (default: "application/zip") The media type of the inline skill payload. Must be application/zip.
type: "base64" (default: "base64") The type of the inline skill source. Must be base64.
type: "inline" (default: "inline") Defines an inline skill for this request.
LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
ToolSearchOutputNamespaceTool { description, name, tools, type } Groups function/custom tools under a shared namespace.
description: string A description of the namespace shown to the model.
name: string The namespace name used in tool calls (for example, crm).
minLength1 tools: array of Function or Custom The function/custom tools loaded inside this namespace.
minItems1 One of the following: Function { name, type, allowed\_callers, 6 more } name: string The name of the loaded function tool.
pattern^(?!\[\\s\\S\]\*\[\\r\\n\])\[a-zA-Z0-9\_.-\]+$ minLength1 maxLength128 type: "function" (default: "function") allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this function should be deferred and discovered via tool search.
description: optional string or null output\_schema: optional map\[unknown\] or null A JSON Schema describing the JSON value encoded in string outputs for this function tool. This does not describe content-array outputs.
parameters: optional unknown or null strict: optional boolean or null Whether to enforce strict parameter validation. If omitted, Responses attempts to use strict validation when the schema is compatible, and falls back to non-strict validation otherwise.
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
type: "namespace" (default: "namespace") The type of the tool. Always namespace.
ToolSearch { type, description, execution, parameters } Hosted or BYOT tool search configuration for deferred tools.
type: "tool\_search" (default: "tool\_search") The type of the tool. Always tool\_search.
description: optional string or null Description shown to the model for a client-executed tool search tool.
execution: optional "server" or "client" Whether tool search is executed by the server or by the client.
One of the following: "server" "client" parameters: optional unknown or null Parameter schema for a client-executed tool search tool.
WebSearchPreview { type, search\_content\_types, search\_context\_size, user\_location } This tool searches the web for relevant results to use in a response. Learn more about the web search tool.
type: "web\_search\_preview" or "web\_search\_preview\_2025\_03\_11" (default: "web\_search\_preview") The type of the web search tool. One of web\_search\_preview or web\_search\_preview\_2025\_03\_11.
One of the following: "web\_search\_preview" "web\_search\_preview\_2025\_03\_11" search\_content\_types: optional array of "text" or "image" One of the following: "text" "image" search\_context\_size: optional "low" or "medium" or "high" High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the United States. To avoid this fallback, pass {"type": "approximate"} without location fields. To localize results, provide the relevant location fields.
type: "approximate" (default: "approximate") The type of location approximation. Always approximate.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
ApplyPatch { type, allowed\_callers } Allows the assistant to create, delete, or update files using unified diffs.
type: "apply\_patch" (default: "apply\_patch") The type of the tool. Always apply\_patch.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" type: "tool\_search\_output" (default: "tool\_search\_output") The item type. Always tool\_search\_output.
id: optional string or null The unique ID of this tool search output.
call\_id: optional string or null The unique ID of the tool search call generated by the model.
minLength1 maxLength64 execution: optional "server" or "client" Whether tool search was executed by the server or by the client.
One of the following: "server" "client" status: optional "in\_progress" or "completed" or "incomplete" or null The status of the tool search output.
One of the following: "in\_progress" "completed" "incomplete" AdditionalTools { role, tools, type, id } role: "developer" (default: "developer") The role that provided the additional tools. Only developer is supported.
tools: array of Function or FileSearch or Computer or 13 more A list of additional tools made available at this item.
One of the following: Function { name, parameters, strict, 6 more } Defines a function in your own code the model can choose to call. Learn more about function calling.
name: string The name of the function to call.
parameters: map\[unknown\] or null A JSON schema object describing the parameters of the function.
strict: boolean or null Whether strict parameter validation is enforced for this function tool.
type: "function" (default: "function") The type of the function tool. Always function.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
One of the following: "direct" "programmatic" async: optional boolean defer\_loading: optional boolean Whether this function is deferred and loaded via tool search.
description: optional string or null A description of the function. Used by the model to determine whether or not to call the function.
output\_schema: optional map\[unknown\] or null A JSON schema object describing the JSON value encoded in string outputs for this function.
FileSearch { type, vector\_store\_ids, filters, 2 more } A tool that searches for relevant content from uploaded files. Learn more about the file search tool.
type: "file\_search" (default: "file\_search") The type of the file search tool. Always file\_search.
vector\_store\_ids: array of string The IDs of the vector stores to search.
filters: optional ComparisonFilter or CompoundFilter or null A filter to apply.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } Combine multiple filters using and or or.
filters: array of ComparisonFilter or CompoundFilter Array of filters to combine. Items can be ComparisonFilter or CompoundFilter.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } This type repeats the enclosing schema. type: "and" or "or" Type of operation: and or or.
One of the following: "and" "or" max\_num\_results: optional integer The maximum number of results to return. This number should be between 1 and 50 inclusive.
ranking\_options: optional { hybrid\_search, ranker, score\_threshold } Ranking options for search.
hybrid\_search: optional { embedding\_weight, text\_weight } Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.
embedding\_weight: number The weight of the embedding in the reciprocal ranking fusion.
text\_weight: number The weight of the text in the reciprocal ranking fusion.
ranker: optional "auto" or "default-2024-11-15" The ranker to use for the file search.
One of the following: "auto" "default-2024-11-15" score\_threshold: optional number The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.
Computer { type } A tool that controls a virtual computer. Learn more about the computer tool.
type: "computer" (default: "computer") The type of the computer tool. Always computer.
ComputerUsePreview { display\_height, display\_width, environment, type } A tool that controls a virtual computer. Learn more about the computer tool.
display\_height: integer The height of the computer display.
display\_width: integer The width of the computer display.
environment: "windows" or "mac" or "linux" or 2 more The type of computer environment to control.
One of the following: "windows" "mac" "linux" "ubuntu" "browser" type: "computer\_use\_preview" (default: "computer\_use\_preview") The type of the computer use tool. Always computer\_use\_preview.
WebSearch { type, external\_web\_access, filters, 2 more } Search the Internet for sources related to the prompt. Learn more about the
web search tool.
type: "web\_search" or "web\_search\_2025\_08\_26" (default: "web\_search") The type of the web search tool. One of web\_search or web\_search\_2025\_08\_26.
One of the following: "web\_search" "web\_search\_2025\_08\_26" external\_web\_access: optional boolean (default: true) Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content.
filters: optional object or null Filters for the search.
allowed\_domains: optional array of string or null (default: \[\]) Allowed domains for the search. If not provided, all domains are allowed.
Subdomains of the provided domains are allowed as well.
Example: \["pubmed.ncbi.nlm.nih.gov"\]
search\_context\_size: optional "low" or "medium" or "high" (default: "medium") High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the
United States. To avoid this fallback, pass {"type": "approximate"} without
location fields. To localize results, provide the relevant location fields.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
type: optional "approximate" (default: "approximate") The type of location approximation. Always approximate.
Mcp { server\_label, type, allowed\_callers, 9 more } Give the model access to additional tools via remote Model Context Protocol
(MCP) servers. Learn more about MCP.
server\_label: string A label for this MCP server, used to identify it in tool calls.
type: "mcp" The type of the MCP tool. Always mcp.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" allowed\_tools: optional array of string or McpToolFilter or null List of allowed tool names or a filter object.
One of the following: McpAllowedTools = array of string A string array of allowed tool names
McpToolFilter { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
authorization: optional string An OAuth access token that can be used with a remote MCP server, either
with a custom MCP server URL or a service connector. Your application
must handle the OAuth authorization flow and provide the token here.
connector\_id: optional "connector\_dropbox" or "connector\_gmail" or "connector\_googlecalendar" or 5 more Deprecated.
Identifier for service connectors, like those available in ChatGPT. One of
server\_url, connector\_id, or tunnel\_id must be provided. Learn more
about service connectors here.
This field is deprecated for models released after September 1, 2026.
Use server\_url to connect to a remote MCP server, or tunnel\_id to
connect through a Secure MCP Tunnel.
Currently supported connector\_id values are:

Dropbox: connector\_dropbox
Gmail: connector\_gmail
Google Calendar: connector\_googlecalendar
Google Drive: connector\_googledrive
Microsoft Teams: connector\_microsoftteams
Outlook Calendar: connector\_outlookcalendar
Outlook Email: connector\_outlookemail
SharePoint: connector\_sharepoint

One of the following: "connector\_dropbox" "connector\_gmail" "connector\_googlecalendar" "connector\_googledrive" "connector\_microsoftteams" "connector\_outlookcalendar" "connector\_outlookemail" "connector\_sharepoint" defer\_loading: optional boolean Whether this MCP tool is deferred and discovered via tool search.
headers: optional map\[string\] or null Optional HTTP headers to send to the MCP server. Use for authentication
or other purposes.
require\_approval: optional McpToolApprovalFilter or "always" or "never" or null (default: "always") Specify which of the MCP server’s tools require approval.
One of the following: McpToolApprovalFilter { always, never } Specify which of the MCP server’s tools require approval. Can be
always, never, or a filter object associated with tools
that require approval.
always: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
never: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
McpToolApprovalSetting = "always" or "never" Specify a single approval policy for all tools. One of always or
never. When set to always, all tools will require approval. When
set to never, all tools will not require approval.
One of the following: "always" "never" server\_description: optional string Optional description of the MCP server, used to provide more context.
server\_url: optional string The URL for the MCP server. One of server\_url, connector\_id, or
tunnel\_id must be provided.
formaturi tunnel\_id: optional string The Secure MCP Tunnel ID to use instead of a direct server URL. One of
server\_url, connector\_id, or tunnel\_id must be provided.
pattern^tunnel\_\[a-z0-9\]{32}$ CodeInterpreter { container, type, allowed\_callers } A tool that runs Python code to help generate a response to a prompt.
container: string or CodeInterpreterToolAuto The code interpreter container. Can be a container ID or an object that
specifies uploaded file IDs to make available to your code, along with an
optional memory\_limit setting.
One of the following: string The container ID.
CodeInterpreterToolAuto { type, file\_ids, memory\_limit, network\_policy } Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.
type: "auto" (default: "auto") Always auto.
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the code interpreter container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 type: "code\_interpreter" The type of the code interpreter tool. Always code\_interpreter.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" ProgrammaticToolCalling { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The type of the tool. Always programmatic\_tool\_calling.
ImageGeneration { type, action, background, 13 more } A tool that generates images using the GPT image models.
type: "image\_generation" The type of the image generation tool. Always image\_generation.
action: optional "generate" or "edit" or "auto" Whether to generate a new image or edit an existing image. Default: auto.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" (default: "auto") Set the background of the generated image. One of transparent, opaque,
or auto. gpt-image-2.5-sunburst and gpt-image-2.5-flare, including
their 2026-09-08 snapshots, support opaque and transparent
backgrounds. Transparent backgrounds are available for supported GPT Image
models. For gpt-image-2 and gpt-image-2-2026-04-21, this support is in
preview. When using transparent, set the output format to png or webp.
Default: auto.
One of the following: "transparent" "opaque" "auto" complexity: optional "low" or "medium" or "high" Computation spent planning the image, independently of rendering quality.
Overrides the outer response’s reasoning.effort for image generation.
When omitted, inherits a supported outer reasoning effort or uses the
image model’s configured default.
For SVG output, controls the reference image, not the SVG author’s
reasoning.
One of the following: "low" "medium" "high" frame\_count: optional integer (default: 9) Number of GIF frames. Requires output\_format to be gif. Default: 9.
minimum2 maximum16 frame\_duration\_ms: optional integer (default: 200) Duration of each GIF frame in milliseconds, rounded to 10 ms.
Requires output\_format to be gif. Default: 200.
minimum20 maximum2000 input\_fidelity: optional "high" or "low" or null Control how much effort the model will exert to match the style and features, especially facial features, of input images. Supports high and low on gpt-image-1.5; gpt-image-1-mini supports only low. For gpt-image-2, omit this parameter. Defaults to low on supported models.
One of the following: "high" "low" input\_image\_mask: optional { file\_id, image\_url } Optional mask for inpainting. Contains image\_url
(string, optional) and file\_id (string, optional).
file\_id: optional string File ID for the mask image.
image\_url: optional string Base64-encoded mask image.
model: optional string or "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: string "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: "gpt-image-1-mini" "gpt-image-2" "gpt-image-2-2026-04-21" "gpt-image-2.5-sunburst" "gpt-image-2.5-sunburst-2026-09-08" "gpt-image-2.5-flare" "gpt-image-2.5-flare-2026-09-08" "gpt-image-2.6-sunburst" "gpt-image-2.6-flare" "gpt-image-1.5" "chatgpt-image-latest" "gpt-image-1" Deprecated. GPT Image 1 was shut down on October 23, 2026. Use gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
moderation: optional "auto" or "low" (default: "auto") Moderation level for the generated image. Default: auto.
One of the following: "auto" "low" output\_compression: optional integer (default: 100) Compression level for the output image. Default: 100.
minimum0 maximum100 output\_format: optional "png" or "webp" or "jpeg" or 2 more (default: "png") The output format of the generated image. One of png, webp, jpeg,
gif, or svg. Default: png. GIF and SVG output require a model
that supports the selected format. GIF output does not support
partial image streaming (partial\_images greater than 0),
input\_image\_mask, or custom output\_compression.
Responses lifecycle events can still be streamed for GIF output.
One of the following: "png" "webp" "jpeg" "gif" "svg" partial\_images: optional integer (default: 0) Number of partial images to generate in streaming mode, from 0 (default value) to 3.
minimum0 maximum3 quality: optional "low" or "medium" or "high" or 3 more (default: "auto") The quality of the generated image. The GPT image models support low,
medium, and high. gpt-image-2.5-sunburst and gpt-image-2.5-flare,
including their 2026-09-08 snapshots, also support xhigh and max.
Default: auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or "auto" (default: "auto") The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" or "auto" The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: "1024x1024" "1024x1536" "1536x1024" "auto" svg: optional { model, reasoning } SVG author model settings. Requires output\_format to be svg.
When SVG model selection is enabled, omitting this object uses the
outer response model. Otherwise, the default SVG author is used and
explicit model overrides are unavailable.
model: optional string minLength1 reasoning: optional object or null Reasoning effort for SVG authoring. When omitted, uses the author model’s default in both Images and Responses.
effort: optional "none" or "minimal" or "low" or 4 more Controls how much effort the model should spend on reasoning for this request.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" LocalShell { type } A tool that allows the model to execute shell commands in a local environment.
type: "local\_shell" (default: "local\_shell") The type of the local shell tool. Always local\_shell.
Shell { type, allowed\_callers, environment } A tool that allows the model to execute shell commands.
type: "shell" (default: "shell") The type of the shell tool. Always shell.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" environment: optional ContainerAuto or LocalEnvironment or ContainerReference or null One of the following: ContainerAuto { type, file\_ids, memory\_limit, 2 more } type: "container\_auto" (default: "container\_auto") Automatically creates a container for this request
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 skills: optional array of SkillReference or InlineSkill An optional list of skills referenced by id or inline data.
maxItems200 One of the following: SkillReference { skill\_id, type, version } skill\_id: string The ID of the referenced skill.
minLength1 maxLength64 type: "skill\_reference" (default: "skill\_reference") References a skill created with the /v1/skills endpoint.
version: optional string Optional skill version. Use a positive integer or ‘latest’. Omit for default.
InlineSkill { description, name, source, type } description: string The description of the skill.
name: string The name of the skill.
source: InlineSkillSource { data, media\_type, type } Inline skill payload
data: string Base64-encoded skill zip bundle.
minLength1 maxLength70254592 media\_type: "application/zip" (default: "application/zip") The media type of the inline skill payload. Must be application/zip.
type: "base64" (default: "base64") The type of the inline skill source. Must be base64.
type: "inline" (default: "inline") Defines an inline skill for this request.
LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
Namespace { description, name, tools, type } Groups function/custom tools under a shared namespace.
description: string A description of the namespace shown to the model.
name: string The namespace name used in tool calls (for example, crm).
minLength1 tools: array of Function or Custom The function/custom tools available inside this namespace.
minItems1 One of the following: Function { name, type, allowed\_callers, 6 more } name: string pattern^\[a-zA-Z0-9\_-\]+$ minLength1 maxLength128 type: "function" (default: "function") allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this function should be deferred and discovered via tool search.
description: optional string or null output\_schema: optional map\[unknown\] or null A JSON Schema describing the JSON value encoded in string outputs for this function tool. This does not describe content-array outputs.
parameters: optional unknown or null strict: optional boolean or null Whether to enforce strict parameter validation. If omitted, Responses attempts to use strict validation when the schema is compatible, and falls back to non-strict validation otherwise.
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
type: "namespace" (default: "namespace") The type of the tool. Always namespace.
ToolSearch { type, description, execution, parameters } Hosted or BYOT tool search configuration for deferred tools.
type: "tool\_search" (default: "tool\_search") The type of the tool. Always tool\_search.
description: optional string or null Description shown to the model for a client-executed tool search tool.
execution: optional "server" or "client" Whether tool search is executed by the server or by the client.
One of the following: "server" "client" parameters: optional unknown or null Parameter schema for a client-executed tool search tool.
WebSearchPreview { type, search\_content\_types, search\_context\_size, user\_location } This tool searches the web for relevant results to use in a response. Learn more about the web search tool.
type: "web\_search\_preview" or "web\_search\_preview\_2025\_03\_11" (default: "web\_search\_preview") The type of the web search tool. One of web\_search\_preview or web\_search\_preview\_2025\_03\_11.
One of the following: "web\_search\_preview" "web\_search\_preview\_2025\_03\_11" search\_content\_types: optional array of "text" or "image" One of the following: "text" "image" search\_context\_size: optional "low" or "medium" or "high" High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the United States. To avoid this fallback, pass {"type": "approximate"} without location fields. To localize results, provide the relevant location fields.
type: "approximate" (default: "approximate") The type of location approximation. Always approximate.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
ApplyPatch { type, allowed\_callers } Allows the assistant to create, delete, or update files using unified diffs.
type: "apply\_patch" (default: "apply\_patch") The type of the tool. Always apply\_patch.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" type: "additional\_tools" (default: "additional\_tools") The item type. Always additional\_tools.
id: optional string or null The unique ID of this additional tools item.
ConfigurationUpdate { type, id, reasoning, text } An update to the conversation’s response configuration. Supply reasoning,
text, or both. Each setting stays in effect until a later update replaces it.
type: "configuration\_update" (default: "configuration\_update") The item type. Always configuration\_update.
id: optional string or null The unique ID of the configuration update item.
reasoning: optional { effort } Updates to reasoning configuration. Only effort is supported.
effort: optional ReasoningEffort or null (default: "medium") The reasoning effort to use for subsequent responses until another
configuration update replaces it.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" text: optional { format } The text output configuration for subsequent responses.
format: ResponseFormatText or ResponseFormatTextJSONSchemaConfig Use a JSON schema for structured output or text to return to plain text.
One of the following: ResponseFormatText { type } Default response format. Used to generate text responses.
type: "text" The type of response format being defined. Always text.
ResponseFormatTextJSONSchemaConfig { name, schema, type, 2 more } JSON Schema response format. Used to generate structured JSON responses.
Learn more about Structured Outputs.
name: string The name of the response format. Must be a-z, A-Z, 0-9, or contain
underscores and dashes, with a maximum length of 64.
schema: map\[unknown\] The schema for the response format, described as a JSON Schema object.
Learn how to build JSON schemas here.
type: "json\_schema" The type of response format being defined. Always json\_schema.
description: optional string A description of what the response format is for, used by the model to
determine how to respond in the format.
strict: optional boolean or null (default: false) Whether to enable strict schema adherence when generating the output.
If set to true, the model will always follow the exact schema defined
in the schema field. Only a subset of JSON Schema is supported when
strict is true. To learn more, read the Structured Outputs
guide.
Reasoning { id, summary, type, 3 more } A description of the chain of thought used by a reasoning model while generating
a response. Be sure to include these items in your input to the Responses API
for subsequent turns of a conversation if you are manually
managing context.
id: string The unique identifier of the reasoning content.
summary: array of SummaryTextContent { text, type } Reasoning summary content.
text: string A summary of the reasoning output from the model so far.
type: "summary\_text" (default: "summary\_text") The type of the object. Always summary\_text.
type: "reasoning" The type of the object. Always reasoning.
content: optional array of { text, type } Reasoning text content.
text: string The reasoning text from the model.
type: "reasoning\_text" (default: "reasoning\_text") The type of the reasoning text. Always reasoning\_text.
encrypted\_content: optional string or null The encrypted content of the reasoning item. This is populated by default
for reasoning items returned by POST /v1/responses and WebSocket
response.create requests.
When streaming, use the completed reasoning item and its
encrypted\_content from the response.output\_item.done event in
subsequent requests. The encrypted\_content in
response.output\_item.added may be incomplete. This is especially
important when store is false or when using Zero Data Retention.
status: optional "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" Compaction { encrypted\_content, type, id } A compaction item generated by the v1/responses/compact API.
encrypted\_content: string The encrypted content of the compaction summary.
maxLength104857600 type: "compaction" (default: "compaction") The type of the item. Always compaction.
id: optional string or null The ID of the compaction item.
ImageGenerationCall { id, result, status, 9 more } An image generation request made by the model.
id: string The unique ID of the image generation call.
result: string or null The generated image encoded in base64.
status: "in\_progress" or "completed" or "generating" or "failed" The status of the image generation call.
One of the following: "in\_progress" "completed" "generating" "failed" type: "image\_generation\_call" The type of the image generation call. Always image\_generation\_call.
action: optional "generate" or "edit" or "auto" or null The action used for image generation.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" or null The background setting used for generation.
One of the following: "transparent" "opaque" "auto" error: optional { code, message, param, 2 more } Details of a moderation failure, when available.
code: string or null The error code.
message: string A description of the error.
param: string or null The related request parameter.
type: string The error type.
moderation\_details: optional { categories, moderation\_stage } Public details for a moderation\_blocked error, when available.
categories: array of string Public moderation categories. New category values may be added over time.
moderation\_stage: "input" or "output" or "unknown" The stage where moderation blocked the image generation call.
One of the following: "input" "output" "unknown" output\_format: optional "png" or "webp" or "jpeg" or 2 more or null The output format used for generation.
One of the following: "png" "webp" "jpeg" "gif" "svg" quality: optional "low" or "medium" or "high" or 3 more or null The quality of the image generated by the image generation tool call. One of low, medium, high, xhigh, max, or auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" revised\_prompt: optional string or null The prompt that was used after any model prompt rewriting.
size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or null The image dimensions as a WIDTHxHEIGHT string, for example 1536x864.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" The image dimensions as a WIDTHxHEIGHT string, for example 1536x864.
One of the following: "1024x1024" "1024x1536" "1536x1024" svg\_usage: optional { input\_tokens, model, output\_tokens, 2 more } input\_tokens: integer model: string output\_tokens: integer reasoning\_tokens: integer total\_tokens: integer CodeInterpreterCall { id, code, container\_id, 3 more } A tool call to run code.
id: string The unique ID of the code interpreter tool call.
code: string or null The code to run, or null if not available.
container\_id: string The ID of the container used to run the code.
outputs: array of Logs or Image or null The outputs generated by the code interpreter, such as logs or images.
Can be null if no outputs are available.
One of the following: Logs { logs, type } The logs output from the code interpreter.
logs: string The logs output from the code interpreter.
type: "logs" (default: "logs") The type of the output. Always logs.
Image { type, url } The image output from the code interpreter.
type: "image" (default: "image") The type of the output. Always image.
url: string The URL of the image output from the code interpreter.
formaturi status: "in\_progress" or "completed" or "incomplete" or 2 more The status of the code interpreter tool call. Valid values are in\_progress, completed, incomplete, interpreting, and failed.
One of the following: "in\_progress" "completed" "incomplete" "interpreting" "failed" type: "code\_interpreter\_call" (default: "code\_interpreter\_call") The type of the code interpreter tool call. Always code\_interpreter\_call.
LocalShellCall { id, action, call\_id, 2 more } A tool call to run a command on the local shell.
id: string The unique ID of the local shell call.
action: { command, env, type, 3 more } Execute a shell command on the server.
command: array of string The command to run.
env: map\[string\] Environment variables to set for the command.
type: "exec" (default: "exec") The type of the local shell action. Always exec.
timeout\_ms: optional integer or null Optional timeout in milliseconds for the command.
user: optional string or null Optional user to run the command as.
working\_directory: optional string or null Optional working directory to run the command in.
call\_id: string The unique ID of the local shell tool call generated by the model.
status: "in\_progress" or "completed" or "incomplete" The status of the local shell call.
One of the following: "in\_progress" "completed" "incomplete" type: "local\_shell\_call" The type of the local shell call. Always local\_shell\_call.
LocalShellCallOutput { id, output, type, status } The output of a local shell tool call.
id: string The unique ID of the local shell tool call generated by the model.
output: string A JSON string of the output of the local shell tool call.
type: "local\_shell\_call\_output" The type of the local shell tool call output. Always local\_shell\_call\_output.
status: optional "in\_progress" or "completed" or "incomplete" or null The status of the item. One of in\_progress, completed, or incomplete.
One of the following: "in\_progress" "completed" "incomplete" ShellCall { action, call\_id, type, 4 more } A tool representing a request to execute one or more shell commands.
action: { commands, max\_output\_length, timeout\_ms } The shell commands and limits that describe how to run the tool call.
commands: array of string Ordered shell commands for the execution environment to run.
max\_output\_length: optional integer or null Maximum number of UTF-8 characters to capture from combined stdout and stderr output.
timeout\_ms: optional integer or null Maximum wall-clock time in milliseconds to allow the shell commands to run.
call\_id: string The unique ID of the shell tool call generated by the model.
minLength1 maxLength64 type: "shell\_call" (default: "shell\_call") The type of the item. Always shell\_call.
id: optional string or null The unique ID of the shell tool call. Populated when this item is returned via API.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
environment: optional LocalEnvironment or ContainerReference or null The environment to execute the shell commands in.
One of the following: LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
status: optional "in\_progress" or "completed" or "incomplete" or null The status of the shell call. One of in\_progress, completed, or incomplete.
One of the following: "in\_progress" "completed" "incomplete" ShellCallOutput { call\_id, output, type, 4 more } The streamed output items emitted by a shell tool call.
call\_id: string The unique ID of the shell tool call generated by the model.
minLength1 maxLength64 output: array of ResponseFunctionShellCallOutputContent { outcome, stderr, stdout } Captured chunks of stdout and stderr output, along with their associated outcomes.
outcome: Timeout or Exit The exit or timeout outcome associated with this shell call.
One of the following: Timeout { type } Indicates that the shell call exceeded its configured time limit.
type: "timeout" (default: "timeout") The outcome type. Always timeout.
Exit { exit\_code, type } Indicates that the shell commands finished and returned an exit code.
exit\_code: integer The exit code returned by the shell process.
type: "exit" (default: "exit") The outcome type. Always exit.
stderr: string Captured stderr output for the shell call.
maxLength10485760 stdout: string Captured stdout output for the shell call.
maxLength10485760 type: "shell\_call\_output" (default: "shell\_call\_output") The type of the item. Always shell\_call\_output.
id: optional string or null The unique ID of the shell tool call output. Populated when this item is returned via API.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
max\_output\_length: optional integer or null The maximum number of UTF-8 characters captured for this shell call’s combined output.
status: optional "in\_progress" or "completed" or "incomplete" or null The status of the shell call output.
One of the following: "in\_progress" "completed" "incomplete" ApplyPatchCall { call\_id, operation, status, 3 more } A tool call representing a request to create, delete, or update files using diff patches.
call\_id: string The unique ID of the apply patch tool call generated by the model.
minLength1 maxLength64 operation: CreateFile or DeleteFile or UpdateFile The specific create, delete, or update instruction for the apply\_patch tool call.
One of the following: CreateFile { diff, path, type } Instruction for creating a new file via the apply\_patch tool.
diff: string Unified diff content to apply when creating the file.
maxLength10485760 path: string Path of the file to create relative to the workspace root.
minLength1 type: "create\_file" (default: "create\_file") The operation type. Always create\_file.
DeleteFile { path, type } Instruction for deleting an existing file via the apply\_patch tool.
path: string Path of the file to delete relative to the workspace root.
minLength1 type: "delete\_file" (default: "delete\_file") The operation type. Always delete\_file.
UpdateFile { diff, path, type } Instruction for updating an existing file via the apply\_patch tool.
diff: string Unified diff content to apply to the existing file.
maxLength10485760 path: string Path of the file to update relative to the workspace root.
minLength1 type: "update\_file" (default: "update\_file") The operation type. Always update\_file.
status: "in\_progress" or "completed" The status of the apply patch tool call. One of in\_progress or completed.
One of the following: "in\_progress" "completed" type: "apply\_patch\_call" (default: "apply\_patch\_call") The type of the item. Always apply\_patch\_call.
id: optional string or null The unique ID of the apply patch tool call. Populated when this item is returned via API.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
ApplyPatchCallOutput { call\_id, status, type, 3 more } The streamed output emitted by an apply patch tool call.
call\_id: string The unique ID of the apply patch tool call generated by the model.
minLength1 maxLength64 status: "completed" or "failed" The status of the apply patch tool call output. One of completed or failed.
One of the following: "completed" "failed" type: "apply\_patch\_call\_output" (default: "apply\_patch\_call\_output") The type of the item. Always apply\_patch\_call\_output.
id: optional string or null The unique ID of the apply patch tool call output. Populated when this item is returned via API.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
output: optional string or null Optional human-readable log text from the apply patch tool (e.g., patch results or errors).
maxLength10485760 McpListTools { id, server\_label, tools, 2 more } A list of tools available on an MCP server.
id: string The unique ID of the list.
server\_label: string The label of the MCP server.
tools: array of { input\_schema, name, annotations, description } The tools available on the server.
input\_schema: unknown The JSON schema describing the tool’s input.
name: string The name of the tool.
annotations: optional unknown or null Additional annotations about the tool.
description: optional string or null The description of the tool.
type: "mcp\_list\_tools" The type of the item. Always mcp\_list\_tools.
error: optional string or null Error message if the server could not list tools.
McpApprovalRequest { id, arguments, name, 2 more } A request for human approval of a tool invocation.
id: string The unique ID of the approval request.
arguments: string A JSON string of arguments for the tool.
name: string The name of the tool to run.
server\_label: string The label of the MCP server making the request.
type: "mcp\_approval\_request" The type of the item. Always mcp\_approval\_request.
McpApprovalResponse { approval\_request\_id, approve, type, 2 more } A response to an MCP approval request.
approval\_request\_id: string The ID of the approval request being answered.
approve: boolean Whether the request was approved.
type: "mcp\_approval\_response" The type of the item. Always mcp\_approval\_response.
id: optional string or null The unique ID of the approval response
reason: optional string or null Optional reason for the decision.
McpCall { id, arguments, name, 6 more } An invocation of a tool on an MCP server.
id: string The unique ID of the tool call.
arguments: string A JSON string of the arguments passed to the tool.
name: string The name of the tool that was run.
server\_label: string The label of the MCP server running the tool.
type: "mcp\_call" The type of the item. Always mcp\_call.
approval\_request\_id: optional string or null Unique identifier for the MCP tool call approval request.
Include this value in a subsequent mcp\_approval\_response input to approve or reject the corresponding tool call.
error: optional McpToolCallError or null The error from the tool call, if any.
One of the following: McpProtocolError { code, message, type } code: integer message: string type: "mcp\_protocol\_error" (default: "mcp\_protocol\_error") McpToolExecutionError { content, type } content: unknown type: "mcp\_tool\_execution\_error" (default: "mcp\_tool\_execution\_error") HTTPError { code, message, type } code: integer message: string type: "http\_error" (default: "http\_error") output: optional string or null The output from the tool call.
status: optional "in\_progress" or "completed" or "incomplete" or 2 more The status of the tool call. One of in\_progress, completed, incomplete, calling, or failed.
One of the following: "in\_progress" "completed" "incomplete" "calling" "failed" CustomToolCallOutput { call\_id, output, type, 2 more } The output of a custom tool call from your code, being sent back to the model.
call\_id: string The call ID, used to map this custom tool call output to a custom tool call.
output: string or array of ResponseInputText or ResponseInputImage or ResponseInputFile The output from the custom tool call generated by your code.
Can be a string or an list of output content.
One of the following: StringOutput = string A string of the output of the custom tool call.
OutputContentList = array of ResponseInputText or ResponseInputImage or ResponseInputFile Text, image, or file output of the custom tool call.
One of the following: ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" type: "custom\_tool\_call\_output" The type of the custom tool call output. Always custom\_tool\_call\_output.
id: optional string The unique ID of the custom tool call output in the OpenAI platform.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
CustomToolCall { call\_id, input, name, 5 more } A call to a custom tool created by the model.
call\_id: string An identifier used to map this custom tool call to a tool call output.
input: string The input for the custom tool call generated by the model.
name: string The name of the custom tool being called.
type: "custom\_tool\_call" The type of the custom tool call. Always custom\_tool\_call.
id: optional string The unique ID of the custom tool call in the OpenAI platform.
async: optional boolean Whether the custom tool call runs asynchronously.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") namespace: optional string The namespace of the custom tool being called.
CompactionTrigger { type, id } Compacts the current context. Must be the final input item.
type: "compaction\_trigger" (default: "compaction\_trigger") The type of the item. Always compaction\_trigger.
id: optional string or null The unique ID of this compaction trigger.
ItemReference { id, type } An internal identifier for an item to reference.
id: string The ID of the item to reference.
type: optional "item\_reference" or null (default: "item\_reference") The type of item to reference. Always item\_reference.
Program { id, call\_id, code, 2 more } id: string The unique ID of this program item.
call\_id: string The stable call ID of the program item.
minLength1 maxLength64 code: string The JavaScript source executed by programmatic tool calling.
maxLength10485760 fingerprint: string Opaque program replay fingerprint that must be round-tripped.
maxLength10485760 type: "program" (default: "program") The item type. Always program.
ProgramOutput { id, call\_id, result, 2 more } id: string The unique ID of this program output item.
call\_id: string The call ID of the program item.
minLength1 maxLength64 result: string The result produced by the program item.
maxLength10485760 status: "completed" or "incomplete" The terminal status of the program output.
One of the following: "completed" "incomplete" type: "program\_output" (default: "program\_output") The item type. Always program\_output.
metadata: Metadata or null Set of 16 key-value pairs that can be attached to an object. This can be
useful for storing additional information about the object in a structured
format, and querying for objects via API or the dashboard.
Keys are strings with a maximum length of 64 characters. Values are strings
with a maximum length of 512 characters.
model: ResponsesModel Model ID used to generate the response, like gpt-6-astra. OpenAI
offers a wide range of models with different capabilities, performance
characteristics, and price points. Refer to the model guide
to browse and compare available models.
One of the following: string "gpt-6-astra" or "gpt-6.1-sol" or "gpt-6.1-terra" or 87 more One of the following: "gpt-6-astra" "gpt-6.1-sol" "gpt-6.1-terra" "gpt-6-sol" "gpt-6-luna" "gpt-5.6-sol" "gpt-5.6-terra" "gpt-5.6-luna" "gpt-5.5" "gpt-5.5-2026-04-23" "gpt-5.4" "gpt-5.4-mini" "gpt-5.4-mini-2026-03-17" "gpt-5.2" "gpt-5.2-2025-12-11" "gpt-5.2-pro" "gpt-5.2-pro-2025-12-11" "gpt-5.4-nano" Deprecated. Announced shutdown date: 2027-04-01. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.4-nano-2026-03-17" Deprecated. Announced shutdown date: 2027-04-01. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.3-chat-latest" Deprecated. Announced shutdown date: 2026-08-10. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.2-chat-latest" Deprecated. Announced shutdown date: 2026-08-10. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1" Deprecated. Announced shutdown date: 2027-04-01. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1-2025-11-13" Deprecated. Announced shutdown date: 2027-04-01. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1-codex" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1-mini" Deprecated. Not a supported model ID. Retained for SDK compatibility.
"gpt-5.1-chat-latest" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-mini" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-nano" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-2025-08-07" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-mini-2025-08-07" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-nano-2025-08-07" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-chat-latest" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-mini" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-nano" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-2025-04-14" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-mini-2025-04-14" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4.1-nano-2025-04-14" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o4-mini" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o4-mini-2025-04-16" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-2025-04-16" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-mini" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-mini-2025-01-31" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-2024-12-17" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-preview" Deprecated. Announced shutdown date: 2025-07-28. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-preview-2024-09-12" Deprecated. Announced shutdown date: 2025-07-28. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-mini" Deprecated. Announced shutdown date: 2025-10-27. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-mini-2024-09-12" Deprecated. Announced shutdown date: 2025-10-27. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-2024-11-20" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-2024-08-06" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-2024-05-13" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-audio-mini" Deprecated. Announced shutdown date: 2027-01-20. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-audio-mini-2025-12-15" Deprecated. Announced shutdown date: 2027-01-20. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-audio-preview" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-audio-preview-2024-10-01" Deprecated. Announced shutdown date: 2025-10-10. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-audio-preview-2024-12-17" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-audio-preview-2025-06-03" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-audio-preview" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-audio-preview-2024-12-17" Deprecated. Announced shutdown date: 2026-05-07. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-search-preview" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-search-preview" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-search-preview-2025-03-11" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-search-preview-2025-03-11" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"chatgpt-4o-latest" Deprecated. Announced shutdown date: 2026-02-17. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"codex-mini-latest" Deprecated. Announced shutdown date: 2026-02-12. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4o-mini-2024-07-18" Deprecated. Announced shutdown date: 2027-01-14. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-turbo" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-turbo-2024-04-09" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-0125-preview" Deprecated. Announced shutdown date: 2026-03-26. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-turbo-preview" Deprecated. Announced shutdown date: 2026-03-26. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-1106-preview" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-vision-preview" Deprecated. Announced shutdown date: 2024-12-06. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-0314" Deprecated. Announced shutdown date: 2026-03-26. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-0613" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-32k" Deprecated. Announced shutdown date: 2025-06-06. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-32k-0314" Deprecated. Announced shutdown date: 2025-06-06. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-4-32k-0613" Deprecated. Announced shutdown date: 2025-06-06. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-16k" Deprecated. Announced shutdown date: 2024-09-13. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-0301" Deprecated. Announced shutdown date: 2024-09-13. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-0613" Deprecated. Announced shutdown date: 2024-09-13. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-1106" Deprecated. Announced shutdown date: 2026-09-28. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-0125" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-3.5-turbo-16k-0613" Deprecated. Announced shutdown date: 2024-09-13. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
ResponsesOnlyModel = "o1-pro" or "o1-pro-2025-03-19" or "o3-pro" or 19 more One of the following: "gpt-5.5-pro" "gpt-5.5-pro-2026-04-23" "gpt-daybreak-blue-latest" "gpt-daybreak-red-latest" "gpt-5.6-cyber" "gpt-6-cyber" "gpt-rosalind-research" "gpt-6-rosalind" "o1-pro" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o1-pro-2025-03-19" Deprecated. Announced shutdown date: 2026-10-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-pro" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-pro-2025-06-10" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-deep-research" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o3-deep-research-2025-06-26" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o4-mini-deep-research" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"o4-mini-deep-research-2025-06-26" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"computer-use-preview" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"computer-use-preview-2025-03-11" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-codex" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-pro" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5-pro-2025-10-06" Deprecated. Announced shutdown date: 2026-12-11. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
"gpt-5.1-codex-max" Deprecated. Announced shutdown date: 2026-07-23. See https://developers.openai.com/api/docs/deprecations for details and recommended replacements.
object: "response" The object type of this resource - always set to response.
output: array of ResponseOutputItem An array of content items generated by the model.

The length and order of items in the output array is dependent
on the model’s response.
Rather than accessing the first item in the output array and
assuming it’s an assistant message with the content generated by
the model, you might consider using the output\_text property where
supported in SDKs.

One of the following: ResponseOutputMessage { id, content, role, 3 more } An output message from the model.
id: string The unique ID of the output message.
content: array of ResponseOutputText or ResponseOutputRefusal The content of the output message.
One of the following: ResponseOutputText { annotations, logprobs, text, type } A text output from the model.
annotations: array of FileCitation or URLCitation or ContainerFileCitation or FilePath The annotations of the text output.
One of the following: FileCitation { file\_id, filename, index, type } A citation to a file.
file\_id: string The ID of the file.
filename: string The filename of the file cited.
index: integer The index in the output text at which to insert the file citation.
type: "file\_citation" (default: "file\_citation") The type of the file citation. Always file\_citation.
URLCitation { end\_index, start\_index, title, 2 more } A citation for a web resource used to generate a model response.
end\_index: integer The index of the last character of the URL citation in the message.
start\_index: integer The index of the first character of the URL citation in the message.
title: string The title of the web resource.
type: "url\_citation" (default: "url\_citation") The type of the URL citation. Always url\_citation.
url: string The URL of the web resource.
formaturi ContainerFileCitation { container\_id, end\_index, file\_id, 3 more } A citation for a container file used to generate a model response.
container\_id: string The ID of the container file.
end\_index: integer The index of the last character of the container file citation in the message.
file\_id: string The ID of the file.
filename: string The filename of the container file cited.
start\_index: integer The index of the first character of the container file citation in the message.
type: "container\_file\_citation" (default: "container\_file\_citation") The type of the container file citation. Always container\_file\_citation.
FilePath { file\_id, index, type } A path to a file.
file\_id: string The ID of the file.
index: integer The index of the file in the list of files.
type: "file\_path" The type of the file path. Always file\_path.
logprobs: array of { token, bytes, logprob, top\_logprobs } token: string bytes: array of number logprob: number top\_logprobs: array of { token, bytes, logprob } token: string bytes: array of number logprob: number text: string The text output from the model.
type: "output\_text" (default: "output\_text") The type of the output text. Always output\_text.
ResponseOutputRefusal { refusal, type } A refusal from the model.
refusal: string The refusal explanation from the model.
type: "refusal" (default: "refusal") The type of the refusal. Always refusal.
role: "assistant" The role of the output message. Always assistant.
status: "in\_progress" or "completed" or "incomplete" The status of the message input. One of in\_progress, completed, or
incomplete. Populated when input items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: "message" The type of the output message. Always message.
phase: optional "commentary" or "final\_answer" or null Labels an assistant message as intermediate commentary (commentary) or the final answer (final\_answer).
For models like gpt-5.3-codex and beyond, when sending follow-up requests, preserve and resend
phase on all assistant messages — dropping it can degrade performance. Not used for user messages.
One of the following: "commentary" "final\_answer" FileSearchCall { id, queries, status, 2 more } The results of a file search tool call. See the
file search guide for more information.
id: string The unique ID of the file search tool call.
queries: array of string The queries used to search for files.
status: "in\_progress" or "searching" or "completed" or 2 more The status of the file search tool call. One of in\_progress,
searching, incomplete or failed,
One of the following: "in\_progress" "searching" "completed" "incomplete" "failed" type: "file\_search\_call" The type of the file search tool call. Always file\_search\_call.
results: optional array of object or null The results of the file search tool call.
attributes: optional map\[string or number or boolean\] or null Set of 16 key-value pairs that can be attached to an object. This can be
useful for storing additional information about the object in a structured
format, and querying for objects via API or the dashboard. Keys are strings
with a maximum length of 64 characters. Values are strings with a maximum
length of 512 characters, booleans, or numbers.
One of the following: string maxLength512 number boolean file\_id: optional string The unique ID of the file.
filename: optional string The name of the file.
score: optional number The relevance score of the file - a value between 0 and 1.
formatfloat text: optional string The text that was retrieved from the file.
FunctionCall { arguments, call\_id, name, 6 more } A tool call to run a function. See the
function calling guide for more information.
arguments: string A JSON string of the arguments to pass to the function.
call\_id: string The unique ID of the function tool call generated by the model.
name: string The name of the function to run.
type: "function\_call" The type of the function tool call. Always function\_call.
id: optional string The unique ID of the function tool call.
async: optional boolean Whether the function tool call runs asynchronously.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") namespace: optional string The namespace of the function to run.
status: optional "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" FunctionCallOutput { id, output, status, 6 more } id: string The unique ID of the function call tool output.
output: string or array of ResponseInputText or ResponseInputImage or ResponseInputFile The output from the function call generated by your code.
Can be a string or an list of output content.
One of the following: StringOutput = string A string of the output of the function call.
OutputContentList = array of ResponseInputText or ResponseInputImage or ResponseInputFile Text, image, or file output of the function call.
One of the following: ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" status: "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: "function\_call\_output" The type of the function tool call output. Always function\_call\_output.
call\_id: optional string The unique ID of the function tool call generated by the model.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
created\_by: optional string The identifier of the actor that created the item.
name: optional string The name of the tool that produced the output.
namespace: optional string The namespace of the tool that produced the output.
WebSearchCall { id, status, type, action } The results of a web search tool call. See the
web search guide for more information.
id: string The unique ID of the web search tool call.
status: "in\_progress" or "searching" or "completed" or 2 more The status of the web search tool call.
One of the following: "in\_progress" "searching" "completed" "failed" "incomplete" type: "web\_search\_call" The type of the web search tool call. Always web\_search\_call.
action: optional Search or OpenPage or FindInPage An object describing the specific action taken in this web search call.
Includes details on how the model used the web (search, open\_page, find\_in\_page).
One of the following: Search { type, queries, query, sources } Action type “search” - Performs a web search query.
type: "search" The action type.
queries: optional array of string The search queries.
query: optional string Deprecated.
The search query.
sources: optional array of { type, url } The sources used in the search.
type: "url" The type of source. Always url.
url: string The URL of the source.
formaturi OpenPage { type, url } Action type “open\_page” - Opens a specific URL from search results.
type: "open\_page" The action type.
url: optional string or null The URL opened by the model.
formaturi FindInPage { pattern, type, url } Action type “find\_in\_page”: Searches for a pattern within a loaded page.
pattern: string The pattern or text to search for within the page.
type: "find\_in\_page" The action type.
url: optional string or null The URL of the page searched for the pattern, when available.
formaturi ComputerCall { id, call\_id, pending\_safety\_checks, 4 more } A tool call to a computer use tool. See the
computer use guide for more information.
id: string The unique ID of the computer call.
call\_id: string An identifier used when responding to the tool call with output.
pending\_safety\_checks: array of { id, code, message } The pending safety checks for the computer call.
id: string The ID of the pending safety check.
code: optional string or null The type of the pending safety check.
message: optional string or null Details about the pending safety check.
status: "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: "computer\_call" (default: "computer\_call") The type of the computer call. Always computer\_call.
action: optional ComputerAction A click action.
One of the following: Click { button, type, x, 2 more } A click action.
button: "left" or "right" or "wheel" or 2 more Indicates which mouse button was pressed during the click. One of left, right, wheel, back, or forward.
One of the following: "left" "right" "wheel" "back" "forward" type: "click" (default: "click") Specifies the event type. For a click action, this property is always click.
x: integer The x-coordinate where the click occurred.
y: integer The y-coordinate where the click occurred.
keys: optional array of string or null The keys being held while clicking.
DoubleClick { keys, type, x, y } A double click action.
keys: array of string or null The keys being held while double-clicking.
type: "double\_click" (default: "double\_click") Specifies the event type. For a double click action, this property is always set to double\_click.
x: integer The x-coordinate where the double click occurred.
y: integer The y-coordinate where the double click occurred.
Drag { path, type, keys } A drag action.
path: array of { x, y } An array of coordinates representing the path of the drag action. Coordinates will appear as an array of objects, eg
\[\
{ x: 100, y: 200 },\
{ x: 200, y: 300 }\
\]
x: integer The x-coordinate.
y: integer The y-coordinate.
type: "drag" (default: "drag") Specifies the event type. For a drag action, this property is always set to drag.
keys: optional array of string or null The keys being held while dragging the mouse.
Keypress { keys, type } A collection of keypresses the model would like to perform.
keys: array of string The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key.
type: "keypress" (default: "keypress") Specifies the event type. For a keypress action, this property is always set to keypress.
Move { type, x, y, keys } A mouse move action.
type: "move" (default: "move") Specifies the event type. For a move action, this property is always set to move.
x: integer The x-coordinate to move to.
y: integer The y-coordinate to move to.
keys: optional array of string or null The keys being held while moving the mouse.
Screenshot { type } A screenshot action.
type: "screenshot" (default: "screenshot") Specifies the event type. For a screenshot action, this property is always set to screenshot.
Scroll { scroll\_x, scroll\_y, type, 3 more } A scroll action.
scroll\_x: integer The horizontal scroll distance.
scroll\_y: integer The vertical scroll distance.
type: "scroll" (default: "scroll") Specifies the event type. For a scroll action, this property is always set to scroll.
x: integer The x-coordinate where the scroll occurred.
y: integer The y-coordinate where the scroll occurred.
keys: optional array of string or null The keys being held while scrolling.
Type { text, type } An action to type in text.
text: string The text to type.
type: "type" (default: "type") Specifies the event type. For a type action, this property is always set to type.
Wait { type } A wait action.
type: "wait" (default: "wait") Specifies the event type. For a wait action, this property is always set to wait.
actions: optional ComputerActionList { Click, DoubleClick, Drag, 6 more } Flattened batched actions for computer\_use. Each action includes an
type discriminator and action-specific fields.
One of the following: Click { button, type, x, 2 more } A click action.
button: "left" or "right" or "wheel" or 2 more Indicates which mouse button was pressed during the click. One of left, right, wheel, back, or forward.
One of the following: "left" "right" "wheel" "back" "forward" type: "click" (default: "click") Specifies the event type. For a click action, this property is always click.
x: integer The x-coordinate where the click occurred.
y: integer The y-coordinate where the click occurred.
keys: optional array of string or null The keys being held while clicking.
DoubleClick { keys, type, x, y } A double click action.
keys: array of string or null The keys being held while double-clicking.
type: "double\_click" (default: "double\_click") Specifies the event type. For a double click action, this property is always set to double\_click.
x: integer The x-coordinate where the double click occurred.
y: integer The y-coordinate where the double click occurred.
Drag { path, type, keys } A drag action.
path: array of { x, y } An array of coordinates representing the path of the drag action. Coordinates will appear as an array of objects, eg
\[\
{ x: 100, y: 200 },\
{ x: 200, y: 300 }\
\]
x: integer The x-coordinate.
y: integer The y-coordinate.
type: "drag" (default: "drag") Specifies the event type. For a drag action, this property is always set to drag.
keys: optional array of string or null The keys being held while dragging the mouse.
Keypress { keys, type } A collection of keypresses the model would like to perform.
keys: array of string The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key.
type: "keypress" (default: "keypress") Specifies the event type. For a keypress action, this property is always set to keypress.
Move { type, x, y, keys } A mouse move action.
type: "move" (default: "move") Specifies the event type. For a move action, this property is always set to move.
x: integer The x-coordinate to move to.
y: integer The y-coordinate to move to.
keys: optional array of string or null The keys being held while moving the mouse.
Screenshot { type } A screenshot action.
type: "screenshot" (default: "screenshot") Specifies the event type. For a screenshot action, this property is always set to screenshot.
Scroll { scroll\_x, scroll\_y, type, 3 more } A scroll action.
scroll\_x: integer The horizontal scroll distance.
scroll\_y: integer The vertical scroll distance.
type: "scroll" (default: "scroll") Specifies the event type. For a scroll action, this property is always set to scroll.
x: integer The x-coordinate where the scroll occurred.
y: integer The y-coordinate where the scroll occurred.
keys: optional array of string or null The keys being held while scrolling.
Type { text, type } An action to type in text.
text: string The text to type.
type: "type" (default: "type") Specifies the event type. For a type action, this property is always set to type.
Wait { type } A wait action.
type: "wait" (default: "wait") Specifies the event type. For a wait action, this property is always set to wait.
ComputerCallOutput { id, call\_id, output, 4 more } id: string The ID of the computer tool call output.
call\_id: string The ID of the computer tool call that produced the output.
output: ResponseComputerToolCallOutputScreenshot { type, file\_id, image\_url } A computer screenshot image used with the computer use tool.
type: "computer\_screenshot" (default: "computer\_screenshot") Specifies the event type. For a computer screenshot, this property is
always set to computer\_screenshot.
file\_id: optional string The identifier of an uploaded file that contains the screenshot.
image\_url: optional string The URL of the screenshot image.
formaturi status: "completed" or "incomplete" or "failed" or "in\_progress" The status of the message input. One of in\_progress, completed, or
incomplete. Populated when input items are returned via API.
One of the following: "completed" "incomplete" "failed" "in\_progress" type: "computer\_call\_output" (default: "computer\_call\_output") The type of the computer tool call output. Always computer\_call\_output.
acknowledged\_safety\_checks: optional array of { id, code, message } The safety checks reported by the API that have been acknowledged by the
developer.
id: string The ID of the pending safety check.
code: optional string or null The type of the pending safety check.
message: optional string or null Details about the pending safety check.
created\_by: optional string The identifier of the actor that created the item.
Reasoning { id, summary, type, 3 more } A description of the chain of thought used by a reasoning model while generating
a response. Be sure to include these items in your input to the Responses API
for subsequent turns of a conversation if you are manually
managing context.
id: string The unique identifier of the reasoning content.
summary: array of SummaryTextContent { text, type } Reasoning summary content.
text: string A summary of the reasoning output from the model so far.
type: "summary\_text" (default: "summary\_text") The type of the object. Always summary\_text.
type: "reasoning" The type of the object. Always reasoning.
content: optional array of { text, type } Reasoning text content.
text: string The reasoning text from the model.
type: "reasoning\_text" (default: "reasoning\_text") The type of the reasoning text. Always reasoning\_text.
encrypted\_content: optional string or null The encrypted content of the reasoning item. This is populated by default
for reasoning items returned by POST /v1/responses and WebSocket
response.create requests.
When streaming, use the completed reasoning item and its
encrypted\_content from the response.output\_item.done event in
subsequent requests. The encrypted\_content in
response.output\_item.added may be incomplete. This is especially
important when store is false or when using Zero Data Retention.
status: optional "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" Program { id, call\_id, code, 2 more } id: string The unique ID of the program item.
call\_id: string The stable call ID of the program item.
code: string The JavaScript source executed by programmatic tool calling.
fingerprint: string Opaque program replay fingerprint that must be round-tripped.
type: "program" (default: "program") The type of the item. Always program.
ProgramOutput { id, call\_id, result, 2 more } id: string The unique ID of the program output item.
call\_id: string The call ID of the program item.
result: string The result produced by the program item.
status: "completed" or "incomplete" The terminal status of the program output item.
One of the following: "completed" "incomplete" type: "program\_output" (default: "program\_output") The type of the item. Always program\_output.
ToolSearchCall { id, arguments, call\_id, 4 more } id: string The unique ID of the tool search call item.
arguments: unknown Arguments used for the tool search call.
call\_id: string or null The unique ID of the tool search call generated by the model.
execution: "server" or "client" Whether tool search was executed by the server or by the client.
One of the following: "server" "client" status: "in\_progress" or "completed" or "incomplete" The status of the tool search call item that was recorded.
One of the following: "in\_progress" "completed" "incomplete" type: "tool\_search\_call" (default: "tool\_search\_call") The type of the item. Always tool\_search\_call.
created\_by: optional string The identifier of the actor that created the item.
ToolSearchOutput { id, call\_id, execution, 4 more } id: string The unique ID of the tool search output item.
call\_id: string or null The unique ID of the tool search call generated by the model.
execution: "server" or "client" Whether tool search was executed by the server or by the client.
One of the following: "server" "client" status: "in\_progress" or "completed" or "incomplete" The status of the tool search output item that was recorded.
One of the following: "in\_progress" "completed" "incomplete" tools: array of Function or FileSearch or Computer or 13 more The loaded tool definitions returned by tool search.
One of the following: Function { name, parameters, strict, 6 more } Defines a function in your own code the model can choose to call. Learn more about function calling.
name: string The name of the function to call.
parameters: map\[unknown\] or null A JSON schema object describing the parameters of the function.
strict: boolean or null Whether strict parameter validation is enforced for this function tool.
type: "function" (default: "function") The type of the function tool. Always function.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
One of the following: "direct" "programmatic" async: optional boolean defer\_loading: optional boolean Whether this function is deferred and loaded via tool search.
description: optional string or null A description of the function. Used by the model to determine whether or not to call the function.
output\_schema: optional map\[unknown\] or null A JSON schema object describing the JSON value encoded in string outputs for this function.
FileSearch { type, vector\_store\_ids, filters, 2 more } A tool that searches for relevant content from uploaded files. Learn more about the file search tool.
type: "file\_search" (default: "file\_search") The type of the file search tool. Always file\_search.
vector\_store\_ids: array of string The IDs of the vector stores to search.
filters: optional ComparisonFilter or CompoundFilter or null A filter to apply.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } Combine multiple filters using and or or.
filters: array of ComparisonFilter or CompoundFilter Array of filters to combine. Items can be ComparisonFilter or CompoundFilter.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } This type repeats the enclosing schema. type: "and" or "or" Type of operation: and or or.
One of the following: "and" "or" max\_num\_results: optional integer The maximum number of results to return. This number should be between 1 and 50 inclusive.
ranking\_options: optional { hybrid\_search, ranker, score\_threshold } Ranking options for search.
hybrid\_search: optional { embedding\_weight, text\_weight } Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.
embedding\_weight: number The weight of the embedding in the reciprocal ranking fusion.
text\_weight: number The weight of the text in the reciprocal ranking fusion.
ranker: optional "auto" or "default-2024-11-15" The ranker to use for the file search.
One of the following: "auto" "default-2024-11-15" score\_threshold: optional number The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.
Computer { type } A tool that controls a virtual computer. Learn more about the computer tool.
type: "computer" (default: "computer") The type of the computer tool. Always computer.
ComputerUsePreview { display\_height, display\_width, environment, type } A tool that controls a virtual computer. Learn more about the computer tool.
display\_height: integer The height of the computer display.
display\_width: integer The width of the computer display.
environment: "windows" or "mac" or "linux" or 2 more The type of computer environment to control.
One of the following: "windows" "mac" "linux" "ubuntu" "browser" type: "computer\_use\_preview" (default: "computer\_use\_preview") The type of the computer use tool. Always computer\_use\_preview.
WebSearch { type, external\_web\_access, filters, 2 more } Search the Internet for sources related to the prompt. Learn more about the
web search tool.
type: "web\_search" or "web\_search\_2025\_08\_26" (default: "web\_search") The type of the web search tool. One of web\_search or web\_search\_2025\_08\_26.
One of the following: "web\_search" "web\_search\_2025\_08\_26" external\_web\_access: optional boolean (default: true) Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content.
filters: optional object or null Filters for the search.
allowed\_domains: optional array of string or null (default: \[\]) Allowed domains for the search. If not provided, all domains are allowed.
Subdomains of the provided domains are allowed as well.
Example: \["pubmed.ncbi.nlm.nih.gov"\]
search\_context\_size: optional "low" or "medium" or "high" (default: "medium") High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the
United States. To avoid this fallback, pass {"type": "approximate"} without
location fields. To localize results, provide the relevant location fields.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
type: optional "approximate" (default: "approximate") The type of location approximation. Always approximate.
Mcp { server\_label, type, allowed\_callers, 9 more } Give the model access to additional tools via remote Model Context Protocol
(MCP) servers. Learn more about MCP.
server\_label: string A label for this MCP server, used to identify it in tool calls.
type: "mcp" The type of the MCP tool. Always mcp.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" allowed\_tools: optional array of string or McpToolFilter or null List of allowed tool names or a filter object.
One of the following: McpAllowedTools = array of string A string array of allowed tool names
McpToolFilter { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
authorization: optional string An OAuth access token that can be used with a remote MCP server, either
with a custom MCP server URL or a service connector. Your application
must handle the OAuth authorization flow and provide the token here.
connector\_id: optional "connector\_dropbox" or "connector\_gmail" or "connector\_googlecalendar" or 5 more Deprecated.
Identifier for service connectors, like those available in ChatGPT. One of
server\_url, connector\_id, or tunnel\_id must be provided. Learn more
about service connectors here.
This field is deprecated for models released after September 1, 2026.
Use server\_url to connect to a remote MCP server, or tunnel\_id to
connect through a Secure MCP Tunnel.
Currently supported connector\_id values are:

Dropbox: connector\_dropbox
Gmail: connector\_gmail
Google Calendar: connector\_googlecalendar
Google Drive: connector\_googledrive
Microsoft Teams: connector\_microsoftteams
Outlook Calendar: connector\_outlookcalendar
Outlook Email: connector\_outlookemail
SharePoint: connector\_sharepoint

One of the following: "connector\_dropbox" "connector\_gmail" "connector\_googlecalendar" "connector\_googledrive" "connector\_microsoftteams" "connector\_outlookcalendar" "connector\_outlookemail" "connector\_sharepoint" defer\_loading: optional boolean Whether this MCP tool is deferred and discovered via tool search.
headers: optional map\[string\] or null Optional HTTP headers to send to the MCP server. Use for authentication
or other purposes.
require\_approval: optional McpToolApprovalFilter or "always" or "never" or null (default: "always") Specify which of the MCP server’s tools require approval.
One of the following: McpToolApprovalFilter { always, never } Specify which of the MCP server’s tools require approval. Can be
always, never, or a filter object associated with tools
that require approval.
always: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
never: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
McpToolApprovalSetting = "always" or "never" Specify a single approval policy for all tools. One of always or
never. When set to always, all tools will require approval. When
set to never, all tools will not require approval.
One of the following: "always" "never" server\_description: optional string Optional description of the MCP server, used to provide more context.
server\_url: optional string The URL for the MCP server. One of server\_url, connector\_id, or
tunnel\_id must be provided.
formaturi tunnel\_id: optional string The Secure MCP Tunnel ID to use instead of a direct server URL. One of
server\_url, connector\_id, or tunnel\_id must be provided.
pattern^tunnel\_\[a-z0-9\]{32}$ CodeInterpreter { container, type, allowed\_callers } A tool that runs Python code to help generate a response to a prompt.
container: string or CodeInterpreterToolAuto The code interpreter container. Can be a container ID or an object that
specifies uploaded file IDs to make available to your code, along with an
optional memory\_limit setting.
One of the following: string The container ID.
CodeInterpreterToolAuto { type, file\_ids, memory\_limit, network\_policy } Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.
type: "auto" (default: "auto") Always auto.
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the code interpreter container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 type: "code\_interpreter" The type of the code interpreter tool. Always code\_interpreter.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" ProgrammaticToolCalling { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The type of the tool. Always programmatic\_tool\_calling.
ImageGeneration { type, action, background, 13 more } A tool that generates images using the GPT image models.
type: "image\_generation" The type of the image generation tool. Always image\_generation.
action: optional "generate" or "edit" or "auto" Whether to generate a new image or edit an existing image. Default: auto.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" (default: "auto") Set the background of the generated image. One of transparent, opaque,
or auto. gpt-image-2.5-sunburst and gpt-image-2.5-flare, including
their 2026-09-08 snapshots, support opaque and transparent
backgrounds. Transparent backgrounds are available for supported GPT Image
models. For gpt-image-2 and gpt-image-2-2026-04-21, this support is in
preview. When using transparent, set the output format to png or webp.
Default: auto.
One of the following: "transparent" "opaque" "auto" complexity: optional "low" or "medium" or "high" Computation spent planning the image, independently of rendering quality.
Overrides the outer response’s reasoning.effort for image generation.
When omitted, inherits a supported outer reasoning effort or uses the
image model’s configured default.
For SVG output, controls the reference image, not the SVG author’s
reasoning.
One of the following: "low" "medium" "high" frame\_count: optional integer (default: 9) Number of GIF frames. Requires output\_format to be gif. Default: 9.
minimum2 maximum16 frame\_duration\_ms: optional integer (default: 200) Duration of each GIF frame in milliseconds, rounded to 10 ms.
Requires output\_format to be gif. Default: 200.
minimum20 maximum2000 input\_fidelity: optional "high" or "low" or null Control how much effort the model will exert to match the style and features, especially facial features, of input images. Supports high and low on gpt-image-1.5; gpt-image-1-mini supports only low. For gpt-image-2, omit this parameter. Defaults to low on supported models.
One of the following: "high" "low" input\_image\_mask: optional { file\_id, image\_url } Optional mask for inpainting. Contains image\_url
(string, optional) and file\_id (string, optional).
file\_id: optional string File ID for the mask image.
image\_url: optional string Base64-encoded mask image.
model: optional string or "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: string "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: "gpt-image-1-mini" "gpt-image-2" "gpt-image-2-2026-04-21" "gpt-image-2.5-sunburst" "gpt-image-2.5-sunburst-2026-09-08" "gpt-image-2.5-flare" "gpt-image-2.5-flare-2026-09-08" "gpt-image-2.6-sunburst" "gpt-image-2.6-flare" "gpt-image-1.5" "chatgpt-image-latest" "gpt-image-1" Deprecated. GPT Image 1 was shut down on October 23, 2026. Use gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
moderation: optional "auto" or "low" (default: "auto") Moderation level for the generated image. Default: auto.
One of the following: "auto" "low" output\_compression: optional integer (default: 100) Compression level for the output image. Default: 100.
minimum0 maximum100 output\_format: optional "png" or "webp" or "jpeg" or 2 more (default: "png") The output format of the generated image. One of png, webp, jpeg,
gif, or svg. Default: png. GIF and SVG output require a model
that supports the selected format. GIF output does not support
partial image streaming (partial\_images greater than 0),
input\_image\_mask, or custom output\_compression.
Responses lifecycle events can still be streamed for GIF output.
One of the following: "png" "webp" "jpeg" "gif" "svg" partial\_images: optional integer (default: 0) Number of partial images to generate in streaming mode, from 0 (default value) to 3.
minimum0 maximum3 quality: optional "low" or "medium" or "high" or 3 more (default: "auto") The quality of the generated image. The GPT image models support low,
medium, and high. gpt-image-2.5-sunburst and gpt-image-2.5-flare,
including their 2026-09-08 snapshots, also support xhigh and max.
Default: auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or "auto" (default: "auto") The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" or "auto" The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: "1024x1024" "1024x1536" "1536x1024" "auto" svg: optional { model, reasoning } SVG author model settings. Requires output\_format to be svg.
When SVG model selection is enabled, omitting this object uses the
outer response model. Otherwise, the default SVG author is used and
explicit model overrides are unavailable.
model: optional string minLength1 reasoning: optional object or null Reasoning effort for SVG authoring. When omitted, uses the author model’s default in both Images and Responses.
effort: optional "none" or "minimal" or "low" or 4 more Controls how much effort the model should spend on reasoning for this request.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" LocalShell { type } A tool that allows the model to execute shell commands in a local environment.
type: "local\_shell" (default: "local\_shell") The type of the local shell tool. Always local\_shell.
Shell { type, allowed\_callers, environment } A tool that allows the model to execute shell commands.
type: "shell" (default: "shell") The type of the shell tool. Always shell.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" environment: optional ContainerAuto or LocalEnvironment or ContainerReference or null One of the following: ContainerAuto { type, file\_ids, memory\_limit, 2 more } type: "container\_auto" (default: "container\_auto") Automatically creates a container for this request
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 skills: optional array of SkillReference or InlineSkill An optional list of skills referenced by id or inline data.
maxItems200 One of the following: SkillReference { skill\_id, type, version } skill\_id: string The ID of the referenced skill.
minLength1 maxLength64 type: "skill\_reference" (default: "skill\_reference") References a skill created with the /v1/skills endpoint.
version: optional string Optional skill version. Use a positive integer or ‘latest’. Omit for default.
InlineSkill { description, name, source, type } description: string The description of the skill.
name: string The name of the skill.
source: InlineSkillSource { data, media\_type, type } Inline skill payload
data: string Base64-encoded skill zip bundle.
minLength1 maxLength70254592 media\_type: "application/zip" (default: "application/zip") The media type of the inline skill payload. Must be application/zip.
type: "base64" (default: "base64") The type of the inline skill source. Must be base64.
type: "inline" (default: "inline") Defines an inline skill for this request.
LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
Namespace { description, name, tools, type } Groups function/custom tools under a shared namespace.
description: string A description of the namespace shown to the model.
name: string The namespace name used in tool calls (for example, crm).
minLength1 tools: array of Function or Custom The function/custom tools available inside this namespace.
minItems1 One of the following: Function { name, type, allowed\_callers, 6 more } name: string pattern^\[a-zA-Z0-9\_-\]+$ minLength1 maxLength128 type: "function" (default: "function") allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this function should be deferred and discovered via tool search.
description: optional string or null output\_schema: optional map\[unknown\] or null A JSON Schema describing the JSON value encoded in string outputs for this function tool. This does not describe content-array outputs.
parameters: optional unknown or null strict: optional boolean or null Whether to enforce strict parameter validation. If omitted, Responses attempts to use strict validation when the schema is compatible, and falls back to non-strict validation otherwise.
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
type: "namespace" (default: "namespace") The type of the tool. Always namespace.
ToolSearch { type, description, execution, parameters } Hosted or BYOT tool search configuration for deferred tools.
type: "tool\_search" (default: "tool\_search") The type of the tool. Always tool\_search.
description: optional string or null Description shown to the model for a client-executed tool search tool.
execution: optional "server" or "client" Whether tool search is executed by the server or by the client.
One of the following: "server" "client" parameters: optional unknown or null Parameter schema for a client-executed tool search tool.
WebSearchPreview { type, search\_content\_types, search\_context\_size, user\_location } This tool searches the web for relevant results to use in a response. Learn more about the web search tool.
type: "web\_search\_preview" or "web\_search\_preview\_2025\_03\_11" (default: "web\_search\_preview") The type of the web search tool. One of web\_search\_preview or web\_search\_preview\_2025\_03\_11.
One of the following: "web\_search\_preview" "web\_search\_preview\_2025\_03\_11" search\_content\_types: optional array of "text" or "image" One of the following: "text" "image" search\_context\_size: optional "low" or "medium" or "high" High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the United States. To avoid this fallback, pass {"type": "approximate"} without location fields. To localize results, provide the relevant location fields.
type: "approximate" (default: "approximate") The type of location approximation. Always approximate.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
ApplyPatch { type, allowed\_callers } Allows the assistant to create, delete, or update files using unified diffs.
type: "apply\_patch" (default: "apply\_patch") The type of the tool. Always apply\_patch.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" type: "tool\_search\_output" (default: "tool\_search\_output") The type of the item. Always tool\_search\_output.
created\_by: optional string The identifier of the actor that created the item.
AdditionalTools { id, role, tools, type } id: string The unique ID of the additional tools item.
role: "unknown" or "user" or "assistant" or 5 more The role that provided the additional tools.
One of the following: "unknown" "user" "assistant" "system" "critic" "discriminator" "developer" "tool" tools: array of Function or FileSearch or Computer or 13 more The additional tool definitions made available at this item.
One of the following: Function { name, parameters, strict, 6 more } Defines a function in your own code the model can choose to call. Learn more about function calling.
name: string The name of the function to call.
parameters: map\[unknown\] or null A JSON schema object describing the parameters of the function.
strict: boolean or null Whether strict parameter validation is enforced for this function tool.
type: "function" (default: "function") The type of the function tool. Always function.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
One of the following: "direct" "programmatic" async: optional boolean defer\_loading: optional boolean Whether this function is deferred and loaded via tool search.
description: optional string or null A description of the function. Used by the model to determine whether or not to call the function.
output\_schema: optional map\[unknown\] or null A JSON schema object describing the JSON value encoded in string outputs for this function.
FileSearch { type, vector\_store\_ids, filters, 2 more } A tool that searches for relevant content from uploaded files. Learn more about the file search tool.
type: "file\_search" (default: "file\_search") The type of the file search tool. Always file\_search.
vector\_store\_ids: array of string The IDs of the vector stores to search.
filters: optional ComparisonFilter or CompoundFilter or null A filter to apply.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } Combine multiple filters using and or or.
filters: array of ComparisonFilter or CompoundFilter Array of filters to combine. Items can be ComparisonFilter or CompoundFilter.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } This type repeats the enclosing schema. type: "and" or "or" Type of operation: and or or.
One of the following: "and" "or" max\_num\_results: optional integer The maximum number of results to return. This number should be between 1 and 50 inclusive.
ranking\_options: optional { hybrid\_search, ranker, score\_threshold } Ranking options for search.
hybrid\_search: optional { embedding\_weight, text\_weight } Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.
embedding\_weight: number The weight of the embedding in the reciprocal ranking fusion.
text\_weight: number The weight of the text in the reciprocal ranking fusion.
ranker: optional "auto" or "default-2024-11-15" The ranker to use for the file search.
One of the following: "auto" "default-2024-11-15" score\_threshold: optional number The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.
Computer { type } A tool that controls a virtual computer. Learn more about the computer tool.
type: "computer" (default: "computer") The type of the computer tool. Always computer.
ComputerUsePreview { display\_height, display\_width, environment, type } A tool that controls a virtual computer. Learn more about the computer tool.
display\_height: integer The height of the computer display.
display\_width: integer The width of the computer display.
environment: "windows" or "mac" or "linux" or 2 more The type of computer environment to control.
One of the following: "windows" "mac" "linux" "ubuntu" "browser" type: "computer\_use\_preview" (default: "computer\_use\_preview") The type of the computer use tool. Always computer\_use\_preview.
WebSearch { type, external\_web\_access, filters, 2 more } Search the Internet for sources related to the prompt. Learn more about the
web search tool.
type: "web\_search" or "web\_search\_2025\_08\_26" (default: "web\_search") The type of the web search tool. One of web\_search or web\_search\_2025\_08\_26.
One of the following: "web\_search" "web\_search\_2025\_08\_26" external\_web\_access: optional boolean (default: true) Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content.
filters: optional object or null Filters for the search.
allowed\_domains: optional array of string or null (default: \[\]) Allowed domains for the search. If not provided, all domains are allowed.
Subdomains of the provided domains are allowed as well.
Example: \["pubmed.ncbi.nlm.nih.gov"\]
search\_context\_size: optional "low" or "medium" or "high" (default: "medium") High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the
United States. To avoid this fallback, pass {"type": "approximate"} without
location fields. To localize results, provide the relevant location fields.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
type: optional "approximate" (default: "approximate") The type of location approximation. Always approximate.
Mcp { server\_label, type, allowed\_callers, 9 more } Give the model access to additional tools via remote Model Context Protocol
(MCP) servers. Learn more about MCP.
server\_label: string A label for this MCP server, used to identify it in tool calls.
type: "mcp" The type of the MCP tool. Always mcp.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" allowed\_tools: optional array of string or McpToolFilter or null List of allowed tool names or a filter object.
One of the following: McpAllowedTools = array of string A string array of allowed tool names
McpToolFilter { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
authorization: optional string An OAuth access token that can be used with a remote MCP server, either
with a custom MCP server URL or a service connector. Your application
must handle the OAuth authorization flow and provide the token here.
connector\_id: optional "connector\_dropbox" or "connector\_gmail" or "connector\_googlecalendar" or 5 more Deprecated.
Identifier for service connectors, like those available in ChatGPT. One of
server\_url, connector\_id, or tunnel\_id must be provided. Learn more
about service connectors here.
This field is deprecated for models released after September 1, 2026.
Use server\_url to connect to a remote MCP server, or tunnel\_id to
connect through a Secure MCP Tunnel.
Currently supported connector\_id values are:

Dropbox: connector\_dropbox
Gmail: connector\_gmail
Google Calendar: connector\_googlecalendar
Google Drive: connector\_googledrive
Microsoft Teams: connector\_microsoftteams
Outlook Calendar: connector\_outlookcalendar
Outlook Email: connector\_outlookemail
SharePoint: connector\_sharepoint

One of the following: "connector\_dropbox" "connector\_gmail" "connector\_googlecalendar" "connector\_googledrive" "connector\_microsoftteams" "connector\_outlookcalendar" "connector\_outlookemail" "connector\_sharepoint" defer\_loading: optional boolean Whether this MCP tool is deferred and discovered via tool search.
headers: optional map\[string\] or null Optional HTTP headers to send to the MCP server. Use for authentication
or other purposes.
require\_approval: optional McpToolApprovalFilter or "always" or "never" or null (default: "always") Specify which of the MCP server’s tools require approval.
One of the following: McpToolApprovalFilter { always, never } Specify which of the MCP server’s tools require approval. Can be
always, never, or a filter object associated with tools
that require approval.
always: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
never: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
McpToolApprovalSetting = "always" or "never" Specify a single approval policy for all tools. One of always or
never. When set to always, all tools will require approval. When
set to never, all tools will not require approval.
One of the following: "always" "never" server\_description: optional string Optional description of the MCP server, used to provide more context.
server\_url: optional string The URL for the MCP server. One of server\_url, connector\_id, or
tunnel\_id must be provided.
formaturi tunnel\_id: optional string The Secure MCP Tunnel ID to use instead of a direct server URL. One of
server\_url, connector\_id, or tunnel\_id must be provided.
pattern^tunnel\_\[a-z0-9\]{32}$ CodeInterpreter { container, type, allowed\_callers } A tool that runs Python code to help generate a response to a prompt.
container: string or CodeInterpreterToolAuto The code interpreter container. Can be a container ID or an object that
specifies uploaded file IDs to make available to your code, along with an
optional memory\_limit setting.
One of the following: string The container ID.
CodeInterpreterToolAuto { type, file\_ids, memory\_limit, network\_policy } Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.
type: "auto" (default: "auto") Always auto.
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the code interpreter container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 type: "code\_interpreter" The type of the code interpreter tool. Always code\_interpreter.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" ProgrammaticToolCalling { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The type of the tool. Always programmatic\_tool\_calling.
ImageGeneration { type, action, background, 13 more } A tool that generates images using the GPT image models.
type: "image\_generation" The type of the image generation tool. Always image\_generation.
action: optional "generate" or "edit" or "auto" Whether to generate a new image or edit an existing image. Default: auto.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" (default: "auto") Set the background of the generated image. One of transparent, opaque,
or auto. gpt-image-2.5-sunburst and gpt-image-2.5-flare, including
their 2026-09-08 snapshots, support opaque and transparent
backgrounds. Transparent backgrounds are available for supported GPT Image
models. For gpt-image-2 and gpt-image-2-2026-04-21, this support is in
preview. When using transparent, set the output format to png or webp.
Default: auto.
One of the following: "transparent" "opaque" "auto" complexity: optional "low" or "medium" or "high" Computation spent planning the image, independently of rendering quality.
Overrides the outer response’s reasoning.effort for image generation.
When omitted, inherits a supported outer reasoning effort or uses the
image model’s configured default.
For SVG output, controls the reference image, not the SVG author’s
reasoning.
One of the following: "low" "medium" "high" frame\_count: optional integer (default: 9) Number of GIF frames. Requires output\_format to be gif. Default: 9.
minimum2 maximum16 frame\_duration\_ms: optional integer (default: 200) Duration of each GIF frame in milliseconds, rounded to 10 ms.
Requires output\_format to be gif. Default: 200.
minimum20 maximum2000 input\_fidelity: optional "high" or "low" or null Control how much effort the model will exert to match the style and features, especially facial features, of input images. Supports high and low on gpt-image-1.5; gpt-image-1-mini supports only low. For gpt-image-2, omit this parameter. Defaults to low on supported models.
One of the following: "high" "low" input\_image\_mask: optional { file\_id, image\_url } Optional mask for inpainting. Contains image\_url
(string, optional) and file\_id (string, optional).
file\_id: optional string File ID for the mask image.
image\_url: optional string Base64-encoded mask image.
model: optional string or "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: string "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: "gpt-image-1-mini" "gpt-image-2" "gpt-image-2-2026-04-21" "gpt-image-2.5-sunburst" "gpt-image-2.5-sunburst-2026-09-08" "gpt-image-2.5-flare" "gpt-image-2.5-flare-2026-09-08" "gpt-image-2.6-sunburst" "gpt-image-2.6-flare" "gpt-image-1.5" "chatgpt-image-latest" "gpt-image-1" Deprecated. GPT Image 1 was shut down on October 23, 2026. Use gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
moderation: optional "auto" or "low" (default: "auto") Moderation level for the generated image. Default: auto.
One of the following: "auto" "low" output\_compression: optional integer (default: 100) Compression level for the output image. Default: 100.
minimum0 maximum100 output\_format: optional "png" or "webp" or "jpeg" or 2 more (default: "png") The output format of the generated image. One of png, webp, jpeg,
gif, or svg. Default: png. GIF and SVG output require a model
that supports the selected format. GIF output does not support
partial image streaming (partial\_images greater than 0),
input\_image\_mask, or custom output\_compression.
Responses lifecycle events can still be streamed for GIF output.
One of the following: "png" "webp" "jpeg" "gif" "svg" partial\_images: optional integer (default: 0) Number of partial images to generate in streaming mode, from 0 (default value) to 3.
minimum0 maximum3 quality: optional "low" or "medium" or "high" or 3 more (default: "auto") The quality of the generated image. The GPT image models support low,
medium, and high. gpt-image-2.5-sunburst and gpt-image-2.5-flare,
including their 2026-09-08 snapshots, also support xhigh and max.
Default: auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or "auto" (default: "auto") The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" or "auto" The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: "1024x1024" "1024x1536" "1536x1024" "auto" svg: optional { model, reasoning } SVG author model settings. Requires output\_format to be svg.
When SVG model selection is enabled, omitting this object uses the
outer response model. Otherwise, the default SVG author is used and
explicit model overrides are unavailable.
model: optional string minLength1 reasoning: optional object or null Reasoning effort for SVG authoring. When omitted, uses the author model’s default in both Images and Responses.
effort: optional "none" or "minimal" or "low" or 4 more Controls how much effort the model should spend on reasoning for this request.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" LocalShell { type } A tool that allows the model to execute shell commands in a local environment.
type: "local\_shell" (default: "local\_shell") The type of the local shell tool. Always local\_shell.
Shell { type, allowed\_callers, environment } A tool that allows the model to execute shell commands.
type: "shell" (default: "shell") The type of the shell tool. Always shell.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" environment: optional ContainerAuto or LocalEnvironment or ContainerReference or null One of the following: ContainerAuto { type, file\_ids, memory\_limit, 2 more } type: "container\_auto" (default: "container\_auto") Automatically creates a container for this request
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 skills: optional array of SkillReference or InlineSkill An optional list of skills referenced by id or inline data.
maxItems200 One of the following: SkillReference { skill\_id, type, version } skill\_id: string The ID of the referenced skill.
minLength1 maxLength64 type: "skill\_reference" (default: "skill\_reference") References a skill created with the /v1/skills endpoint.
version: optional string Optional skill version. Use a positive integer or ‘latest’. Omit for default.
InlineSkill { description, name, source, type } description: string The description of the skill.
name: string The name of the skill.
source: InlineSkillSource { data, media\_type, type } Inline skill payload
data: string Base64-encoded skill zip bundle.
minLength1 maxLength70254592 media\_type: "application/zip" (default: "application/zip") The media type of the inline skill payload. Must be application/zip.
type: "base64" (default: "base64") The type of the inline skill source. Must be base64.
type: "inline" (default: "inline") Defines an inline skill for this request.
LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
Namespace { description, name, tools, type } Groups function/custom tools under a shared namespace.
description: string A description of the namespace shown to the model.
name: string The namespace name used in tool calls (for example, crm).
minLength1 tools: array of Function or Custom The function/custom tools available inside this namespace.
minItems1 One of the following: Function { name, type, allowed\_callers, 6 more } name: string pattern^\[a-zA-Z0-9\_-\]+$ minLength1 maxLength128 type: "function" (default: "function") allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this function should be deferred and discovered via tool search.
description: optional string or null output\_schema: optional map\[unknown\] or null A JSON Schema describing the JSON value encoded in string outputs for this function tool. This does not describe content-array outputs.
parameters: optional unknown or null strict: optional boolean or null Whether to enforce strict parameter validation. If omitted, Responses attempts to use strict validation when the schema is compatible, and falls back to non-strict validation otherwise.
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
type: "namespace" (default: "namespace") The type of the tool. Always namespace.
ToolSearch { type, description, execution, parameters } Hosted or BYOT tool search configuration for deferred tools.
type: "tool\_search" (default: "tool\_search") The type of the tool. Always tool\_search.
description: optional string or null Description shown to the model for a client-executed tool search tool.
execution: optional "server" or "client" Whether tool search is executed by the server or by the client.
One of the following: "server" "client" parameters: optional unknown or null Parameter schema for a client-executed tool search tool.
WebSearchPreview { type, search\_content\_types, search\_context\_size, user\_location } This tool searches the web for relevant results to use in a response. Learn more about the web search tool.
type: "web\_search\_preview" or "web\_search\_preview\_2025\_03\_11" (default: "web\_search\_preview") The type of the web search tool. One of web\_search\_preview or web\_search\_preview\_2025\_03\_11.
One of the following: "web\_search\_preview" "web\_search\_preview\_2025\_03\_11" search\_content\_types: optional array of "text" or "image" One of the following: "text" "image" search\_context\_size: optional "low" or "medium" or "high" High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the United States. To avoid this fallback, pass {"type": "approximate"} without location fields. To localize results, provide the relevant location fields.
type: "approximate" (default: "approximate") The type of location approximation. Always approximate.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
ApplyPatch { type, allowed\_callers } Allows the assistant to create, delete, or update files using unified diffs.
type: "apply\_patch" (default: "apply\_patch") The type of the tool. Always apply\_patch.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" type: "additional\_tools" (default: "additional\_tools") The type of the item. Always additional\_tools.
Compaction { id, encrypted\_content, type, created\_by } A compaction item generated by the v1/responses/compact API.
id: string The unique ID of the compaction item.
encrypted\_content: string The encrypted content that was produced by compaction.
type: "compaction" (default: "compaction") The type of the item. Always compaction.
created\_by: optional string The identifier of the actor that created the item.
ImageGenerationCall { id, result, status, 9 more } An image generation request made by the model.
id: string The unique ID of the image generation call.
result: string or null The generated image encoded in base64.
status: "in\_progress" or "completed" or "generating" or "failed" The status of the image generation call.
One of the following: "in\_progress" "completed" "generating" "failed" type: "image\_generation\_call" The type of the image generation call. Always image\_generation\_call.
action: optional "generate" or "edit" or "auto" or null The action used for image generation.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" or null The background setting used for generation.
One of the following: "transparent" "opaque" "auto" error: optional { code, message, param, 2 more } Details of a moderation failure, when available.
code: string or null The error code.
message: string A description of the error.
param: string or null The related request parameter.
type: string The error type.
moderation\_details: optional { categories, moderation\_stage } Public details for a moderation\_blocked error, when available.
categories: array of string Public moderation categories. New category values may be added over time.
moderation\_stage: "input" or "output" or "unknown" The stage where moderation blocked the image generation call.
One of the following: "input" "output" "unknown" output\_format: optional "png" or "webp" or "jpeg" or 2 more or null The output format used for generation.
One of the following: "png" "webp" "jpeg" "gif" "svg" quality: optional "low" or "medium" or "high" or 3 more or null The quality of the image generated by the image generation tool call. One of low, medium, high, xhigh, max, or auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" revised\_prompt: optional string or null The prompt that was used after any model prompt rewriting.
size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or null The image dimensions as a WIDTHxHEIGHT string, for example 1536x864.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" The image dimensions as a WIDTHxHEIGHT string, for example 1536x864.
One of the following: "1024x1024" "1024x1536" "1536x1024" svg\_usage: optional { input\_tokens, model, output\_tokens, 2 more } input\_tokens: integer model: string output\_tokens: integer reasoning\_tokens: integer total\_tokens: integer CodeInterpreterCall { id, code, container\_id, 3 more } A tool call to run code.
id: string The unique ID of the code interpreter tool call.
code: string or null The code to run, or null if not available.
container\_id: string The ID of the container used to run the code.
outputs: array of Logs or Image or null The outputs generated by the code interpreter, such as logs or images.
Can be null if no outputs are available.
One of the following: Logs { logs, type } The logs output from the code interpreter.
logs: string The logs output from the code interpreter.
type: "logs" (default: "logs") The type of the output. Always logs.
Image { type, url } The image output from the code interpreter.
type: "image" (default: "image") The type of the output. Always image.
url: string The URL of the image output from the code interpreter.
formaturi status: "in\_progress" or "completed" or "incomplete" or 2 more The status of the code interpreter tool call. Valid values are in\_progress, completed, incomplete, interpreting, and failed.
One of the following: "in\_progress" "completed" "incomplete" "interpreting" "failed" type: "code\_interpreter\_call" (default: "code\_interpreter\_call") The type of the code interpreter tool call. Always code\_interpreter\_call.
LocalShellCall { id, action, call\_id, 2 more } A tool call to run a command on the local shell.
id: string The unique ID of the local shell call.
action: { command, env, type, 3 more } Execute a shell command on the server.
command: array of string The command to run.
env: map\[string\] Environment variables to set for the command.
type: "exec" (default: "exec") The type of the local shell action. Always exec.
timeout\_ms: optional integer or null Optional timeout in milliseconds for the command.
user: optional string or null Optional user to run the command as.
working\_directory: optional string or null Optional working directory to run the command in.
call\_id: string The unique ID of the local shell tool call generated by the model.
status: "in\_progress" or "completed" or "incomplete" The status of the local shell call.
One of the following: "in\_progress" "completed" "incomplete" type: "local\_shell\_call" The type of the local shell call. Always local\_shell\_call.
LocalShellCallOutput { id, output, type, status } The output of a local shell tool call.
id: string The unique ID of the local shell tool call generated by the model.
output: string A JSON string of the output of the local shell tool call.
type: "local\_shell\_call\_output" The type of the local shell tool call output. Always local\_shell\_call\_output.
status: optional "in\_progress" or "completed" or "incomplete" or null The status of the item. One of in\_progress, completed, or incomplete.
One of the following: "in\_progress" "completed" "incomplete" ShellCall { id, action, call\_id, 5 more } A tool call that executes one or more shell commands in a managed environment.
id: string The unique ID of the shell tool call. Populated when this item is returned via API.
action: { commands, max\_output\_length, timeout\_ms } The shell commands and limits that describe how to run the tool call.
commands: array of string max\_output\_length: integer or null Optional maximum number of characters to return from each command.
timeout\_ms: integer or null Optional timeout in milliseconds for the commands.
call\_id: string The unique ID of the shell tool call generated by the model.
environment: ResponseLocalEnvironment or ResponseContainerReference or null Represents the use of a local environment to perform shell actions.
One of the following: ResponseLocalEnvironment { type } Represents the use of a local environment to perform shell actions.
type: "local" (default: "local") The environment type. Always local.
ResponseContainerReference { container\_id, type } Represents a container created with /v1/containers.
container\_id: string type: "container\_reference" (default: "container\_reference") The environment type. Always container\_reference.
status: "in\_progress" or "completed" or "incomplete" The status of the shell call. One of in\_progress, completed, or incomplete.
One of the following: "in\_progress" "completed" "incomplete" type: "shell\_call" (default: "shell\_call") The type of the item. Always shell\_call.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") created\_by: optional string The ID of the entity that created this tool call.
ShellCallOutput { id, call\_id, max\_output\_length, 5 more } The output of a shell tool call that was emitted.
id: string The unique ID of the shell call output. Populated when this item is returned via API.
call\_id: string The unique ID of the shell tool call generated by the model.
max\_output\_length: integer or null The maximum length of the shell command output. This is generated by the model and should be passed back with the raw output.
output: array of { outcome, stderr, stdout, created\_by } An array of shell call output contents
outcome: Timeout or Exit Represents either an exit outcome (with an exit code) or a timeout outcome for a shell call output chunk.
One of the following: Timeout { type } Indicates that the shell call exceeded its configured time limit.
type: "timeout" (default: "timeout") The outcome type. Always timeout.
Exit { exit\_code, type } Indicates that the shell commands finished and returned an exit code.
exit\_code: integer Exit code from the shell process.
type: "exit" (default: "exit") The outcome type. Always exit.
stderr: string The standard error output that was captured.
stdout: string The standard output that was captured.
created\_by: optional string The identifier of the actor that created the item.
status: "in\_progress" or "completed" or "incomplete" The status of the shell call output. One of in\_progress, completed, or incomplete.
One of the following: "in\_progress" "completed" "incomplete" type: "shell\_call\_output" (default: "shell\_call\_output") The type of the shell call output. Always shell\_call\_output.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") created\_by: optional string The identifier of the actor that created the item.
ApplyPatchCall { id, call\_id, operation, 4 more } A tool call that applies file diffs by creating, deleting, or updating files.
id: string The unique ID of the apply patch tool call. Populated when this item is returned via API.
call\_id: string The unique ID of the apply patch tool call generated by the model.
operation: CreateFile or DeleteFile or UpdateFile One of the create\_file, delete\_file, or update\_file operations applied via apply\_patch.
One of the following: CreateFile { diff, path, type } Instruction describing how to create a file via the apply\_patch tool.
diff: string Diff to apply.
path: string Path of the file to create.
type: "create\_file" (default: "create\_file") Create a new file with the provided diff.
DeleteFile { path, type } Instruction describing how to delete a file via the apply\_patch tool.
path: string Path of the file to delete.
type: "delete\_file" (default: "delete\_file") Delete the specified file.
UpdateFile { diff, path, type } Instruction describing how to update a file via the apply\_patch tool.
diff: string Diff to apply.
path: string Path of the file to update.
type: "update\_file" (default: "update\_file") Update an existing file with the provided diff.
status: "in\_progress" or "completed" The status of the apply patch tool call. One of in\_progress or completed.
One of the following: "in\_progress" "completed" type: "apply\_patch\_call" (default: "apply\_patch\_call") The type of the item. Always apply\_patch\_call.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") created\_by: optional string The ID of the entity that created this tool call.
ApplyPatchCallOutput { id, call\_id, status, 4 more } The output emitted by an apply patch tool call.
id: string The unique ID of the apply patch tool call output. Populated when this item is returned via API.
call\_id: string The unique ID of the apply patch tool call generated by the model.
status: "completed" or "failed" The status of the apply patch tool call output. One of completed or failed.
One of the following: "completed" "failed" type: "apply\_patch\_call\_output" (default: "apply\_patch\_call\_output") The type of the item. Always apply\_patch\_call\_output.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") created\_by: optional string The ID of the entity that created this tool call output.
output: optional string or null Optional textual output returned by the apply patch tool.
McpCall { id, arguments, name, 6 more } An invocation of a tool on an MCP server.
id: string The unique ID of the tool call.
arguments: string A JSON string of the arguments passed to the tool.
name: string The name of the tool that was run.
server\_label: string The label of the MCP server running the tool.
type: "mcp\_call" The type of the item. Always mcp\_call.
approval\_request\_id: optional string or null Unique identifier for the MCP tool call approval request.
Include this value in a subsequent mcp\_approval\_response input to approve or reject the corresponding tool call.
error: optional McpToolCallError or null The error from the tool call, if any.
One of the following: McpProtocolError { code, message, type } code: integer message: string type: "mcp\_protocol\_error" (default: "mcp\_protocol\_error") McpToolExecutionError { content, type } content: unknown type: "mcp\_tool\_execution\_error" (default: "mcp\_tool\_execution\_error") HTTPError { code, message, type } code: integer message: string type: "http\_error" (default: "http\_error") output: optional string or null The output from the tool call.
status: optional "in\_progress" or "completed" or "incomplete" or 2 more The status of the tool call. One of in\_progress, completed, incomplete, calling, or failed.
One of the following: "in\_progress" "completed" "incomplete" "calling" "failed" McpListTools { id, server\_label, tools, 2 more } A list of tools available on an MCP server.
id: string The unique ID of the list.
server\_label: string The label of the MCP server.
tools: array of { input\_schema, name, annotations, description } The tools available on the server.
input\_schema: unknown The JSON schema describing the tool’s input.
name: string The name of the tool.
annotations: optional unknown or null Additional annotations about the tool.
description: optional string or null The description of the tool.
type: "mcp\_list\_tools" The type of the item. Always mcp\_list\_tools.
error: optional string or null Error message if the server could not list tools.
McpApprovalRequest { id, arguments, name, 2 more } A request for human approval of a tool invocation.
id: string The unique ID of the approval request.
arguments: string A JSON string of arguments for the tool.
name: string The name of the tool to run.
server\_label: string The label of the MCP server making the request.
type: "mcp\_approval\_request" The type of the item. Always mcp\_approval\_request.
McpApprovalResponse { id, approval\_request\_id, approve, 2 more } A response to an MCP approval request.
id: string The unique ID of the approval response
approval\_request\_id: string The ID of the approval request being answered.
approve: boolean Whether the request was approved.
type: "mcp\_approval\_response" The type of the item. Always mcp\_approval\_response.
reason: optional string or null Optional reason for the decision.
CustomToolCall { call\_id, input, name, 5 more } A call to a custom tool created by the model.
call\_id: string An identifier used to map this custom tool call to a tool call output.
input: string The input for the custom tool call generated by the model.
name: string The name of the custom tool being called.
type: "custom\_tool\_call" The type of the custom tool call. Always custom\_tool\_call.
id: optional string The unique ID of the custom tool call in the OpenAI platform.
async: optional boolean Whether the custom tool call runs asynchronously.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
type: "program" (default: "program") namespace: optional string The namespace of the custom tool being called.
CustomToolCallOutput { id, call\_id, output, 4 more } id: string The unique ID of the custom tool call output item.
call\_id: string The call ID, used to map this custom tool call output to a custom tool call.
output: string or array of ResponseInputText or ResponseInputImage or ResponseInputFile The output from the custom tool call generated by your code.
Can be a string or an list of output content.
One of the following: StringOutput = string A string of the output of the custom tool call.
OutputContentList = array of ResponseInputText or ResponseInputImage or ResponseInputFile Text, image, or file output of the custom tool call.
One of the following: ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" status: "in\_progress" or "completed" or "incomplete" The status of the item. One of in\_progress, completed, or
incomplete. Populated when items are returned via API.
One of the following: "in\_progress" "completed" "incomplete" type: "custom\_tool\_call\_output" The type of the custom tool call output. Always custom\_tool\_call\_output.
caller: optional Direct or Program or null The execution context that produced this tool call.
One of the following: Direct { type } type: "direct" (default: "direct") The caller type. Always direct.
Program { caller\_id, type } caller\_id: string The call ID of the program item that produced this tool call.
minLength1 maxLength64 type: "program" (default: "program") The caller type. Always program.
created\_by: optional string The identifier of the actor that created the item.
parallel\_tool\_calls: boolean (default: true) Whether to allow the model to run tool calls in parallel.
temperature: number or null (default: 1) What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
We generally recommend altering this or top\_p but not both.
minimum0 maximum2 tool\_choice: ToolChoiceOptions or ToolChoiceAllowed or ToolChoiceTypes or 6 more How the model should select which tool (or tools) to use when generating
a response. See the tools parameter to see how to specify which tools
the model can call.
One of the following: ToolChoiceOptions = "none" or "auto" or "required" Controls which (if any) tool is called by the model.
none means the model will not call any tool and instead generates a message.
auto means the model can pick between generating a message or calling one or
more tools.
required means the model must call one or more tools.
One of the following: "none" "auto" "required" ToolChoiceAllowed { mode, tools, type } Constrains the tools available to the model to a pre-defined set.
mode: "auto" or "required" Constrains the tools available to the model to a pre-defined set.
auto allows the model to pick from among the allowed tools and generate a
message.
required requires the model to call one or more of the allowed tools.
One of the following: "auto" "required" tools: array of map\[unknown\] A list of tool definitions that the model should be allowed to call.
For the Responses API, the list of tool definitions might look like:
\[\
{ "type": "function", "name": "get\_weather" },\
{ "type": "mcp", "server\_label": "deepwiki" },\
{ "type": "image\_generation" }\
\]
type: "allowed\_tools" Allowed tool configuration type. Always allowed\_tools.
ToolChoiceTypes { type } Indicates that the model should use a built-in tool to generate a response.
Learn more about built-in tools.
type: "file\_search" or "web\_search\_preview" or "computer" or 5 more The type of hosted tool the model should to use. Learn more about
built-in tools.
Allowed values are:

file\_search
web\_search\_preview
computer
computer\_use\_preview
computer\_use
code\_interpreter
image\_generation

One of the following: "file\_search" "web\_search\_preview" "computer" "computer\_use\_preview" "computer\_use" "web\_search\_preview\_2025\_03\_11" "image\_generation" "code\_interpreter" ToolChoiceFunction { name, type } Use this option to force the model to call a specific function.
name: string The name of the function to call.
type: "function" For function calling, the type is always function.
ToolChoiceMcp { server\_label, type, name } Use this option to force the model to call a specific tool on a remote MCP server.
server\_label: string The label of the MCP server to use.
type: "mcp" For MCP tools, the type is always mcp.
name: optional string or null The name of the tool to call on the server.
ToolChoiceCustom { name, type } Use this option to force the model to call a specific custom tool.
name: string The name of the custom tool to call.
type: "custom" For custom tool calling, the type is always custom.
SpecificProgrammaticToolCallingParam { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The tool to call. Always programmatic\_tool\_calling.
ToolChoiceApplyPatch { type } Forces the model to call the apply\_patch tool when executing a tool call.
type: "apply\_patch" (default: "apply\_patch") The tool to call. Always apply\_patch.
ToolChoiceShell { type } Forces the model to call the shell tool when a tool call is required.
type: "shell" (default: "shell") The tool to call. Always shell.
tools: array of Function or FileSearch or Computer or 13 more An array of tools the model may call while generating a response. You
can specify which tool to use by setting the tool\_choice parameter.
We support the following categories of tools:

Built-in tools: Tools that are provided by OpenAI that extend the
model’s capabilities, like web search
or file search. Learn more about
built-in tools.
MCP Tools: Integrations with third-party systems via custom MCP servers
or predefined connectors such as Google Drive and SharePoint. Learn more about
MCP Tools.
Function calls (custom tools): Functions that are defined by you,
enabling the model to call your own code with strongly typed arguments
and outputs. Learn more about
function calling. You can also use
custom tools to call your own code.

One of the following: Function { name, parameters, strict, 6 more } Defines a function in your own code the model can choose to call. Learn more about function calling.
name: string The name of the function to call.
parameters: map\[unknown\] or null A JSON schema object describing the parameters of the function.
strict: boolean or null Whether strict parameter validation is enforced for this function tool.
type: "function" (default: "function") The type of the function tool. Always function.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
One of the following: "direct" "programmatic" async: optional boolean defer\_loading: optional boolean Whether this function is deferred and loaded via tool search.
description: optional string or null A description of the function. Used by the model to determine whether or not to call the function.
output\_schema: optional map\[unknown\] or null A JSON schema object describing the JSON value encoded in string outputs for this function.
FileSearch { type, vector\_store\_ids, filters, 2 more } A tool that searches for relevant content from uploaded files. Learn more about the file search tool.
type: "file\_search" (default: "file\_search") The type of the file search tool. Always file\_search.
vector\_store\_ids: array of string The IDs of the vector stores to search.
filters: optional ComparisonFilter or CompoundFilter or null A filter to apply.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } Combine multiple filters using and or or.
filters: array of ComparisonFilter or CompoundFilter Array of filters to combine. Items can be ComparisonFilter or CompoundFilter.
One of the following: ComparisonFilter { key, type, value } A filter used to compare a specified attribute key to a given value using a defined comparison operation.
key: string The key to compare against the value.
type: "eq" or "ne" or "gt" or 5 more (default: "eq") Specifies the comparison operator: eq, ne, gt, gte, lt, lte, in, nin.

eq: equals
ne: not equal
gt: greater than
gte: greater than or equal
lt: less than
lte: less than or equal
in: in
nin: not in

One of the following: "eq" "ne" "gt" "gte" "lt" "lte" "in" "nin" value: string or number or boolean or array of string or number The value to compare against the attribute key; supports string, number, or boolean types.
One of the following: string number boolean array of string or number One of the following: string number CompoundFilter { filters, type } This type repeats the enclosing schema. type: "and" or "or" Type of operation: and or or.
One of the following: "and" "or" max\_num\_results: optional integer The maximum number of results to return. This number should be between 1 and 50 inclusive.
ranking\_options: optional { hybrid\_search, ranker, score\_threshold } Ranking options for search.
hybrid\_search: optional { embedding\_weight, text\_weight } Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.
embedding\_weight: number The weight of the embedding in the reciprocal ranking fusion.
text\_weight: number The weight of the text in the reciprocal ranking fusion.
ranker: optional "auto" or "default-2024-11-15" The ranker to use for the file search.
One of the following: "auto" "default-2024-11-15" score\_threshold: optional number The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.
Computer { type } A tool that controls a virtual computer. Learn more about the computer tool.
type: "computer" (default: "computer") The type of the computer tool. Always computer.
ComputerUsePreview { display\_height, display\_width, environment, type } A tool that controls a virtual computer. Learn more about the computer tool.
display\_height: integer The height of the computer display.
display\_width: integer The width of the computer display.
environment: "windows" or "mac" or "linux" or 2 more The type of computer environment to control.
One of the following: "windows" "mac" "linux" "ubuntu" "browser" type: "computer\_use\_preview" (default: "computer\_use\_preview") The type of the computer use tool. Always computer\_use\_preview.
WebSearch { type, external\_web\_access, filters, 2 more } Search the Internet for sources related to the prompt. Learn more about the
web search tool.
type: "web\_search" or "web\_search\_2025\_08\_26" (default: "web\_search") The type of the web search tool. One of web\_search or web\_search\_2025\_08\_26.
One of the following: "web\_search" "web\_search\_2025\_08\_26" external\_web\_access: optional boolean (default: true) Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content.
filters: optional object or null Filters for the search.
allowed\_domains: optional array of string or null (default: \[\]) Allowed domains for the search. If not provided, all domains are allowed.
Subdomains of the provided domains are allowed as well.
Example: \["pubmed.ncbi.nlm.nih.gov"\]
search\_context\_size: optional "low" or "medium" or "high" (default: "medium") High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the
United States. To avoid this fallback, pass {"type": "approximate"} without
location fields. To localize results, provide the relevant location fields.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
type: optional "approximate" (default: "approximate") The type of location approximation. Always approximate.
Mcp { server\_label, type, allowed\_callers, 9 more } Give the model access to additional tools via remote Model Context Protocol
(MCP) servers. Learn more about MCP.
server\_label: string A label for this MCP server, used to identify it in tool calls.
type: "mcp" The type of the MCP tool. Always mcp.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" allowed\_tools: optional array of string or McpToolFilter or null List of allowed tool names or a filter object.
One of the following: McpAllowedTools = array of string A string array of allowed tool names
McpToolFilter { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
authorization: optional string An OAuth access token that can be used with a remote MCP server, either
with a custom MCP server URL or a service connector. Your application
must handle the OAuth authorization flow and provide the token here.
connector\_id: optional "connector\_dropbox" or "connector\_gmail" or "connector\_googlecalendar" or 5 more Deprecated.
Identifier for service connectors, like those available in ChatGPT. One of
server\_url, connector\_id, or tunnel\_id must be provided. Learn more
about service connectors here.
This field is deprecated for models released after September 1, 2026.
Use server\_url to connect to a remote MCP server, or tunnel\_id to
connect through a Secure MCP Tunnel.
Currently supported connector\_id values are:

Dropbox: connector\_dropbox
Gmail: connector\_gmail
Google Calendar: connector\_googlecalendar
Google Drive: connector\_googledrive
Microsoft Teams: connector\_microsoftteams
Outlook Calendar: connector\_outlookcalendar
Outlook Email: connector\_outlookemail
SharePoint: connector\_sharepoint

One of the following: "connector\_dropbox" "connector\_gmail" "connector\_googlecalendar" "connector\_googledrive" "connector\_microsoftteams" "connector\_outlookcalendar" "connector\_outlookemail" "connector\_sharepoint" defer\_loading: optional boolean Whether this MCP tool is deferred and discovered via tool search.
headers: optional map\[string\] or null Optional HTTP headers to send to the MCP server. Use for authentication
or other purposes.
require\_approval: optional McpToolApprovalFilter or "always" or "never" or null (default: "always") Specify which of the MCP server’s tools require approval.
One of the following: McpToolApprovalFilter { always, never } Specify which of the MCP server’s tools require approval. Can be
always, never, or a filter object associated with tools
that require approval.
always: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
never: optional { read\_only, tool\_names } A filter object to specify which tools are allowed.
read\_only: optional boolean Indicates whether or not a tool modifies data or is read-only. If an
MCP server is annotated with readOnlyHint,
it will match this filter.
tool\_names: optional array of string List of allowed tool names.
McpToolApprovalSetting = "always" or "never" Specify a single approval policy for all tools. One of always or
never. When set to always, all tools will require approval. When
set to never, all tools will not require approval.
One of the following: "always" "never" server\_description: optional string Optional description of the MCP server, used to provide more context.
server\_url: optional string The URL for the MCP server. One of server\_url, connector\_id, or
tunnel\_id must be provided.
formaturi tunnel\_id: optional string The Secure MCP Tunnel ID to use instead of a direct server URL. One of
server\_url, connector\_id, or tunnel\_id must be provided.
pattern^tunnel\_\[a-z0-9\]{32}$ CodeInterpreter { container, type, allowed\_callers } A tool that runs Python code to help generate a response to a prompt.
container: string or CodeInterpreterToolAuto The code interpreter container. Can be a container ID or an object that
specifies uploaded file IDs to make available to your code, along with an
optional memory\_limit setting.
One of the following: string The container ID.
CodeInterpreterToolAuto { type, file\_ids, memory\_limit, network\_policy } Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.
type: "auto" (default: "auto") Always auto.
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the code interpreter container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 type: "code\_interpreter" The type of the code interpreter tool. Always code\_interpreter.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" ProgrammaticToolCalling { type } type: "programmatic\_tool\_calling" (default: "programmatic\_tool\_calling") The type of the tool. Always programmatic\_tool\_calling.
ImageGeneration { type, action, background, 13 more } A tool that generates images using the GPT image models.
type: "image\_generation" The type of the image generation tool. Always image\_generation.
action: optional "generate" or "edit" or "auto" Whether to generate a new image or edit an existing image. Default: auto.
One of the following: "generate" "edit" "auto" background: optional "transparent" or "opaque" or "auto" (default: "auto") Set the background of the generated image. One of transparent, opaque,
or auto. gpt-image-2.5-sunburst and gpt-image-2.5-flare, including
their 2026-09-08 snapshots, support opaque and transparent
backgrounds. Transparent backgrounds are available for supported GPT Image
models. For gpt-image-2 and gpt-image-2-2026-04-21, this support is in
preview. When using transparent, set the output format to png or webp.
Default: auto.
One of the following: "transparent" "opaque" "auto" complexity: optional "low" or "medium" or "high" Computation spent planning the image, independently of rendering quality.
Overrides the outer response’s reasoning.effort for image generation.
When omitted, inherits a supported outer reasoning effort or uses the
image model’s configured default.
For SVG output, controls the reference image, not the SVG author’s
reasoning.
One of the following: "low" "medium" "high" frame\_count: optional integer (default: 9) Number of GIF frames. Requires output\_format to be gif. Default: 9.
minimum2 maximum16 frame\_duration\_ms: optional integer (default: 200) Duration of each GIF frame in milliseconds, rounded to 10 ms.
Requires output\_format to be gif. Default: 200.
minimum20 maximum2000 input\_fidelity: optional "high" or "low" or null Control how much effort the model will exert to match the style and features, especially facial features, of input images. Supports high and low on gpt-image-1.5; gpt-image-1-mini supports only low. For gpt-image-2, omit this parameter. Defaults to low on supported models.
One of the following: "high" "low" input\_image\_mask: optional { file\_id, image\_url } Optional mask for inpainting. Contains image\_url
(string, optional) and file\_id (string, optional).
file\_id: optional string File ID for the mask image.
image\_url: optional string Base64-encoded mask image.
model: optional string or "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: string "gpt-image-1" or "gpt-image-1-mini" or "gpt-image-2" or 9 more The image generation model to use. One of gpt-image-1-mini,
gpt-image-1.5, gpt-image-2,
gpt-image-2-2026-04-21, gpt-image-2.5-sunburst,
gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare,
gpt-image-2.5-flare-2026-09-08, gpt-image-2.6-sunburst,
gpt-image-2.6-flare, or chatgpt-image-latest. Default:
gpt-image-2.6-sunburst.
gpt-image-1 was shut down on October 23, 2026. Use
gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
One of the following: "gpt-image-1-mini" "gpt-image-2" "gpt-image-2-2026-04-21" "gpt-image-2.5-sunburst" "gpt-image-2.5-sunburst-2026-09-08" "gpt-image-2.5-flare" "gpt-image-2.5-flare-2026-09-08" "gpt-image-2.6-sunburst" "gpt-image-2.6-flare" "gpt-image-1.5" "chatgpt-image-latest" "gpt-image-1" Deprecated. GPT Image 1 was shut down on October 23, 2026. Use gpt-image-2.5-sunburst or gpt-image-2.5-flare instead.
moderation: optional "auto" or "low" (default: "auto") Moderation level for the generated image. Default: auto.
One of the following: "auto" "low" output\_compression: optional integer (default: 100) Compression level for the output image. Default: 100.
minimum0 maximum100 output\_format: optional "png" or "webp" or "jpeg" or 2 more (default: "png") The output format of the generated image. One of png, webp, jpeg,
gif, or svg. Default: png. GIF and SVG output require a model
that supports the selected format. GIF output does not support
partial image streaming (partial\_images greater than 0),
input\_image\_mask, or custom output\_compression.
Responses lifecycle events can still be streamed for GIF output.
One of the following: "png" "webp" "jpeg" "gif" "svg" partial\_images: optional integer (default: 0) Number of partial images to generate in streaming mode, from 0 (default value) to 3.
minimum0 maximum3 quality: optional "low" or "medium" or "high" or 3 more (default: "auto") The quality of the generated image. The GPT image models support low,
medium, and high. gpt-image-2.5-sunburst and gpt-image-2.5-flare,
including their 2026-09-08 snapshots, also support xhigh and max.
Default: auto.
One of the following: "low" "medium" "high" "xhigh" "max" "auto" size: optional string or "1024x1024" or "1024x1536" or "1536x1024" or "auto" (default: "auto") The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: string "1024x1024" or "1024x1536" or "1536x1024" or "auto" The size of the generated images. For gpt-image-2, gpt-image-2-2026-04-21, gpt-image-2.5-sunburst, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare, and gpt-image-2.5-flare-2026-09-08, arbitrary resolutions are supported as WIDTHxHEIGHT strings, for example 1536x864. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above 2560x1440 are experimental, and the maximum supported resolution is 3840x2160. The requested size must also satisfy the model’s current pixel and edge limits. The standard sizes 1024x1024, 1536x1024, and 1024x1536 are supported by the GPT image models; auto is supported for models that allow automatic sizing.
One of the following: "1024x1024" "1024x1536" "1536x1024" "auto" svg: optional { model, reasoning } SVG author model settings. Requires output\_format to be svg.
When SVG model selection is enabled, omitting this object uses the
outer response model. Otherwise, the default SVG author is used and
explicit model overrides are unavailable.
model: optional string minLength1 reasoning: optional object or null Reasoning effort for SVG authoring. When omitted, uses the author model’s default in both Images and Responses.
effort: optional "none" or "minimal" or "low" or 4 more Controls how much effort the model should spend on reasoning for this request.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" LocalShell { type } A tool that allows the model to execute shell commands in a local environment.
type: "local\_shell" (default: "local\_shell") The type of the local shell tool. Always local\_shell.
Shell { type, allowed\_callers, environment } A tool that allows the model to execute shell commands.
type: "shell" (default: "shell") The type of the shell tool. Always shell.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" environment: optional ContainerAuto or LocalEnvironment or ContainerReference or null One of the following: ContainerAuto { type, file\_ids, memory\_limit, 2 more } type: "container\_auto" (default: "container\_auto") Automatically creates a container for this request
file\_ids: optional array of string An optional list of uploaded files to make available to your code.
maxItems50 memory\_limit: optional "1g" or "4g" or "16g" or "64g" or null The memory limit for the container.
One of the following: "1g" "4g" "16g" "64g" network\_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist Network access policy for the container.
One of the following: ContainerNetworkPolicyDisabled { type } type: "disabled" (default: "disabled") Disable outbound network access. Always disabled.
ContainerNetworkPolicyAllowlist { allowed\_domains, type, domain\_secrets } allowed\_domains: array of string A list of allowed domains when type is allowlist.
minItems1 type: "allowlist" (default: "allowlist") Allow outbound network access only to specified domains. Always allowlist.
domain\_secrets: optional array of ContainerNetworkPolicyDomainSecret { domain, name, value } Optional domain-scoped secrets for allowlisted domains.
minItems1 domain: string The domain associated with the secret.
minLength1 name: string The name of the secret to inject for the domain.
minLength1 value: string The secret value to inject for the domain.
minLength1 maxLength10485760 skills: optional array of SkillReference or InlineSkill An optional list of skills referenced by id or inline data.
maxItems200 One of the following: SkillReference { skill\_id, type, version } skill\_id: string The ID of the referenced skill.
minLength1 maxLength64 type: "skill\_reference" (default: "skill\_reference") References a skill created with the /v1/skills endpoint.
version: optional string Optional skill version. Use a positive integer or ‘latest’. Omit for default.
InlineSkill { description, name, source, type } description: string The description of the skill.
name: string The name of the skill.
source: InlineSkillSource { data, media\_type, type } Inline skill payload
data: string Base64-encoded skill zip bundle.
minLength1 maxLength70254592 media\_type: "application/zip" (default: "application/zip") The media type of the inline skill payload. Must be application/zip.
type: "base64" (default: "base64") The type of the inline skill source. Must be base64.
type: "inline" (default: "inline") Defines an inline skill for this request.
LocalEnvironment { type, skills } type: "local" (default: "local") Use a local computer environment.
skills: optional array of LocalSkill { description, name, path } An optional list of skills.
maxItems200 description: string The description of the skill.
name: string The name of the skill.
path: string The path to the directory containing the skill.
ContainerReference { container\_id, type } container\_id: string The ID of the referenced container.
type: "container\_reference" (default: "container\_reference") References a container created with the /v1/containers endpoint
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
Namespace { description, name, tools, type } Groups function/custom tools under a shared namespace.
description: string A description of the namespace shown to the model.
name: string The namespace name used in tool calls (for example, crm).
minLength1 tools: array of Function or Custom The function/custom tools available inside this namespace.
minItems1 One of the following: Function { name, type, allowed\_callers, 6 more } name: string pattern^\[a-zA-Z0-9\_-\]+$ minLength1 maxLength128 type: "function" (default: "function") allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this function should be deferred and discovered via tool search.
description: optional string or null output\_schema: optional map\[unknown\] or null A JSON Schema describing the JSON value encoded in string outputs for this function tool. This does not describe content-array outputs.
parameters: optional unknown or null strict: optional boolean or null Whether to enforce strict parameter validation. If omitted, Responses attempts to use strict validation when the schema is compatible, and falls back to non-strict validation otherwise.
Custom { name, type, allowed\_callers, 4 more } A custom tool that processes input using a specified format. Learn more about custom tools
name: string The name of the custom tool, used to identify it in tool calls.
type: "custom" (default: "custom") The type of the custom tool. Always custom.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" async: optional boolean Whether the tool response can be returned asynchronously versus immediately returned on next response creation.
defer\_loading: optional boolean Whether this tool should be deferred and discovered via tool search.
description: optional string Optional description of the custom tool, used to provide more context.
format: optional CustomToolInputFormat The input format for the custom tool. Default is unconstrained text.
One of the following: Text { type } Unconstrained free-form text.
type: "text" (default: "text") Unconstrained text format. Always text.
Grammar { definition, syntax, type } A grammar defined by the user.
definition: string The grammar definition.
syntax: "lark" or "regex" The syntax of the grammar definition. One of lark or regex.
One of the following: "lark" "regex" type: "grammar" (default: "grammar") Grammar format. Always grammar.
type: "namespace" (default: "namespace") The type of the tool. Always namespace.
ToolSearch { type, description, execution, parameters } Hosted or BYOT tool search configuration for deferred tools.
type: "tool\_search" (default: "tool\_search") The type of the tool. Always tool\_search.
description: optional string or null Description shown to the model for a client-executed tool search tool.
execution: optional "server" or "client" Whether tool search is executed by the server or by the client.
One of the following: "server" "client" parameters: optional unknown or null Parameter schema for a client-executed tool search tool.
WebSearchPreview { type, search\_content\_types, search\_context\_size, user\_location } This tool searches the web for relevant results to use in a response. Learn more about the web search tool.
type: "web\_search\_preview" or "web\_search\_preview\_2025\_03\_11" (default: "web\_search\_preview") The type of the web search tool. One of web\_search\_preview or web\_search\_preview\_2025\_03\_11.
One of the following: "web\_search\_preview" "web\_search\_preview\_2025\_03\_11" search\_content\_types: optional array of "text" or "image" One of the following: "text" "image" search\_context\_size: optional "low" or "medium" or "high" High level guidance for the amount of context window space to use for the search. One of low, medium, or high. medium is the default.
One of the following: "low" "medium" "high" user\_location: optional object or null The approximate location of the user. If omitted or null, defaults to the United States. To avoid this fallback, pass {"type": "approximate"} without location fields. To localize results, provide the relevant location fields.
type: "approximate" (default: "approximate") The type of location approximation. Always approximate.
city: optional string or null Free text input for the city of the user, e.g. San Francisco.
country: optional string or null The two-letter ISO country code of the user, e.g. US.
region: optional string or null Free text input for the region of the user, e.g. California.
timezone: optional string or null The IANA timezone of the user, e.g. America/Los\_Angeles.
ApplyPatch { type, allowed\_callers } Allows the assistant to create, delete, or update files using unified diffs.
type: "apply\_patch" (default: "apply\_patch") The type of the tool. Always apply\_patch.
allowed\_callers: optional array of "direct" or "programmatic" or null The tool invocation context(s).
minItems1 One of the following: "direct" "programmatic" top\_p: number or null (default: 1) An alternative to sampling with temperature, called nucleus sampling,
where the model considers the results of the tokens with top\_p probability
mass. So 0.1 means only the tokens comprising the top 10% probability mass
are considered.
We generally recommend altering this or temperature but not both.
minimum0 maximum1 background: optional boolean or null (default: false) Whether to run the model response in the background.
Learn more.
completed\_at: optional number or null Unix timestamp (in seconds) of when this Response was completed.
Only present when the status is completed.
formatunixtime conversation: optional object or null The conversation that this response belonged to. Input items and output items from this response were automatically added to this conversation.
id: string The unique ID of the conversation that this response was associated with.
image: optional { context\_compression } context\_compression: "enabled" or "disabled" Effective image context optimization policy.
One of the following: "enabled" "disabled" input\_transformations: optional array of { id, action, reason, type } Reasoning inputs withheld from the model, in input order.
id: string The original reasoning item ID.
action: "removed" (default: "removed") reason: "organization\_mismatch" or "end\_user\_mismatch" or "model\_mismatch" or 2 more One of the following: "organization\_mismatch" "end\_user\_mismatch" "model\_mismatch" "prefix\_mismatch" "turn\_boundary" type: "reasoning" (default: "reasoning") max\_output\_tokens: optional integer or null An upper bound for the number of tokens that can be generated for a response, including visible output tokens and reasoning tokens.
max\_tool\_calls: optional integer or null The maximum number of total calls to built-in tools that can be processed in a response. This maximum number applies across all built-in tool calls, not per individual tool. Any further attempts to call a tool by the model will be ignored.
moderation: optional object or null Moderation results for the response input and output, if moderated completions were requested.
input: ModerationResult or Error Moderation for the response input.
One of the following: ModerationResult { categories, category\_applied\_input\_types, category\_scores, 3 more } A moderation result produced for the response input or output.
categories: map\[boolean\] A dictionary of moderation categories to booleans, True if the input is flagged under this category.
category\_applied\_input\_types: map\[array of "text" or "image"\] Which modalities of input are reflected by the score for each category.
One of the following: "text" "image" category\_scores: map\[number\] A dictionary of moderation categories to scores.
flagged: boolean A boolean indicating whether the content was flagged by any category.
model: string The moderation model that produced this result.
type: "moderation\_result" (default: "moderation\_result") The object type, which was always moderation\_result for successful moderation results.
Error { code, message, type } An error produced while attempting moderation for the response input or output.
code: string The error code.
message: string The error message.
type: "error" (default: "error") The object type, which was always error for moderation failures.
output: ModerationResult or Error Moderation for the response output.
One of the following: ModerationResult { categories, category\_applied\_input\_types, category\_scores, 3 more } A moderation result produced for the response input or output.
categories: map\[boolean\] A dictionary of moderation categories to booleans, True if the input is flagged under this category.
category\_applied\_input\_types: map\[array of "text" or "image"\] Which modalities of input are reflected by the score for each category.
One of the following: "text" "image" category\_scores: map\[number\] A dictionary of moderation categories to scores.
flagged: boolean A boolean indicating whether the content was flagged by any category.
model: string The moderation model that produced this result.
type: "moderation\_result" (default: "moderation\_result") The object type, which was always moderation\_result for successful moderation results.
Error { code, message, type } An error produced while attempting moderation for the response input or output.
code: string The error code.
message: string The error message.
type: "error" (default: "error") The object type, which was always error for moderation failures.
output\_text: optional string or null SDK-only convenience property that contains the aggregated text output
from all output\_text items in the output array, if any are present.
Supported in the Python and JavaScript SDKs.
previous\_response\_id: optional string or null The unique ID of the previous response to the model. Use this to
create multi-turn conversations. Learn more about
conversation state. Cannot be used in conjunction with conversation.
prompt: optional ResponsePrompt or null Reference to a prompt template and its variables.
Learn more.
id: string The unique identifier of the prompt template to use.
variables: optional map\[string or ResponseInputText or ResponseInputImage or ResponseInputFile\] or null Optional map of values to substitute in for variables in your
prompt. The substitution values can either be strings, or other
Response input types like images or files.
One of the following: string ResponseInputText { text, type, prompt\_cache\_breakpoint } A text input to the model.
text: string The text input to the model.
type: "input\_text" (default: "input\_text") The type of the input item. Always input\_text.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputImage { detail, type, file\_id, 2 more } An image input to the model. Learn about image inputs.
detail: ImageDetail The detail level of the image to be sent to the model. One of high, low, auto, or original. Defaults to auto.
One of the following: "low" "high" "auto" "original" type: "input\_image" (default: "input\_image") The type of the input item. Always input\_image.
file\_id: optional string or null The ID of the file to be sent to the model.
image\_url: optional string or null The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.
formaturi prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" ResponseInputFile { type, detail, file\_data, 4 more } A file input to the model.
type: "input\_file" (default: "input\_file") The type of the input item. Always input\_file.
detail: optional "auto" or "low" or "high" The detail level of the file to be sent to the model. Use auto to let the system select the detail level; for GPT-5.6 and later models, auto uses high-quality rendering, which may increase input token usage. Use low for lower-cost rendering, or high to render the file at higher quality. Defaults to auto.
One of the following: "auto" "low" "high" file\_data: optional string The content of the file to be sent to the model.
file\_id: optional string or null The ID of the file to be sent to the model.
file\_url: optional string The URL of the file to be sent to the model.
formaturi filename: optional string The name of the file to be sent to the model.
prompt\_cache\_breakpoint: optional { mode, ttl } Marks the exact end of a reusable prompt prefix. When ttl is omitted, the breakpoint inherits the request’s prompt\_cache\_options.ttl; the boundary is not rounded to a token block.
mode: "explicit" (default: "explicit") The breakpoint mode. Always explicit.
ttl: optional "30m" or "12h" The minimum lifetime of this cache breakpoint. Defaults to the request TTL.
One of the following: "30m" "12h" version: optional string or null Optional version of the prompt template.
prompt\_cache\_diagnostics: optional CacheMiss or CacheHit or ComparisonResponseNotFound or Unavailable Prompt cache diagnostics requested for this response.
One of the following: CacheMiss { cache\_missed\_tokens, reason, type, comparison\_reusable\_tokens } cache\_missed\_tokens: integer The estimated number of input tokens affected after the first detected divergence.
reason: "model\_changed" or "prompt\_cache\_key\_changed" or "tools\_changed" or 6 more The reason prompt cache reuse did not occur.
One of the following: "model\_changed" "prompt\_cache\_key\_changed" "tools\_changed" "text\_format\_changed" "reasoning\_effort\_changed" "verbosity\_changed" "context\_compacted" "input\_changed" "service\_tier\_changed" type: "cache\_miss" (default: "cache\_miss") comparison\_reusable\_tokens: optional integer The raw token count of the reusable prefix in the compared response.
CacheHit { type } type: "cache\_hit" (default: "cache\_hit") ComparisonResponseNotFound { type } type: "comparison\_response\_not\_found" (default: "comparison\_response\_not\_found") Unavailable { type } type: "unavailable" (default: "unavailable") prompt\_cache\_key: optional string or null Used by OpenAI to cache responses for similar requests to optimize your cache hit rates. Replaces the user field. Learn more.
prompt\_cache\_options: optional { mode, ttl, comparison\_response\_id } The prompt-caching options that were applied to the response. Supported for gpt-5.6 and later models.
mode: "implicit" or "explicit" Whether implicit prompt-cache breakpoints were enabled.
One of the following: "implicit" "explicit" ttl: "30m" or "12h" The minimum lifetime applied to each cache breakpoint.
One of the following: "30m" "12h" comparison\_response\_id: optional string or null The response ID supplied as the prompt cache diagnostics comparison.
prompt\_cache\_retention: optional "in\_memory" or "24h" or null Deprecated.
Deprecated. Use prompt\_cache\_options.ttl instead.
The retention policy for the prompt cache. Set to 24h to enable extended prompt caching, which keeps cached prefixes active for longer, up to a maximum of 24 hours. Learn more.
This field expresses a maximum retention policy, while
prompt\_cache\_options.ttl expresses a minimum cache lifetime. The two
fields are independent and do not interact.
For gpt-5.5, gpt-5.5-pro, and future models, only 24h is supported.
For older models that support both in\_memory and 24h, the default depends on your organization’s data retention policy:

Organizations without ZDR enabled default to 24h.
Organizations with ZDR enabled default to in\_memory when prompt\_cache\_retention is not specified.

One of the following: "in\_memory" "24h" reasoning: optional Reasoning or null Configuration options for
reasoning models.
context: optional "auto" or "current\_turn" or "all\_turns" or null Controls which reasoning items are rendered back to the model on later turns.
If omitted or set to auto, the model determines the context mode. The
gpt-5.6 model family defaults to all\_turns; earlier models default to
current\_turn.
When returned on a response, this is the effective reasoning context mode
used for the response.
One of the following: "auto" "current\_turn" "all\_turns" effort: optional ReasoningEffort or null (default: "medium") Constrains effort on reasoning for reasoning models. Currently supported
values are none, minimal, low, medium, high, xhigh, and max.
Reducing reasoning effort can result in faster responses and fewer tokens
used on reasoning in a response. Not all reasoning models support every
value. See the
reasoning guide
for model-specific support.
One of the following: "none" "minimal" "low" "medium" "high" "xhigh" "max" generate\_summary: optional "auto" or "concise" or "detailed" or null Deprecated.
Deprecated: use summary instead.
A summary of the reasoning performed by the model. This can be
useful for debugging and understanding the model’s reasoning process.
One of auto, concise, or detailed.
One of the following: "auto" "concise" "detailed" mode: optional string or "standard" or "pro" Controls the reasoning execution mode for the request.
When returned on a response, this is the effective execution mode.
One of the following: string "standard" or "pro" Controls the reasoning execution mode for the request.
When returned on a response, this is the effective execution mode.
One of the following: "standard" "pro" summary: optional "auto" or "concise" or "detailed" or null A summary of the reasoning performed by the model. This can be
useful for debugging and understanding the model’s reasoning process.
One of auto, concise, or detailed.
concise is supported for computer-use-preview models and all reasoning models after gpt-5.
One of the following: "auto" "concise" "detailed" safety\_identifier: optional string or null A stable identifier used to help detect users of your application that may be violating OpenAI’s usage policies.
The IDs should be a string that uniquely identifies each user, with a maximum length of 128 characters. We recommend hashing their username or email address, in order to avoid sending us any identifying information. Learn more.
maxLength128 service\_tier: optional ServiceTier or null (default: "auto") Specifies the processing type used for serving the request.

If set to ‘auto’, then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use ‘default’.
If set to ‘default’, then the request will be processed with the standard pricing and performance for the selected model.
If set to ‘flex’, then the request will be processed with the Flex Processing service tier.
To opt-in to Fast mode at the request level, include the service\_tier=fast or service\_tier=priority parameter for Responses or Chat Completions. The response will show service\_tier=priority regardless of if you specify service\_tier=fast or priority in your request.
If set to ‘ultrafast’, then the request will be processed with the access-controlled Ultrafast Processing service tier. This tier is currently available for gpt-5.6-sol; a response served through it will show service\_tier=ultrafast.
When not set, the default behavior is ‘auto’.

When the service\_tier parameter is set, the response body will include the service\_tier value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.
One of the following: "auto" "default" "flex" "scale" "priority" "fast" "ultrafast" status: optional ResponseStatus The status of the response generation. One of completed, failed,
in\_progress, cancelled, queued, or incomplete.
One of the following: "completed" "failed" "in\_progress" "cancelled" "queued" "incomplete" text: optional ResponseTextConfig { format, verbosity } Configuration options for a text response from the model. Can be plain
text or structured JSON data. Learn more:

Text inputs and outputs
Structured Outputs

format: optional ResponseFormatTextConfig An object specifying the format that the model must output.
Configuring { "type": "json\_schema" } enables Structured Outputs,
which ensures the model will match your supplied JSON schema. Learn more in the
Structured Outputs guide.
The default format is { "type": "text" } with no additional options.
Not recommended for gpt-4o and newer models:
Setting to { "type": "json\_object" } enables the older JSON mode, which
ensures the message the model generates is valid JSON. Using json\_schema
is preferred for models that support it.
One of the following: ResponseFormatText { type } Default response format. Used to generate text responses.
type: "text" The type of response format being defined. Always text.
ResponseFormatTextJSONSchemaConfig { name, schema, type, 2 more } JSON Schema response format. Used to generate structured JSON responses.
Learn more about Structured Outputs.
name: string The name of the response format. Must be a-z, A-Z, 0-9, or contain
underscores and dashes, with a maximum length of 64.
schema: map\[unknown\] The schema for the response format, described as a JSON Schema object.
Learn how to build JSON schemas here.
type: "json\_schema" The type of response format being defined. Always json\_schema.
description: optional string A description of what the response format is for, used by the model to
determine how to respond in the format.
strict: optional boolean or null (default: false) Whether to enable strict schema adherence when generating the output.
If set to true, the model will always follow the exact schema defined
in the schema field. Only a subset of JSON Schema is supported when
strict is true. To learn more, read the Structured Outputs
guide.
ResponseFormatJSONObject { type } JSON object response format. An older method of generating JSON responses.
Using json\_schema is recommended for models that support it. Note that the
model will not generate JSON without a system or user message instructing it
to do so.
type: "json\_object" The type of response format being defined. Always json\_object.
verbosity: optional "low" or "medium" or "high" or null (default: "medium") Constrains the verbosity of the model’s response. Lower values will result in
more concise responses, while higher values will result in more verbose responses.
Currently supported values are low, medium, and high. The default is
medium.
One of the following: "low" "medium" "high" tool\_usage: optional { image\_gen, web\_search } Usage reported by hosted tools, separate from base model usage. The field
can be omitted when tool usage is unavailable. When present, tool families
with no recorded usage have zero counts.
image\_gen sums available token counts across image generation calls.
Calls with missing or incomplete usage records may be skipped. Output
token details and cached input counts can be omitted. An omitted cache
count means cache usage is unknown.
web\_search.num\_requests counts billable searches. Discounted searches
and actions such as opening a page are excluded. Use billing records to
reconcile final charges.
image\_gen: { input\_tokens, input\_tokens\_details, output\_tokens, 4 more } Aggregated usage statistics for image generation tool calls.
input\_tokens: integer The number of tokens (images and text) in the input prompt.
input\_tokens\_details: { image\_tokens, text\_tokens } The input tokens detailed information for the image generation.
image\_tokens: integer The number of image tokens in the input prompt.
text\_tokens: integer The number of text tokens in the input prompt.
output\_tokens: integer The number of output tokens generated by the model.
total\_tokens: integer The total number of tokens (images and text) used for the image generation.
cached\_tokens: optional integer cached\_tokens\_details: optional { cached\_image\_tokens, cached\_text\_tokens } cached\_image\_tokens: integer cached\_text\_tokens: integer output\_tokens\_details: optional { image\_tokens, text\_tokens } The output token details for the image generation.
image\_tokens: integer The number of image output tokens generated by the model.
text\_tokens: integer The number of text output tokens generated by the model.
web\_search: { num\_requests } Aggregated billable usage statistics for web search tool calls.
num\_requests: integer The number of billable web search requests issued.
top\_logprobs: optional integer or null An integer between 0 and 20 specifying the maximum number of most likely
tokens to return at each token position, each with an associated log
probability. In some cases, the number of returned tokens may be fewer than
requested.
minimum0 maximum20 truncation: optional "auto" or "disabled" or null (default: "disabled") The truncation strategy to use for the model response.

auto: If the input to this Response exceeds
the model’s context window size, the model will truncate the
response to fit the context window by dropping items from the beginning of the conversation.
On some models, trimming can begin earlier because the API subtracts the model’s
maximum output allowance from its input limit, even if you set a lower max\_output\_tokens.
disabled (default): If the input size will exceed the context window
size for a model, the request will fail with a 400 error.

One of the following: "auto" "disabled" usage: optional ResponseUsage or null Represents token usage details including input tokens, output tokens,
a breakdown of output tokens, and the total tokens used.
input\_tokens: integer The number of input tokens.
input\_tokens\_details: { cache\_write\_tokens, cached\_tokens, cache\_write\_tokens\_details } A detailed breakdown of the input tokens.
cache\_write\_tokens: integer The number of input tokens that were written to the cache.
cached\_tokens: integer The number of tokens that were retrieved from the cache.
More on prompt caching.
cache\_write\_tokens\_details: optional { ttl\_12h\_tokens, ttl\_30m\_tokens } ttl\_12h\_tokens: integer The number of input tokens written with 12-hour retention.
ttl\_30m\_tokens: integer The number of input tokens written with 30-minute retention.
output\_tokens: integer The number of output tokens.
output\_tokens\_details: { reasoning\_tokens } A detailed breakdown of the output tokens.
reasoning\_tokens: integer The number of reasoning tokens.
total\_tokens: integer The total number of tokens used.
user: optional string or null Deprecated.
This field is being replaced by safety\_identifier and prompt\_cache\_key. Use prompt\_cache\_key instead to maintain caching optimizations.
A stable identifier for your end-users.
Used to boost cache hit rates by better bucketing similar requests and to help OpenAI detect and prevent abuse. Learn more.

[Link to this property](https://developers.openai.com/api/reference/resources/responses/methods/create#(resource)%20responses%20%3E%20(model)%20response%20%3E%20(schema))

##### Returns Examples

200 — Example

```
{
  "id": "resp_67ccd3a9da748190baa7f1570fe91ac604becb25c45c1d41",
  "object": "response",
  "access_programs": null,
  "created_at": 1741476777,
  "status": "completed",
  "completed_at": 1741476778,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "model": "gpt-6-astra",
  "output": [\
    {\
      "type": "message",\
      "id": "msg_67ccd3acc8d48190a77525dc6de64b4104becb25c45c1d41",\
      "status": "completed",\
      "role": "assistant",\
      "content": [\
        {\
          "type": "output_text",\
          "text": "The image depicts a scenic landscape with a wooden boardwalk or pathway leading through lush, green grass under a blue sky with some clouds. The setting suggests a peaceful natural area, possibly a park or nature reserve. There are trees and shrubs in the background.",\
          "annotations": [],\
          "logprobs": []\
        }\
      ]\
    }\
  ],
  "parallel_tool_calls": true,
  "previous_response_id": null,
  "reasoning": {
    "effort": null,
    "summary": null,
    "context": null
  },
  "store": true,
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    }
  },
  "tool_choice": "auto",
  "tools": [],
  "top_p": 1,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 328,
    "input_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0
    },
    "output_tokens": 52,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 380
  },
  "tool_usage": {
    "image_gen": {
      "input_tokens": 0,
      "input_tokens_details": {
        "text_tokens": 0,
        "image_tokens": 0
      },
      "output_tokens": 0,
      "output_tokens_details": {
        "text_tokens": 0,
        "image_tokens": 0
      },
      "total_tokens": 0
    },
    "web_search": {
      "num_requests": 0
    }
  },
  "user": null,
  "metadata": {},
  "conversation": {
    "id": "id"
  },
  "image": {
    "context_compression": "enabled"
  },
  "input_transformations": [\
    {\
      "id": "id",\
      "action": "removed",\
      "reason": "organization_mismatch",\
      "type": "reasoning"\
    }\
  ],
  "moderation": {
    "input": {
      "categories": {
        "foo": true
      },
      "category_applied_input_types": {
        "foo": [\
          "text"\
        ]
      },
      "category_scores": {
        "foo": 0
      },
      "flagged": true,
      "model": "model",
      "type": "moderation_result"
    },
    "output": {
      "categories": {
        "foo": true
      },
      "category_applied_input_types": {
        "foo": [\
          "text"\
        ]
      },
      "category_scores": {
        "foo": 0
      },
      "flagged": true,
      "model": "model",
      "type": "moderation_result"
    }
  },
  "output_text": "output_text",
  "prompt_cache_diagnostics": {
    "cache_missed_tokens": 0,
    "reason": "model_changed",
    "type": "cache_miss",
    "comparison_reusable_tokens": 0
  },
  "prompt_cache_options": {
    "mode": "implicit",
    "ttl": "30m",
    "comparison_response_id": "comparison_response_id"
  },
  "service_tier": "auto"
}
```
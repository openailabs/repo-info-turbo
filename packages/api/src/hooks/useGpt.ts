import type { ConfigurationParameters } from "openai-edge";
import { Configuration, OpenAIApi } from "openai-edge";

const configuration: any = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: process.env.OPENAI_API_HOST || "https://api.openai.com",
});

const openai = new OpenAIApi(configuration);

const model = process.env.SUMMARIZE_MODEL || "gpt-3.5-turbo";

export const getSummary = async ({
  prompt,
  repoInfo,
}: {
  prompt: string;
  repoInfo: string;
}) => {
  const messages = [
    { role: "system", content: prompt },
    {
      role: "user",
      content: repoInfo,
    },
  ];

  // console.log(messages);

  const response = await openai.createChatCompletion({
    model: model,
    stream: false,
    messages: messages.map((message: any) => ({
      content: message.content,
      role: message.role,
    })),
  });
  // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(response);
  // console.log(stream);
  const result = await response.json();
  // const summary: string = result.choices[0].message.content;

  const summary: object = JSON.parse(result.choices[0].message.content);
  // console.log(summary);

  return { summary };
};

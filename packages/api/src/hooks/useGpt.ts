/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ConfigurationParameters } from 'openai-edge';
import { Configuration, OpenAIApi } from 'openai-edge';

const configuration: any = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: process.env.OPENAI_API_HOST ?? 'https://api.openai.com',
});

const openai = new OpenAIApi(configuration);

const model = process.env.SUMMARIZE_MODEL ?? 'gpt-3.5-turbo';
export const prompt = `你是一个资深开发工程师，我们正一起开发一个 github 分析类应用，只需要列出结果，无需解释。如果没有相应的分析结果则写出: "N/A"
名词定义:

    TLF: project top level files
	deps: dependency management file
	ENVFILES：从 TLF分析出env 文件 .env*
    DMFCONTENTS: dependency management file content

需求:
    根据TLF分析出依赖管理文件(deps), 如: package.json, build.gradle, pom.xml, requirements.txt, Cargo.toml, go.mod, .env* 等
    根据deps的内容(DMFCONTENTS)分析所使用的关键技术, 列出Stack，忽略清单: (打包，性能监控等结果的分析, eslint, prettier, testing 等类型)

结果字段说明:
    stacks: (从dependency分析当前项目所使用的技术)
    infrastructures: (从ENVFILES 分析本项目运行时所需要的基础环境, 如: mysql, redis, mongodb, postgresql etc.)
	language: (从.md 文件的文件名部分猜测，一般不带语言的为英文，带-ZH 或 -CN为简体中文)
    deployment: (建议可以部署在哪些云环境, 如: vercel(Node.js project only), zeabur(a docker recommanded depolyment environment), sealos, alibaba ecs, oci, IBM Cloud, DigitalOcean, supabase, upstash, Railway, Render, AWS, Azure, GCP, Scalingo, Clever Cloud, Hetzner, Cloudflare, Ngrok, repl  等部署环境)
    description: 总结一下本项目的主要技术
输出要求:
    使用English输出,格式如下, a json result could be parsed by JSON.parse().:
{
deps: [],
stacks: [],
infrastructures: [],
deployments: [],
languages: [],
description: "",
}
`;
export const getGPTSummary = async ({
    prompt,
    detail,
}: {
    prompt: string;
    detail: string;
}) => {
    const messages = [
        { role: 'system', content: prompt },
        {
            role: 'user',
            content: detail,
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
    let summary;
    // let retryCount = 0;
    // if (retryCount >= 3) {
    //     console.log(`Failed after ${retryCount} attempts`);
    //     return null;
    // }

    try {
        summary = JSON.parse(result.choices[0].message.content);
    } catch (e: any) {
        // retryCount++;
        console.log(summary);
        console.log(`Get gpt result with error: ${e}`);
        // return getGPTSummary({ prompt, detail });
    }

    return summary;
};

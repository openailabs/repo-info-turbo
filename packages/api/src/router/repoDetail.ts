import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getRepoDetailSchema } from "../../validators";
import { useGetSummary } from "../hooks/useGpt";
import { getRepoInfoFromGithub } from "../lib/githubApi";
// import { getRepoInfo } from "../lib/githubApi";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const resultSchema = z.object({
  owner: z.string(),
  name: z.string(),
  summary: z.unknown(),
  detail: z.unknown(),
});

export const resultUpdateSchema = z.object({
  id: z.number(),
  owner: z.string(),
  name: z.string(),
  summary: z.unknown(),
  detail: z.unknown(),
});

export const resultIdSchema = z.object({ id: z.number() });
export const repoSchema = z.object({ owner: z.string(), name: z.string() });

export const repoDetailRouter = createTRPCRouter({
  //POST
  saveRepo: publicProcedure.input(resultSchema).mutation(async (opts) => {
    const { owner, name, summary } = opts.input;

    // Check if a result with the same owner and name already exists
    const existingResult = await opts.ctx.db
      .selectFrom("Result")
      .select("id")
      .where("owner", "=", owner)
      .where("name", "=", name)
      .executeTakeFirst();

    if (existingResult) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "A result with the same id already exists",
      });
    }
    // Save repoInfo to DB
    const repoInfo = await getRepoInfoFromGithub({ owner, name });
    const resultId = await opts.ctx.db
      .insertInto("Result")
      .values({
        owner,
        name,
        summary: JSON.stringify(summary),
        detail: JSON.stringify(repoInfo),
      })
      .executeTakeFirstOrThrow();
    return resultId.insertId;
  }),
  //  GET
  getRepo: publicProcedure.input(repoSchema).query(async (opts) => {
    const { owner, name } = opts.input;

    // const payload = await opts.ctx.db
    //   .selectFrom("Result")
    //   // .selectAll()
    //   .select(["summary", "detail"])

    //   .where("owner", "=", owner)
    //   .where("name", "=", name)
    //   .execute();

    // const repo = await query.execute();
    console.log("Request with repo info: %s", owner, name);
    // Check if a result with the same owner and name already exists
    const existingResult = await opts.ctx.db
      .selectFrom("Result")
      .selectAll()
      .where("owner", "=", owner)
      .where("name", "=", name)
      .executeTakeFirst();

    if (existingResult) {
      console.log("Found existing result");

      return existingResult;
      // throw new TRPCError({
      //   code: "BAD_REQUEST",
      //   message: "A result with the same id already exists",
      // });
    }
    // Save repoInfo to DB
    const repoInfo = await getRepoInfoFromGithub({ owner, name });
    await opts.ctx.db
      .insertInto("Result")
      .values({
        owner,
        name,
        //summary: JSON.stringify(summary),
        detail: JSON.stringify(repoInfo),
      })
      .executeTakeFirstOrThrow();
    return { payload: repoInfo, repo: { owner, name } };
  }),

  //  GET summary from GPT if not exists
  getSummary: publicProcedure.input(repoSchema).query(async (opts) => {
    const { owner, name } = opts.input;

    console.log("Request with repo info: %s", owner, name);
    // Check if a result with the same owner and name already exists
    const existingResult = await opts.ctx.db
      .selectFrom("Result")
      .selectAll()
      .where("owner", "=", owner)
      .where("name", "=", name)
      .executeTakeFirst();

    if (!existingResult) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Record not exists",
      });
    }

    // GET
    const prompt = `你是一个资深开发工程师，我们正一起开发一个 github 分析类 google chrome extension，只需要列出结果，无需解释。如果没有相应的分析结果则写出: "N/A"
名词定义:

    TLF: project top level files
	DMF: dependency management file
	ENVFILES：从 TLF分析出env 文件 .env*
    DMFCONTENTS: dependency management file content

需求:
    根据TLF分析出依赖管理文件(DMF), 如: package.json, build.gradle, pom.xml, requirements.txt, Cargo.toml, go.mod, .env* 等
    根据DMF的内容(DMFCONTENTS)分析所使用的关键技术, 列出Stack，忽略清单: (打包，性能监控等结果的分析, eslint, prettier, testing 等类型)

结果字段说明:
    stack: (从dependency分析当前项目所使用的技术)
    infra: (从ENVFILES 分析本项目运行时所需要的基础环境, 如: mysql, redis, mongodb, postgresql etc.)
	spoken: (从.md 文件的文件名部分猜测，一般不带语言的为英文，带-ZH 或 -CN为简体中文)
    deployment: (建议可以部署在哪些云环境, 如: vercel(Node.js project only), zeabur(a docker recommanded depolyment environment), sealos, alibaba ecs, oci, IBM Cloud, DigitalOcean, supabase, upstash, Railway, Render, AWS, Azure, GCP, Scalingo, Clever Cloud, Hetzner, Cloudflare, Ngrok, repl  等部署环境)
    repo: 根据用户提供的github地址仅获取取组织或用户部分加上仓库名部分如: (owner/repo 的结果为 owner/repo)
    summary: 总结一下本项目的主要技术
    score: 结果可信度评分，如: 低=1，中=2，高=3，由于没有可用的 dmf 所以结果来自于顶层目录的内容分析，结果不一定精确
      1. 顶层目录里文件的分析结果
      2. 分析所有文件的结果
      3. dmf 分析结果
输出要求:
    使用English输出,格式如下, a json result could be parsed by JSON.parse().:
\`\`\`json
{
repo: "",
dmf: [],
stack: [],
infra: [],
deployment: [],
spoken: [], 
summary: "",
score: ""
}
\`\`\`
`;

    const repoInfo = JSON.stringify(existingResult.detail);

    let summary;
    console.log(existingResult.summary);
    const existsSummary = JSON.stringify(existingResult.summary);
    if (!existsSummary || existsSummary === null || existsSummary === "null") {
      console.log("Not  existsSummary ");
      summary = await useGetSummary({
        prompt,
        repoInfo,
      });

      // try {
      //   summary = JSON.parse(summary1.toString());
      // } catch (e) {
      //   console.log("Not a valid json response from gpt.");
      // }
      // console.log(summary);

      //TODO:  Update summary to DB
      await opts.ctx.db
        .updateTable("Result")
        .set({
          summary: JSON.stringify(summary),
        })
        .where("id", "=", existingResult.id)
        .execute();
    } else {
      console.log("existsSummary ", existsSummary);
      summary = existingResult.summary;
    }

    return { payload: summary, repo: { owner, name } };
  }),
  read2: publicProcedure.input(resultIdSchema).query(async (opts) => {
    const result = await opts.ctx.db
      .selectFrom("Result")
      .select(["id", "owner", "name", "summary", "detail"])
      .where("id", "=", opts.input.id)
      .executeTakeFirst();

    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Result not found",
      });
    }

    return result;
  }),

  update: publicProcedure.input(resultUpdateSchema).mutation(async (opts) => {
    const { id, owner, name, summary, detail } = opts.input;

    await opts.ctx.db
      .updateTable("Result")
      .set({
        owner,
        name,
        summary,
        detail,
      })
      .where("id", "=", id)
      .execute();
  }),

  delete: publicProcedure.input(resultIdSchema).mutation(async (opts) => {
    await opts.ctx.db
      .deleteFrom("Result")
      .where("id", "=", opts.input.id)
      .execute();
  }),

  list: publicProcedure.query(async (opts) => {
    const results = await opts.ctx.db
      .selectFrom("Result")
      .select(["id", "owner", "name", "summary", "detail"])
      .execute();

    return results;
  }),

  get: publicProcedure.input(getRepoDetailSchema).query(async (opts) => {
    const { owner, repoName } = opts.input;

    const payload = await opts.ctx.db
      .selectFrom("RepoDetail")
      .selectAll()
      .where("owner", "=", owner)
      .where("repoName", "=", repoName)
      .execute();

    // const repo = await query.execute();
    console.log("Request with repo info: %s", owner, repoName);

    return { payload, repo: { owner, repoName } };
  }),

  create2: publicProcedure.input(getRepoDetailSchema).mutation(async (opts) => {
    const { owner, repoName } = opts.input;
    console.log("Request with repo info: %s", owner, repoName);
    const repo = await opts.ctx.db.transaction().execute(async (trx) => {
      const file = await trx
        .insertInto("File")
        .values({
          name: "package.json",
        })

        // .returning("id") // only support postgresql like database so
        .executeTakeFirstOrThrow();

      const folder = await trx
        .insertInto("Folder")
        .values({
          name: "test folder",
        })

        // .returning("id") // only support postgresql like database so
        .executeTakeFirstOrThrow();

      // const tlf = await trx
      //   .insertInto("RepoTopLevelFile")
      //   .values({
      //     folders:[],
      //   })
      //   .returning("id")
      //   .executeTakeFirstOrThrow();
      console.log("Create folder, file: ", file.insertId, folder);
    });
    // console.log("Returnning:  ", repo);
    return { message: "success" };
  }),
});

import { getRepoDetailSchema } from "../../validators";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const repoDetailRouter = createTRPCRouter({
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

  create: publicProcedure.input(getRepoDetailSchema).mutation(async (opts) => {
    const { owner, repoName } = opts.input;
    console.log("Request with repo info: %s", owner, repoName);
    // const repo = await opts.ctx.db.transaction().execute(async (trx) => {
    //   const file = await trx
    //     .insertInto("File")
    //     .values({
    //       name: "package.json",
    //     })
    //     .returning("id")
    //     .executeTakeFirstOrThrow();
    //   const folder = await trx
    //     .insertInto("Folder")
    //     .values({
    //       name: "test folder",
    //     })
    //     .returning("id")
    //     .executeTakeFirstOrThrow();
    //   // const tlf = await trx
    //   //   .insertInto("RepoTopLevelFile")
    //   //   .values({
    //   //     folders:[],
    //   //   })
    //   //   .returning("id")
    //   //   .executeTakeFirstOrThrow();
    //   console.log(file, folder);
    // });
    return { message: "success" };
  }),
});

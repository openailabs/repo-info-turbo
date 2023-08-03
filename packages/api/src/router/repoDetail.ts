import { getRepoDetailSchema } from "../../validators";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const repoDetailRouter = createTRPCRouter({
  get: publicProcedure.input(getRepoDetailSchema).query(async (opts) => {
    const { owner, repoName } = opts.input;

    // const repo = await opts.ctx.db
    //   .selectFrom("RepoDetail")
    //   .selectAll()
    //   .execute();

    // const query = opts.ctx.db
    //   .selectFrom("RepoDetail")
    //   .selectAll()
    //   .where("owner", "=", owner);
    // // .where("repoName", "=", repoName);

    // const repo = await query.execute();
    console.log("Request with repo info: %s", owner, repoName);

    return { message: "OK" };
  }),

  get1: publicProcedure.input(getRepoDetailSchema).query(async (opts) => {
    const { owner, repoName } = opts.input;

    const query = opts.ctx.db
      .selectFrom("RepoDetail")
      .selectAll()
      .where("owner", "=", owner)
      .where("repoName", "=", repoName);

    const repo = await query.execute();

    return repo;
  }),
});

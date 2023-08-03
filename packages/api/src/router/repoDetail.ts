import { getRepoDetailSchema } from "../../validators";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const repoDetailRouter = createTRPCRouter({
  get: publicProcedure.input(getRepoDetailSchema).query(async (opts) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { owner, repoName } = opts.input;

    // Verify the user has access to the project
    const query = opts.ctx.db
      .selectFrom("RepoDetail")
      .selectAll()
      .where("owner", "=", owner)
      .where("repoName", "=", repoName);

    const repo = await query.execute();

    return repo;
  }),
});

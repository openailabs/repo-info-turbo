import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getRepoDetailSchema } from "../../validators";
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
  create: publicProcedure.input(resultSchema).mutation(async (opts) => {
    const { owner, name, summary, detail } = opts.input;

    // Check if a result with the same owner and name already exists
    const existingResult = await opts.ctx.db
      .selectFrom("Result")
      .select("id")
      .where("owner", "=", owner)
      .where("name", "=", name)
      .executeTakeFirst();

    // if (existingResult) {
    //   throw new TRPCError({
    //     code: "BAD_REQUEST",
    //     message: "A result with the same owner and name already exists",
    //   });
    // }

    if (existingResult) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "A result with the same id already exists",
      });
    }

    const resultId = await opts.ctx.db
      .insertInto("Result")
      .values({
        owner,
        name,
        summary: JSON.stringify(summary),
        detail: JSON.stringify(detail),
      })
      .executeTakeFirstOrThrow();
    return resultId.insertId;
  }),

  read: publicProcedure.input(repoSchema).query(async (opts) => {
    const { owner, name } = opts.input;

    const payload = await opts.ctx.db
      .selectFrom("Result")
      // .selectAll()
      .select(["summary", "detail"])

      .where("owner", "=", owner)
      .where("name", "=", name)
      .execute();

    // const repo = await query.execute();
    console.log("Request with repo info: %s", owner, name);

    return { payload, repo: { owner, name } };
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

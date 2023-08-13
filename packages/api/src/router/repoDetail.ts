/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { genId, prisma } from '@acme/db';
import type { RepoDetail as PrismaRepoDetail } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getRepoDetailSchema } from '../../validators';
// import type { GptSummaryType } from '../hooks/useGpt';
import { getGPTSummary, prompt } from '../hooks/useGpt';
import { getRepoDetailFromGithub } from '../lib/githubApi';
// import { getRepoInfo } from "../lib/githubApi";
import { createTRPCRouter, protectedApiProcedure } from '../trpc';

export type RepoDetail = PrismaRepoDetail;

const summarySchema = z.object({
    deps: z.array(z.string()).optional(),
    stacks: z.array(z.string()).optional(),
    infrastructures: z.array(z.string()).optional(),
    deployments: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    description: z.string().optional(),
});

const githubResultSchema = z.object({
    tlf: z.object({
        files: z.array(z.string()),
        folders: z.array(z.string()),
    }),
    contents: z.array(
        z.object({
            name: z.string(),
            content: z.string(),
        })
    ),
});
export type GithubResultType = z.infer<typeof githubResultSchema>;

export type GptSummaryType = z.infer<typeof summarySchema>;

export const repoDetailRouter = createTRPCRouter({
    getRepoDetail: protectedApiProcedure
        .input(getRepoDetailSchema)
        .query(async (opts): Promise<RepoDetail | null> => {
            const { owner, name } = opts.input;
            const createdBy = opts.ctx.apiKey.clerkUserId;
            try {
                const now = new Date();
                const repoDetail = await prisma.repoDetail.upsert({
                    where: { owner_name: { owner, name } },
                    update: {},
                    create: {
                        id: genId(),
                        owner,
                        name,
                        summary: {},
                        detail: JSON.stringify(
                            await getRepoDetailFromGithub({ owner, name })
                        ),
                        createdBy,
                        createdAt: now,
                    },
                });
                return {
                    ...repoDetail,
                    detail: JSON.parse(repoDetail.detail as string),
                    summary: JSON.parse(repoDetail.summary as string),
                };
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Get repo detail failed',
                    cause: error,
                });
            }
        }),

    getSummary: protectedApiProcedure
        .input(getRepoDetailSchema)
        .query(async (opts): Promise<GptSummaryType | null> => {
            const { owner, name } = opts.input;
            try {
                const repoDetailFound =
                    await prisma.repoDetail.findFirstOrThrow({
                        where: { owner, name },
                    });
                if (!repoDetailFound) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Repo detail not found',
                    });
                }
                //ensure the repo detail found
                if (
                    repoDetailFound.summary &&
                    // repoDetailFound.summary !== '' &&
                    repoDetailFound.summary !== null &&
                    // repoDetailFound.summary !== 'null' &&
                    JSON.stringify(repoDetailFound.summary) !== '{}'
                ) {
                    console.log(
                        'Found with summary: ',
                        repoDetailFound.summary
                    );
                    return JSON.parse(repoDetailFound.summary as string);
                } else {
                    const detailToFeed = repoDetailFound?.detail;
                    console.log(
                        `No summary found, we are going to get summary from GPT ${detailToFeed}`
                    );
                    console.log(
                        `No summary found, we are going to get summary from GPT ${JSON.stringify(
                            detailToFeed
                        )}`
                    );

                    //serializeGithubResult(
                    //     await getRepoDetailFromGithub({ owner, name })
                    // ) as Prisma.InputJsonValue,
                    const aiSummary = await getGPTSummary({
                        prompt,
                        detail: JSON.stringify(detailToFeed),
                    });

                    const updated = await prisma.repoDetail.update({
                        data: {
                            //
                            //TODO testing which one is working fine
                            // summary: aiSummary,
                            summary: JSON.stringify(aiSummary),
                        },
                        where: {
                            id: repoDetailFound.id,
                        },
                    });
                    return JSON.parse(updated.summary as string);
                }
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Get summary failed',
                    cause: error,
                });
            }
        }),
});

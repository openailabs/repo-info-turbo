/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { genId, prisma } from '@acme/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getRepoDetailSchema, saveRepoDetailSchema } from '../../validators';
import { getGPTSummary, prompt } from '../hooks/useGpt';
import { getRepoDetailFromGithub } from '../lib/githubApi';
// import { getRepoInfo } from "../lib/githubApi";
import {
    createTRPCRouter,
    protectedApiProcedure,
    publicProcedure,
} from '../trpc';

export const repoDetailRouter = createTRPCRouter({
    getRepoDetail: protectedApiProcedure
        .input(getRepoDetailSchema)
        .query(async (opts) => {
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
                return repoDetail;
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
        .query(async (opts) => {
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
                    repoDetailFound.summary !== '' &&
                    repoDetailFound.summary !== null &&
                    repoDetailFound.summary !== 'null' &&
                    JSON.stringify(repoDetailFound.summary) !== '{}'
                ) {
                    console.log(
                        'Found with summary: ',
                        repoDetailFound.summary
                    );
                    return repoDetailFound.summary;
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
                    return updated.summary;
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

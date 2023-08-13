/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { genId, prisma } from '@acme/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, protectedApiProcedure } from '../trpc';

export const saveMarkSchema = z.object({
    id: z.string().max(30).nullable(),
    owner: z.string(),
    name: z.string(),
    tags: z
        .array(
            z.object({
                id: z.string().nullable(),
                text: z.string().nullable(),
            })
        )
        .nullable(),
    note: z.string().nullable(),
});

export const getMarkSchema = z.object({
    owner: z.string(),
    name: z.string(),
});

const tagsZodSchema = z.object({
    id: z.string().nullable(),
    text: z.string().nullable(),
});

export const selectedMarkSchema = z.object({
    id: z.string().max(30).nullable(),
    tags: z
        .array(
            z.object({
                id: z.string().nullable(),
                text: z.string().nullable(),
            })
        )
        .nullable(),
    note: z.string().nullable(),
});
export type MarkSelectedType = z.infer<typeof selectedMarkSchema>;
export type TagsType = z.infer<typeof tagsZodSchema>;

export const markRouter = createTRPCRouter({
    getMark: protectedApiProcedure
        .input(getMarkSchema)
        .query(async (opts): Promise<MarkSelectedType> => {
            const { owner, name } = opts.input;
            const userId = opts.ctx.apiKey.clerkUserId;
            try {
                const markFound = await prisma.mark.findFirst({
                    select: { id: true, tags: true, note: true },
                    where: { owner, name, userId },
                });
                if (!markFound) {
                    return { id: '', note: '', tags: [] };
                    // throw new TRPCError({
                    //     code: 'OK',
                    //     message: 'Item not found',
                    //     cause: 'The item you requested was not found',
                    // });

                    // return {
                    //     ...repoDetail,
                    //     detail: JSON.parse(repoDetail.detail as string),
                    //     summary: JSON.parse(repoDetail.summary as string),
                    // };
                } else {
                    return {
                        ...markFound,
                        tags: JSON.parse(markFound.tags as string),
                    };
                }
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Get mark failed',
                    cause: error,
                });
            }
        }),

    saveMark: protectedApiProcedure
        .input(saveMarkSchema)
        .mutation(async (opts) => {
            const { owner, name, tags, note } = opts.input;

            const userId = opts.ctx.apiKey.clerkUserId;

            let idPosted = opts.input.id;
            if (!idPosted) {
                idPosted = '';
            }
            console.log(
                'saveMark with data',
                owner,
                name,
                tags,
                note,
                idPosted
            );
            try {
                const upserted = await prisma.mark.upsert({
                    where: { id: idPosted, owner, name, userId },
                    update: {
                        id: idPosted,
                        owner,
                        name,
                        userId,
                        tags: JSON.stringify(tags),
                        note,
                        lastModifiedAt: new Date(),
                    },
                    create: {
                        id: genId(),
                        owner,
                        name,
                        userId,
                        tags: JSON.stringify(tags),
                        note,
                    },
                });
                return { id: upserted.id };
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Upsert mark operation failed',
                    cause: error,
                });
            }
        }),
});

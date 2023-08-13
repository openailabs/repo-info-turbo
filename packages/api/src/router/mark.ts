/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { genId, prisma } from '@acme/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, protectedApiProcedure } from '../trpc';

export const saveMarkSchema = z.object({
    id: z.string().max(30).optional(),
    owner: z.string(),
    name: z.string(),
    tags: z.array(z.string()).optional(),
    note: z.string().optional(),
});

export const getMarkSchema = z.object({
    owner: z.string(),
    name: z.string(),
});

export const markRouter = createTRPCRouter({
    getMark: protectedApiProcedure.input(getMarkSchema).query(async (opts) => {
        const { owner, name } = opts.input;
        const userId = opts.ctx.apiKey.clerkUserId;

        try {
            const markFound = await prisma.mark.findFirst({
                select: { id: true, tags: true, note: true },
                where: { owner, name, userId },
            });
            if (!markFound) {
                return { message: 'NotFound' };
            } else {
                return markFound;
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
            console.log('saveMark with data');
            const { owner, name, tags, note } = opts.input;

            const userId = opts.ctx.apiKey.clerkUserId;

            let idPosted = opts.input.id;
            if (!idPosted) {
                idPosted = '';
            }
            try {
                await prisma.mark.upsert({
                    where: { id: idPosted, owner, name, userId },
                    update: {
                        id: idPosted,
                        owner,
                        name,
                        userId,
                        tags,
                        note,
                        lastModifiedAt: new Date(),
                    },
                    create: {
                        id: genId(),
                        owner,
                        name,
                        userId,
                        tags,
                        note,
                    },
                });
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Upsert mark operation failed',
                    cause: error,
                });
            }
        }),
});

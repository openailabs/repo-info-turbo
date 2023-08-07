import { z } from 'zod';

import { createTRPCRouter, protectedApiProcedure } from '../trpc';

export const saveNoteSchema = z.object({
  id: z.number(),
  owner: z.string(),
  name: z.string(),
  userId: z.string(),
  note: z.unknown(),
});

export const noteRouter = createTRPCRouter({
  saveNote: protectedApiProcedure.input(saveNoteSchema).mutation(async opts => {
    const { id, owner, name, note, userId } = opts.input;

    await opts.ctx.db
      .updateTable('Note')
      .set({
        owner,
        name,
        userId,
        note,
      })
      .where('id', '=', id)
      .execute();
  }),
});

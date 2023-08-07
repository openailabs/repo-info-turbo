import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export const useSaveOrUpdateNote = async ({ owner, repoName }) => {
    const saveNote = trpc.note.saveNote.useMutation();
    const repo = `${owner}/${repoName}`;
    saveNote.mutate({
        owner: owner,
        name: repoName,
        userId: 'user_2TTGbqMLZKHmguECRbXcb8TeuMX',
        note: {
            tags: ['node.js', 'next.js', 'next-auth'],
            content: 'This is a good repo',
        },
    });
    return { useSaveOrUpdateNote };
};

// const {saveOrUpdateNote}= useSaveNote();

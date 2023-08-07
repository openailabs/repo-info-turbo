import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export const useUpsertNote = ({ owner, repoName, note }) => {
    const noteMutation = trpc.note.saveNote.useMutation();
    const repo = `${owner}/${repoName}`;

    const handleUpsertNote = () => {
        noteMutation.mutate({
            id: 1,
            owner: owner,
            name: repoName,
            userId: 'user_2TTGbqMLZKHmguECRbXcb8TeuMX',
            note,
        });
    };
    return { handleUpsertNote, noteMutation };
};

// const {saveOrUpdateNote}= useSaveNote();

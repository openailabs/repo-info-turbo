import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export const useUpsertMark = ({ id, owner, name, tags, note }) => {
    const noteMutation = trpc.mark.saveMark.useMutation();

    const handleUpsertMark = () => {
        noteMutation.mutate({
            id,
            owner,
            name,
            tags,
            note,
        });
    };
    return { handleUpsertMark, noteMutation };
};

// const {saveOrUpdateMark}= useSaveNote();

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

export const useGetMark = ({
    owner,
    repoName,
    enabled,
}: {
    owner: string;
    repoName: string;
    enabled: boolean;
}) => {
    const {
        data: mark,
        isFetching,
        status,
        isLoading,
    } = trpc.mark.getMark.useQuery(
        {
            owner: owner,
            name: repoName,
        },
        {
            enabled: enabled,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            networkMode: 'online',
            keepPreviousData: true,
            retry: 3,
            // refetchInterval: LONG_REFETCH_INTERVAL,
            staleTime: 900000, // 15 mins
            cacheTime: 3600000, // 1hr
        }
    );
    const loaded = status === 'success' && !isFetching;

    return { mark, loaded };
};

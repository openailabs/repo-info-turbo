import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export const useSaveRepo = () => {
    const saveRepoDetail = trpc.repoDetail.saveRepo.useMutation();

    const createDataHandler = async ({ owner, repoName }) => {
        const repo = `${owner}/${repoName}`;
        saveRepoDetail.mutate({
            owner: owner,
            name: repoName,
            summary: {
                repo: repo,
                dmf: ['package.json'],
                stack: ['zustand'],
                infra: ['upstash', 'supabase'],
                deployment: ['vercel', 'zeabur'],
                summary: 'angular official repo',
                score: '3',
            },
            detail: {
                tlf: {
                    folders: ['prisma', 'public', 'src', 'types'],
                    files: [
                        '.env.local.demo',
                        '.eslintrc.json',
                        '.gitignore',
                        'CHANGE_LOG.md',
                        'CHANGE_LOG.zh_CN.md',
                        'LICENSE',
                        'README.md',
                        'README_CN.md',
                        'next.config.js',
                        'package-lock.json',
                        'package.json',
                        'pnpm-lock.yaml',
                        'postcss.config.js',
                        'sentry.client.config.js',
                        'sentry.edge.config.js',
                        'sentry.properties',
                        'sentry.server.config.js',
                        'tailwind.config.js',
                        'tsconfig.json',
                        'vercel.json',
                    ],
                },
                contents: [
                    {
                        name: '.env.local.demo',
                        content:
                            'NEXT_PUBLIC_OPENAI_API_KEY=\nNEXT_PUBLIC_OPENAI_API_PROXY=\n\nNEXT_PUBLIC_AZURE_OPENAI_API_KEY=\nNEXT_PUBLIC_AZURE_OPENAI_RESOURCE_NAME=\nNEXT_AZURE_OPENAI_API_VERSION=\n\nNEXT_PUBLIC_SENTRY_DSN=\n\n\n\nDATABASE_URL=\n\nEMAIL_SERVER_HOST=\nEMAIL_SERVER_PORT=\nEMAIL_SERVER_USER=\nEMAIL_SERVER_PASSWORD=\nEMAIL_FROM=\nEMAIL_SECRET=\n\nGITHUB_ID=\nGITHUB_SECRET=\n\nGOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\n\nUPSTASH_REDIS_REST_URL=\nUPSTASH_REDIS_REST_TOKEN=',
                    },
                    {
                        name: 'package.json',
                        content: '',
                    },
                ],
            },
        });
    };

    return { createDataHandler };
};
// const {createDataHandler}= useSaveRepo();

// read repoDetail from database
export const useGetRepoDetail = ({ owner, repoName }) => {
    const [showDetail, toggleShowDetail] = useState(false);
    const [canRead, setCanRead] = useState(false);

    const { data: repoDetail, isFetching } = trpc.repoDetail.getRepo.useQuery(
        {
            owner: owner,
            name: repoName,
        },
        {
            enabled: canRead,
            refetchOnWindowFocus: false,
            onSuccess: () => toggleShowDetail(true),
        }
    );

    const handleClick = () => {
        setCanRead(true);
        toggleShowDetail(!showDetail);
    };
    // const hasSummaryInDb =
    //   repoDetail && repoDetail.summary && repoDetail.summary !== null;
    const loading = (isFetching && !showDetail && !canRead) || isFetching;

    return { repoDetail, showDetail, handleClick, loading };
};

export const useGetSummary = ({
    owner,
    repoName,
}: {
    owner: string;
    repoName: string;
}) => {
    const [canRead, setCanRead] = useState(false);

    const {
        data: summary,
        isFetching,
        status,
        isLoading,
    } = trpc.repoDetail.getSummary.useQuery(
        {
            owner: owner,
            name: repoName,
        },
        {
            enabled: canRead,
            refetchOnWindowFocus: false,
        }
    );
    const loaded = status === 'success' && !isFetching;
    const loading = (isFetching && !canRead) || isFetching;
    const handleSummaryClick = () => {
        setCanRead(true);
    };

    return { summary, handleSummaryClick, canRead, loaded, loading };
};

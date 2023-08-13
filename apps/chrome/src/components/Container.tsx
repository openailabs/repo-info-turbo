'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useGetRepoDetail } from '@/hooks/repo';
import React, { useEffect, useRef, useState } from 'react';
import Detail from './Detail';
import Mark from './Mark';
import payload from './repo.json';
import SummaryContainer from './SummaryContainer';
import TagInput from './TagInput';

type Props = {
    owner: string;
    repoName: string;
};

const Container = ({ owner, repoName }: Props) => {
    const { showDetail, loading, handleClick, repoDetail } = useGetRepoDetail({
        owner,
        repoName,
    });
    //const showSummary = !loading && showDetail && !hasSummaryInDb;
    const showSummary = !loading && showDetail;

    return (
        <div className="mx-auto flex w-[80vw] gap-6 flex-wrap">
            <Detail owner={owner} repoName={repoName} />
            <div className="space-y-6 flex-1">
                {showSummary && (
                    <SummaryContainer owner={owner} repoName={repoName} />
                )}

                <Mark owner={owner} repoName={repoName} enabled={showDetail} />
            </div>
        </div>
    );
};

export default Container;

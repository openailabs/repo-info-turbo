import { useGetSummary } from '@/hooks/repo';
import React from 'react';
import { Button } from './ui/button';

const Summary = ({ owner, repoName }) => {
    const { handleSummaryClick, summary, loaded, loading } = useGetSummary({
        owner,
        repoName,
    });
    return (
        <div className="w-full">
            <Button disabled={loading || loaded} onClick={handleSummaryClick}>
                Get Summary
            </Button>
            {summary && <div>Summary: {loaded && JSON.stringify(summary)}</div>}
        </div>
    );
};

export default Summary;

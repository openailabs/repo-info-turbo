import { useGetSummary } from '@/hooks/repo';
import React from 'react';

const Summary = ({ owner, repoName }) => {
    const { handleSummaryClick, summary, loaded, loading } = useGetSummary({
        owner,
        repoName,
    });
    return (
        <div className="w-full">
            <div className="w-full">
                <button
                    disabled={loading || loaded}
                    onClick={handleSummaryClick}
                    className="z-50 m-0 inline-block h-10 w-full rounded-sm bg-pink-600 text-sm text-white transition-colors ease-linear hover:bg-pink-800 disabled:cursor-not-allowed"
                >
                    Get Summary
                </button>
            </div>
            {summary && <div>Summary: {loaded && JSON.stringify(summary)}</div>}
        </div>
    );
};

export default Summary;

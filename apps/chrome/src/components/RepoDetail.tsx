import { Button } from '@/components/ui/button';
import { useGetRepoDetail } from '@/hooks/repo';
import React from 'react';
import Note from './Note';
// import Note from './Note';
import Summary from './Summary';

type Props = {
    owner: string;
    repoName: string;
};

const RepoDetail = ({ owner, repoName }: Props) => {
    const { showDetail, loading, handleClick, repoDetail } = useGetRepoDetail({
        owner,
        repoName,
    });
    //const showSummary = !loading && showDetail && !hasSummaryInDb;
    const showSummary = !loading && showDetail;
    const ButtonText = () => {
        let text = 'Show Details';
        if (!showDetail) {
            text = 'Show Details';
        } else if (loading) {
            text = 'Loading...';
        } else {
            text = 'Hide Details';
        }
        return <span>{text}</span>;
    };
    return (
        <div className="w-full">
            <Button
                disabled={loading}
                variant="secondary"
                onClick={handleClick}
            >
                <ButtonText />
            </Button>

            {showSummary && <Summary owner={owner} repoName={repoName} />}

            {showDetail && repoDetail && (
                <>
                    <Note owner={owner} repoName={name} />

                    <div>
                        Repo detail: {JSON.stringify(repoDetail, null, 2)}
                    </div>
                </>
            )}
        </div>
    );
};

export default RepoDetail;

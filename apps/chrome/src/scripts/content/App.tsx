// import Note from '@/components/Note';
import Container from '@/components/Container';
import RepoDetail from '@/components/RepoDetail';
import SummaryContainer from '@/components/SummaryContainer';
import { Repo } from '@/types';
import { TRPCProvider } from '@/utils/trpc';
import React from 'react';

const App = ({ owner, name }: Repo) => {
    return (
        <TRPCProvider>
            <div className="h-auto w-full">
                <Container owner={owner} repoName={name} />
            </div>
        </TRPCProvider>
    );
};

export default App;

import React from 'react';
import RepoDetail from '@/components/RepoDetail';
import { Repo } from '@/types';
import { TRPCProvider } from '@/utils/trpc';

const App = ({ owner, name }: Repo) => {
  return (
    <TRPCProvider>
      <div className="h-auto w-full">
        <RepoDetail owner={owner} repoName={name} />
      </div>
    </TRPCProvider>
  );
};

export default App;

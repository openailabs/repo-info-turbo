import React from "react";
import RepoDetail from "@/components/RepoDetail";
import Summary from "@/components/Summary";
import { Repo } from "@/types";
import { TRPCProvider } from "@/utils/trpc";

const App = ({ owner, name }: Repo) => {
  return (
    <TRPCProvider>
      <div className="flex h-auto w-full items-end justify-end bg-red-700">
        <RepoDetail owner={owner} repoName={name} />
        <Summary owner={owner} repoName={name} />
      </div>
    </TRPCProvider>
  );
};

export default App;

import React, { useState } from "react";
import Box from "@/components/Box";
import Container from "@/components/Container";
import RepoInfo from "@/components/RepoInfo";
import RepoInfo1 from "@/components/RepoInfo1";
import ShowData from "@/components/ShowData";
import ToggleDetail from "@/components/ToggleDetail";
import getRepo from "@/helpers/get-repo";
import styles from "@/styles/index.css?inline";
import { Repo } from "@/types";
import { TRPCProvider } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

const App = ({ owner, name }: Repo) => {
  return (
    <TRPCProvider>
      <div className="h-[400px] w-full bg-red-700">
        {/* <ToggleDetail clickHandler={clickHandler} /> */}
        {/* <Box /> */}
        {/* No QueryClient set, use QueryClientProvider to set one */}
        <ShowData owner={owner} repoName={name} />

        {/* <RepoInfo1 /> */}
      </div>
    </TRPCProvider>
  );
};

export default App;

import React from "react";
import Box from "@/components/Box";
import Container from "@/components/Container";
import RepoInfo from "@/components/RepoInfo";
import RepoInfo1 from "@/components/RepoInfo1";
import ShowData from "@/components/ShowData";
import ToggleDetail from "@/components/ToggleDetail";
import getRepo from "@/helpers/get-repo";
import styles from "@/styles/index.css?inline";
import { Repo } from "@/types";

const App = ({ owner, name }: Repo) => {
  // const App = (props: any) => {
  // const { owner, name } = props;

  const clickHandler = () => {
    console.log("Owner: %s repo: %s", owner, name);
    // console.log("click handler");
  };
  return (
    <>
      <div className="h-[400px] w-full bg-red-700">
        {/* <ToggleDetail clickHandler={clickHandler} /> */}
        {/* <Box /> */}
        {/* No QueryClient set, use QueryClientProvider to set one */}
        <ShowData owner={owner} repo={name} />

        {/* <RepoInfo1 /> */}
      </div>
    </>
  );
};

export default App;

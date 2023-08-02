import React from "react";
import Box from "@/components/Box";
import RepoInfo from "@/components/RepoInfo";
import RepoInfo1 from "@/components/RepoInfo1";
import ToggleDetail from "@/components/ToggleDetail";
import getRepo from "@/helpers/get-repo";
import styles from "@/styles/index.css?inline";
import { Repo } from "@/types";

const App = ({ owner, name }: Repo) => {
  // const App = (props: any) => {
  // const { owner, name } = props;

  const clickHandler = () => {
    console.log("Repo ", owner, name);
    console.log("click handler");
  };
  return (
    <>
      <style>{styles.toString()}</style>
      <div className="h-32 w-full bg-red-700">
        <ToggleDetail clickHandler={clickHandler} />
        {/* <RepoInfo1 /> */}
      </div>
    </>
  );
};

export default App;

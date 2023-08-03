import React, { useEffect, useState } from "react";
import { ProjectTypeProps } from "@/types";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

import { getRepoDetailSchema } from "@acme/api/validators";

import CreateDataTest from "./CreateDataTest";
import RepoInfo from "./RepoInfo";
import ToggleDetail from "./ToggleDetail";

type ShowDataProps = {
  owner: string;
  repoName: string;
};
const ShowData = ({ owner, repoName }: ShowDataProps) => {
  const [showDetail, setShowDetail] = useState(false);

  const creator = trpc.repoDetail.create.useMutation();

  const { data } = trpc.repoDetail.get.useQuery(
    {
      owner,
      repoName,
    },
    { enabled: showDetail, refetchOnWindowFocus: false },
  );

  const clickHandler = async () => {
    console.log("Show detail? ", showDetail);
    setShowDetail(true);
  };

  const createDataHandler = async () => {
    creator.mutate({ owner: "Frodo", repoName: "aabbb" });
  };

  return (
    <div>
      <ToggleDetail clickHandler={clickHandler} />
      <CreateDataTest clickHandler={createDataHandler} />
      {JSON.stringify(data)}
    </div>
  );
};

export default ShowData;

{
  /* <div className="relative h-[200px] w-full ">
  <ToggleDetail clickHandler={clickHandler} />
  <div className="flex justify-between">
    <div className="h-[200px] max-h-[200px] w-1/3 overflow-auto">
      <div className="p-4">
        <ul className="space-y-2">
          {data?.tlf?.folders.map((folder, index) => (
            <li key={index}>📁 {folder}</li>
          ))}
          {data?.tlf?.files.map((file, index) => (
            <li key={index}>📄 {file}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="w-2/3">
      {data?.contents.map((content, index) => (
        <div key={index}>
          <div>{content.name}</div>
          <div>{content.content}</div>
        </div>
      ))}
    </div>
  </div>
</div>; */
}

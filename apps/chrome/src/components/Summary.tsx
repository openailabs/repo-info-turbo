import React from "react";
import { useGetRepoDetail, useGetSummary } from "@/hooks/repo";

type Props = {
  owner: string;
  repoName: string;
};

const Summary = ({ owner, repoName }: Props) => {
  const { summary, handleSummaryClick } = useGetSummary({
    owner,
    repoName,
  });

  return (
    <div className="w-full bg-purple-400">
      <button
        // disabled={loadingSummary}
        className="z-50 m-0 inline-block h-10 w-40 rounded-sm bg-yellow-600 text-sm text-white transition-colors ease-linear hover:bg-yellow-800 disabled:cursor-not-allowed"
        onClick={handleSummaryClick}
      >
        Summary
      </button>
      {summary && <>{summary}</>}
    </div>
  );
};

export default Summary;

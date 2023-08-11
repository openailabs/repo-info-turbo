import { useGetRepoDetail } from '@/hooks/repo';
import React from 'react';
import Note from './Note';
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
            <button
                disabled={loading}
                className="z-50 m-0 inline-block h-10 w-full rounded-sm bg-blue-600 text-sm text-white transition-colors ease-linear hover:bg-blue-800 disabled:cursor-not-allowed"
                onClick={handleClick}
            >
                <ButtonText />
            </button>
            {showSummary && <Summary owner={owner} repoName={repoName} />}
            {/* <Summary owner={owner} repoName={repoName} /> */}
            {showDetail && repoDetail && (
                <>
                    <Note owner={owner} repoName={name} />
                    {/* <Note owner={owner} repoName={repoName} /> */}
                    <div>
                        Repo detail: {JSON.stringify(repoDetail, null, 2)}
                        {/* {JSON.stringify(repoDetail, null, 2)} */}
                        {/* <div className="flex justify-between">
              <div className="h-[200px] max-h-[200px] w-1/3 overflow-auto">
                <div className="p-4">
                  <ul className="space-y-2">
                    {repoDetail?.detail?.tlf?.folders.map((folder, index) => (
                      <li key={index}>📁 {folder}</li>
                    ))}
                    {repoDetail?.detail?.tlf?.files.map((file, index) => (
                      <li key={index}>📄 {file}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div> */}
                    </div>
                </>
            )}
        </div>
    );
};

export default RepoDetail;

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

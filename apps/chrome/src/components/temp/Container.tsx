import { ProjectTypeProps } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import RepoInfo from './RepoInfo';
import ToggleDetail from './ToggleDetail';

//body > div.logged-in.env-production.page-responsive > div.application-main > main > react-app > div > div > div > div > div > main > div > div > div > div > div > div > div > div > div > div.search-title > div > a > span
//repo name: div.search-title > div > a > span

const fetchContent = async (owner: string, repo: string) => {
    console.log('Owner: %s/%s', owner, repo);
    // const content = await fetch('https://jsonplaceholder.typicode.com/posts', {
    // const content = await fetch('https://chatwp.vercel.app/api/github/getProjectDetail', {
    const content = await fetch(
        'http://localhost:4012/api/github/getProjectDetail',
        {
            method: 'POST',
            // headers:{
            //     "Content-Type":"application/json",
            //     "Accept":"application/json"
            // },
            body: JSON.stringify({ owner, repo }),
        }
    );
    return await content.json();
};

const Container = ({ owner, repo }: ProjectTypeProps) => {
    const [canFetch, setCanFetch] = useState({ owner: null, repo: null });

    const clickHandler = () => {
        setCanFetch({ owner, repo });
    };

    const { isLoading, status, isError, isSuccess, data, error } = useQuery(
        [`${owner}/${repo}`],
        () => fetchContent(owner, repo),
        {
            enabled: canFetch.owner === owner && canFetch.repo === repo,
        }
    );
    console.log(data);

    return (
        <>
            <div className="relative h-[200px] w-full ">
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
            </div>
            {/* <div>
                {status === 'loading' && !canFetch ? (
                    'Loading...'
                ) : status === 'error' ? (
                    <span>Error: 'Unable to fetch'</span>
                ) : (
                    <>
                        <div>
                            <RepoInfo data={data} />
                        </div>
                    </>
                )}
            </div> */}
        </>
    );
};

export default Container;

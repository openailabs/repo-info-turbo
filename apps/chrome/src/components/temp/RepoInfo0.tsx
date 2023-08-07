// import '../pages/ContentScripts/main.css'
import styles from '@/styles/index.css?inline';
import { ProjectInfoProps } from '@/types';
import React from 'react';

//body > div.logged-in.env-production.page-responsive > div.application-main > main > react-app > div > div > div > div > div > main > div > div > div > div > div > div > div > div > div > div.search-title > div > a > span
//repo name: div.search-title > div > a > span

const RepoInfo0 = (data: any) => {
    return (
        <>
            <div className="flex">
                <div className="h-[500px] max-h-[500px] w-[400px] overflow-x-auto  ">
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
                {/* <div className="w-9/12 p-4 space-y-2">
                    <p>
                        <b>Dmf: </b>
                        <pre>{summary.dmf}</pre>
                    </p>

                    <p>
                        <b>Infra: </b>
                        {summary.infra}
                    </p>
                    <p>
                        <b>Deploy:</b> {summary.deployment}
                    </p>
                    <p>
                        <b>Summary: </b> {summary.summary}
                    </p>
                    <p>
                        <b>Stack: </b>
                        {summary.stack.map(item => (
                            <>
                                <pre>{item}</pre>
                            </>
                        ))}
                    </p>
                </div> */}
            </div>
        </>
    );
};

export default RepoInfo0;

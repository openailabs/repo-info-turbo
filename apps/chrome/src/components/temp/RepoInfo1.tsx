// import '../pages/ContentScripts/main.css'
import styles from '@/styles/index.css?inline';
import React from 'react';

export interface TlfProps {
    folders: string[];
    files: string[];
}

export interface ProjectStructureProps {
    tlf: TlfProps;
}

export interface ProjectInfoProps {
    structure: ProjectStructureProps;
    summary: AiSummaryResult;
}

export interface AiSummaryResult {
    repo: string;
    dmf: string[];
    stack: string[];
    infra: string[];
    deployment: string[];
    summary: string;
    score: number;
}

const RepoInfo1 = () => {
    // console.log(JSON.stringify(summary.summary));

    const closeClick = () => {
        console.log('close clicked.');
    };
    return (
        <>
            {/* {<style>{styles.toString()}</style>} */}
            <div className="">
                <div className="inline-flex h-10 w-[600px] items-center justify-center rounded-full pl-28">
                    <div className="inline-flex items-center justify-end rounded-full bg-gradient-to-r from-fuchsia-700 to-blue-400 p-2">
                        <div className="inline-flex flex-col justify-center gap-2 self-stretch px-4">
                            <div className="text-normal font-normal leading-tight tracking-wider text-white">
                                Hey, this is an overlay from the Content script,
                                built with React and Tailwind. Happy Building!
                            </div>
                        </div>
                        <div className="hover:bg-gothamBlack-50 inline-flex cursor-pointer items-start justify-start self-stretch rounded-full bg-white p-4 px-8 duration-200">
                            <div
                                className="text-center text-base font-bold text-black"
                                onClick={closeClick}
                            >
                                Close
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RepoInfo1;

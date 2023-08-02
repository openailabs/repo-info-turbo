import React from 'react'

// import '../pages/ContentScripts/main.css'
import styles from '@/styles/index.css?inline'

export interface TlfProps {
    folders: string[]
    files: string[]
}

export interface ProjectStructureProps {
    tlf: TlfProps
}

export interface ProjectInfoProps {
    structure: ProjectStructureProps
    summary: AiSummaryResult
}

export interface AiSummaryResult {
    repo: string
    dmf: string[]
    stack: string[]
    infra: string[]
    deployment: string[]
    summary: string
    score: number
}

const RepoInfo1 = (props: ProjectInfoProps) => {
    const { structure, summary } = props

    // console.log(JSON.stringify(summary.summary));

    return (
        <>
            {<style>{styles.toString()}</style>}
            <div className="fixed bottom-0 right-0 p-4">
                <div className="inline-flex items-center justify-center h-16 rounded-full">
                    <div className="inline-flex items-center justify-end p-2 rounded-full bg-gradient-to-r from-fuchsia-700 to-blue-400">
                        <div className="inline-flex flex-col self-stretch justify-center gap-2 px-4">
                            <div className="font-normal leading-tight tracking-wider text-white text-normal">
                                Hey, this is an overlay from the Content script, built with React
                                and Tailwind. Happy Building!
                            </div>
                        </div>
                        <div className="inline-flex items-start self-stretch justify-start p-4 px-8 duration-200 bg-white rounded-full cursor-pointer hover:bg-gothamBlack-50">
                            <div className="text-base font-bold text-center text-black">Close</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RepoInfo1

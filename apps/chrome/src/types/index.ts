export type ProjectTypeProps = {
    owner: string
    repo: string
}




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

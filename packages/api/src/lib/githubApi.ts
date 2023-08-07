// import { Octokit } from "@octokit/rest";
import NodeCache from 'node-cache';
import fetch from 'node-fetch';

// Define configuration parameters
const includedFileMatchPattern: any =
    process.env.INCLUDED_FILE_MATCH_PATTERN || '.env.*';
const dmfTtl: any = process.env.DMF_TTL || 24 * 60 * 60; // cache for 24 Hours
const fileDownloadLimitSize: any =
    new Number(process.env.FILE_DOWNLOAD_LIMIT_SIZE) || 40000;
const dmfCache = new NodeCache({ stdTTL: dmfTtl });

const dmfUrl: string =
    process.env.DMF_URL ||
    // 'https://raw.githubusercontents.com/dmfos/dmf/main/dmfs.json';
    'https://raw.gitmirror.com/dmfos/dmf/main/dmfs.json';
// Define interface for Framework
interface Framework {
    name: string;
    dmf: string;
    extras: string[];
}
// Define interface for DMF
interface DMF {
    language: string;
    frameworks: Framework[];
}
// Define interface for TLF
export interface TLF {
    type: string;
    size: number;
    name: string;
    download_url: string;
}
// Define interface for ContentItem
export interface ContentItem {
    name: string;
    content: string;
}
// Define interface for TlfType
export interface TlfType {
    files: string[];
    folders: string[];
}
// Define interface for Result
export interface Result {
    tlf: TlfType;
    contents: ContentItem[];
}
// Function to fetch DMFs
export const fetchDMFs = async (): Promise<DMF[]> => {
    const response = await fetch(dmfUrl);
    const dmfs: DMF[] = await response.json();
    return dmfs;
};
// Function to fetch DMFs with caching
export const fetchDMFsCached = async (): Promise<DMF[]> => {
    const cacheKey = 'dmfs';
    let dmfs = dmfCache.get<DMF[]>(cacheKey);
    if (!dmfs) {
        dmfs = await fetchDMFs();
        dmfCache.set(cacheKey, dmfs);
    }
    return dmfs;
};

// const agent = new HttpProxyAgent(
//   /* credentials */
//   "http://localhost:7890",
// );

// const octokit = new Octokit({
//   auth: process.env.GITHUB_TOKEN,
//   // request: { agent, fetch },
// });

// Function to fetch TLF
// export const fetchTLF2 = async (
//   octokit: Octokit,
//   owner: string,
//   repo: string,
// ): Promise<TLF[]> => {
//   const result = await octokit.request(`GET /repos/{owner}/{repo}/contents`, {
//     owner,
//     repo,
//   });

//   return result.data;
// };

export const fetchTLF = async ({
    owner,
    name,
    token,
}: {
    owner: string;
    name: string;
    token: string;
}) => {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${name}/contents`,
            {
                headers: {
                    Authorization: `token ${token}`,
                },
            }
        );
        if (!response.ok) {
            throw new Error('GitHub API response not ok');
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

// Function to fetch file content
export const fetchFileContent = async (
    downloadUrl: string
): Promise<string> => {
    const response = await fetch(downloadUrl);
    let content = await response.text();
    content = removeCommentLines(content);
    return content;
};
// Function to check if file is DMF
export const isDMF = (file: TLF, dmfs: DMF[]): boolean => {
    for (const dmf of dmfs) {
        for (const framework of dmf.frameworks) {
            if (framework.dmf === file.name) {
                return true;
            }
        }
    }
    return false;
};
// Function to match files
function matchFiles(filename: string): boolean {
    const regex = new RegExp(includedFileMatchPattern);
    const result: boolean = regex.test(filename);
    return result;
}
// Function to remove comment lines from content
function removeCommentLines(content: string): string {
    const lines = content.split('\n');
    const noCommentLines = lines.filter((line) => !line.startsWith('#'));
    const newContent = noCommentLines.join('\n');
    return newContent;
}

export const getRepoInfoFromGithub = async ({
    owner,
    name,
}: {
    owner: string;
    name: string;
}) => {
    // const owner: string = response?.owner || "LTopx";
    // const repo: string = response?.repo || "L-GPT";

    // https://api.github.com/repos///contents
    // https://api.github.com/repos/LTopx/L-GPT/contents

    const dmfs = await fetchDMFsCached();

    //   const tlfData = await fetchTLF(octokit, owner, name);
    const token = process.env.GITHUB_TOKEN || '';
    const tlfData = await fetchTLF({ owner, name, token });

    const tlf: string[] = [];
    const files: string[] = [];
    const folders: string[] = [];
    const contentPromises: Promise<ContentItem>[] = [];
    tlfData.forEach((file: TLF) => {
        // Check file type and categorize accordingly
        if (file.type === 'file') {
            files.push(file.name);
        }
        if (file.type === 'dir') {
            folders.push(file.name);
        }
        // Check if file is DMF or matches file pattern and fetch the content
        if (
            (file.type === 'file' &&
                file.size < fileDownloadLimitSize &&
                isDMF(file, dmfs)) ||
            matchFiles(file.name)
        ) {
            let url = file.download_url;
            url = url.replace('githubusercontent.com', 'gitmirror.com');
            contentPromises.push(
                fetchFileContent(url).then((content) => ({
                    name: file.name,
                    content,
                }))
            );
        }
    });
    const contents = await Promise.all(contentPromises);
    // Prepare the result

    const result: Result = {
        tlf: { folders: folders, files: files },
        contents,
    };
    return result;
};

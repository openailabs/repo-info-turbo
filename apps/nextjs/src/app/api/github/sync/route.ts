/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getGithubContent, getRepoName } from '@acme/api';
import type { BatchAddDocument, EmbedbaseClient } from 'embedbase-js';
import { createClient, splitText } from 'embedbase-js';
import type { NextRequest, NextResponse } from 'next/server';

const EMBEDBASE_URL = process.env.EMBEDBASE_URL! || 'https://api.embedbase.xyz';
const EMBEDBASE_API_KEY = process.env.EMBEDBASE_API_KEY!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

const embedbase: EmbedbaseClient = createClient(
    EMBEDBASE_URL,
    EMBEDBASE_API_KEY
);

/**
 *
 * //curl -i -X 'POST'  -H 'Content-Type: application/json'  --data-raw '{"url":"https://github.com/gnosis/hashi"}' "http://localhost:8002/api/github/sync"
 * @param req
 * @param res
 * @returns
 */
// 1. Sync all the docs from a github repo onto embedbase
export default async function sync(req: any, res: any) {
    const url = req.body.url;

    const githubFiles = await getGithubContent(url, GITHUB_TOKEN);
    const repo = getRepoName(url);

    const chunks: BatchAddDocument[] = [];
    await Promise.all(
        githubFiles
            // ignore chunks containing <|endoftext|>
            .filter((file) => !file.content.includes('<|endoftext|>'))
            .map((file: any) =>
                splitText(file.content).map(({ chunk }) =>
                    chunks.push({
                        data: chunk,
                        metadata: file.metadata,
                    })
                )
            )
    );

    console.log('indexing', chunks.length, 'chunks into dataset', repo);
    const batchSize = 100;
    // add to embedbase by batches of size 100
    return Promise.all(
        chunks
            .reduce((acc: BatchAddDocument[][], chunk, i) => {
                if (i % batchSize === 0) {
                    acc.push(chunks.slice(i, i + batchSize));
                }
                return acc;
            }, [])
            .map((chunk) => embedbase.dataset(repo).batchAdd(chunk))
    )
        .catch((error) => res.status(500).json({ error: error }))
        .then(() => res.status(200));
}

import React, { useEffect, useState } from "react";
import { ProjectTypeProps } from "@/types";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

import { getRepoDetailSchema } from "@acme/api/validators";

import CreateDataTest from "./CreateDataTest";
import ReadDataTest from "./ReadDataTest";
import RepoInfo from "./RepoInfo";
import ToggleDetail from "./ToggleDetail";

type ShowDataProps = {
  owner: string;
  repoName: string;
};
const ShowData = ({ owner, repoName }: ShowDataProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const [canRead, setCanRead] = useState(false);

  const creator = trpc.repoDetail.create.useMutation();

  const { data } = trpc.repoDetail.get.useQuery(
    {
      owner,
      repoName,
    },
    {
      enabled: showDetail,
      refetchOnWindowFocus: false,
    },
  );

  const readResult = trpc.repoDetail.read.useQuery(
    {
      owner: owner,
      name: repoName,
    },
    {
      enabled: canRead,
      refetchOnWindowFocus: false,
    },
  );

  const clickHandler = async () => {
    console.log("Show detail? ", showDetail);
    setShowDetail(true);
  };

  const readHandler = async () => {
    console.log("Read one ", canRead);
    setCanRead(true);
  };

  const createDataHandler = async () => {
    creator.mutate({
      owner: owner,
      name: repoName,
      summary: {
        repo: "angular/angular",
        dmf: ["package.json"],
        stack: ["zustand"],
        infra: ["upstash", "supabase"],
        deployment: ["vercel", "zeabur"],
        summary: "angular official repo",
        score: "3",
      },
      detail: {
        tlf: {
          folders: ["prisma", "public", "src", "types"],
          files: [
            ".env.local.demo",
            ".eslintrc.json",
            ".gitignore",
            "CHANGE_LOG.md",
            "CHANGE_LOG.zh_CN.md",
            "LICENSE",
            "README.md",
            "README_CN.md",
            "next.config.js",
            "package-lock.json",
            "package.json",
            "pnpm-lock.yaml",
            "postcss.config.js",
            "sentry.client.config.js",
            "sentry.edge.config.js",
            "sentry.properties",
            "sentry.server.config.js",
            "tailwind.config.js",
            "tsconfig.json",
            "vercel.json",
          ],
        },
        contents: [
          {
            name: ".env.local.demo",
            content:
              "NEXT_PUBLIC_OPENAI_API_KEY=\nNEXT_PUBLIC_OPENAI_API_PROXY=\n\nNEXT_PUBLIC_AZURE_OPENAI_API_KEY=\nNEXT_PUBLIC_AZURE_OPENAI_RESOURCE_NAME=\nNEXT_AZURE_OPENAI_API_VERSION=\n\nNEXT_PUBLIC_SENTRY_DSN=\n\n\n\nDATABASE_URL=\n\nEMAIL_SERVER_HOST=\nEMAIL_SERVER_PORT=\nEMAIL_SERVER_USER=\nEMAIL_SERVER_PASSWORD=\nEMAIL_FROM=\nEMAIL_SECRET=\n\nGITHUB_ID=\nGITHUB_SECRET=\n\nGOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\n\nUPSTASH_REDIS_REST_URL=\nUPSTASH_REDIS_REST_TOKEN=",
          },
          {
            name: "package.json",
            content:
              '{\n  "name": "l-gpt",\n  "version": "0.7.3",\n  "private": true,\n  "scripts": {\n    "dev": "next dev",\n    "devt": "next dev --turbo",\n    "build": "next build",\n    "start": "next start",\n    "lint": "next lint",\n    "db-gn": "prisma generate",\n    "db-pull": "dotenv -e .env.local -- npx prisma db pull",\n    "db-push": "dotenv -e .env.local -- npx prisma db push",\n    "pm2": "next start -p 9000"\n  },\n  "dependencies": {\n    "@emotion/css": "11.11.2",\n    "@next-auth/prisma-adapter": "1.0.7",\n    "@prisma/client": "4.16.2",\n    "@radix-ui/react-accordion": "1.1.2",\n    "@radix-ui/react-alert-dialog": "1.0.4",\n    "@radix-ui/react-context-menu": "2.1.4",\n    "@radix-ui/react-dialog": "1.0.4",\n    "@radix-ui/react-dropdown-menu": "2.0.5",\n    "@radix-ui/react-popover": "1.0.6",\n    "@radix-ui/react-progress": "1.0.3",\n    "@radix-ui/react-select": "1.2.2",\n    "@radix-ui/react-slider": "1.1.2",\n    "@radix-ui/react-switch": "1.0.3",\n    "@radix-ui/react-tabs": "1.0.4",\n    "@react-email/components": "0.0.7",\n    "@react-email/render": "0.0.7",\n    "@sentry/nextjs": "7.57.0",\n    "@svgr/webpack": "8.0.1",\n    "@types/node": "20.3.3",\n    "@types/react": "18.2.14",\n    "@types/react-dom": "18.2.6",\n    "@upstash/redis": "1.22.0",\n    "@vercel/analytics": "1.0.1",\n    "ahooks": "3.7.8",\n    "autoprefixer": "10.4.14",\n    "clsx": "1.2.1",\n    "decimal.js": "10.4.3",\n    "echarts": "5.4.2",\n    "eslint": "8.44.0",\n    "eslint-config-next": "13.4.8",\n    "file-saver": "2.0.5",\n    "framer-motion": "10.12.18",\n    "gpt-tokens": "1.0.10",\n    "js-tiktoken": "1.0.7",\n    "l-hooks": "0.4.6",\n    "math-random": "2.0.1",\n    "microsoft-cognitiveservices-speech-sdk": "1.30.0",\n    "next": "13.4.8",\n    "next-auth": "4.22.1",\n    "next-intl": "2.17.1",\n    "next-plausible": "3.8.0",\n    "next-themes": "0.2.1",\n    "nodemailer": "6.9.3",\n    "postcss": "8.4.24",\n    "react": "18.2.0",\n    "react-dom": "18.2.0",\n    "react-hot-toast": "2.4.1",\n    "react-markdown": "8.0.7",\n    "react-syntax-highlighter": "15.5.0",\n    "rehype-katex": "6.0.3",\n    "remark-gfm": "3.0.1",\n    "remark-math": "5.1.1",\n    "tailwind-merge": "1.13.2",\n    "tailwindcss": "3.3.2",\n    "typescript": "5.1.6",\n    "uuid": "9.0.0",\n    "zustand": "4.3.9"\n  },\n  "devDependencies": {\n    "@tailwindcss/typography": "0.5.9",\n    "@types/file-saver": "2.0.5",\n    "@types/math-random": "1.0.0",\n    "@types/nodemailer": "6.4.8",\n    "@types/react-syntax-highlighter": "15.5.7",\n    "@types/uuid": "9.0.2",\n    "dotenv-cli": "7.2.1",\n    "prisma": "4.16.2"\n  }\n}',
          },
        ],
      },
    });
  };

  return (
    <div>
      <ToggleDetail clickHandler={clickHandler} />
      <CreateDataTest clickHandler={createDataHandler} />
      <ReadDataTest clickHandler={readHandler} />
      {JSON.stringify(data)}
      {JSON.stringify(readResult.data)}
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

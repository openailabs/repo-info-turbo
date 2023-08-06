// Generated by prisma/post-generate.ts

// pnpm i crypto net pg postgres tls pg @types/pg


import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { customAlphabet } from "nanoid";
// import { Kysely,PostgresDialect } from "kysely";
// import { PostgresJSDialect } from "kysely-postgres-js";
// import postgres from "postgres";
// import { Pool } from "pg";

// import { PrismaClient } from "@prisma/client";
// export * from "@prisma/client";

// const globalForPrisma = globalThis as { prisma?: PrismaClient };

// export const prismaClient =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log:
//       process.env.NODE_ENV === "development"
//         ? ["query", "error", "warn"]
//         : ["error"],
//   });

// if (process.env.NODE_ENV !== "production")
//   globalForPrisma.prisma = prismaClient;

import type { ColumnType } from "kysely";

import type { ProjectTier, SubscriptionPlan } from "./enums";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type ApiKey = {
  id: string;
  createdAt: Generated<Timestamp>;
  expiresAt: Timestamp | null;
  lastUsed: Timestamp | null;
  revokedAt: Timestamp | null;
  projectId: string;
  clerkUserId: string;
  name: Generated<string>;
  key: string;
};
export type Customer = {
  id: string;
  stripeId: string;
  subscriptionId: string | null;
  clerkUserId: string;
  clerkOrganizationId: string | null;
  name: string | null;
  plan: SubscriptionPlan | null;
  paidUntil: Timestamp | null;
  endsAt: Timestamp | null;
};
export type File = {
  id: Generated<number>;
  name: string;
  topLevelId: number | null;
};
export type Folder = {
  id: Generated<number>;
  name: string;
  topLevelId: number | null;
};
export type Ingestion = {
  id: string;
  createdAt: Generated<Timestamp>;
  projectId: string;
  apiKeyId: string;
  schema: unknown;
  hash: string;
  parent: string | null;
  origin: string;
};
export type Project = {
  id: string;
  createdAt: Generated<Timestamp>;
  organizationId: string | null;
  userId: string | null;
  name: string;
  tier: Generated<ProjectTier>;
  url: string | null;
};
export type RepoDetail = {
  id: Generated<number>;
  topLevelId: number;
  owner: string;
  repoName: string;
};
export type RepoFileContent = {
  id: Generated<number>;
  name: string;
  content: string;
  detailId: number;
};
export type RepoTopLevelFile = {
  id: Generated<number>;
};
export type Result = {
  id: Generated<number>;
  owner: string;
  name: string;
  summary: unknown | null;
  detail: unknown | null;
};
export type DB = {
  ApiKey: ApiKey;
  Customer: Customer;
  File: File;
  Folder: Folder;
  Ingestion: Ingestion;
  Project: Project;
  RepoDetail: RepoDetail;
  RepoFileContent: RepoFileContent;
  RepoTopLevelFile: RepoTopLevelFile;
  Result: Result;
};


// export const dbPostgresDialect = new Kysely<DB>({
//   dialect: new PostgresDialect({
//     pool: new Pool({
//       connectionString: process.env.DATABASE_URL,
//     }),
//   }),
// });

// export const dbPostgresJSDialect = new Kysely<DB>({
//   dialect: new PostgresJSDialect({
//     connectionString: process.env.DATABASE_URL,
//     options: {
//       max: 10,
//     },
//     postgres,
//   }),
// });

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});

// Use custom alphabet without special chars for less chaotic, copy-able URLs
// Will not collide for a long long time: https://zelark.github.io/nano-id-cc/
export const genId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);

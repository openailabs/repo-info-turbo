import { authRouter } from './router/auth';
import { organizationsRouter } from './router/organizations';
import { projectRouter } from './router/project';
import { repoDetailRouter } from './router/repoDetail';
import { createTRPCRouter } from './trpc';

// Deployed to /trpc/edge/**
export const edgeRouter = createTRPCRouter({
    project: projectRouter,
    auth: authRouter,
    organization: organizationsRouter,
    repoDetail: repoDetailRouter,
});

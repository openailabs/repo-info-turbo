import { noteRouter } from './router/note';
import { repoDetailRouter } from './router/repoDetail';
import { createTRPCRouter } from './trpc';

// Deployed to /trpc/chrome/**
export const chromeRouter = createTRPCRouter({
  repoDetail: repoDetailRouter,
  note: noteRouter,
});

export type ChromeAppRouter = typeof chromeRouter;

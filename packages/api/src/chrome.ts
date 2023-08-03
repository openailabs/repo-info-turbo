import { repoDetailRouter } from "./router/repoDetail";
import { createTRPCRouter } from "./trpc";

// Deployed to /trpc/chrome/**
export const chromeRouter = createTRPCRouter({
  repoDetail: repoDetailRouter,
});

export type ChromeAppRouter = typeof chromeRouter;

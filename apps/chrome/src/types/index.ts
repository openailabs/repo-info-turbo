import { Promisable } from 'type-fest';

import shouldFeatureRun, {
  ShouldRunConditions,
} from '../helpers/should-feature-run';

export type ProjectTypeProps = {
  owner: string;
  repo: string;
};

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

export type Repo = {
  owner: string;
  name: string;
};
export type FeatureInit = () => Promisable<void>;
export type FeatureRestore = Function;

export type FeatureLoader = {
  /**
   * Whether to wait for all DOMs to be ready before running `init`. Setting `false` makes `init` run
   * immediately when `body` is found.
   *
   * @default true
   */
  awaitDomReady?: boolean;
  init: FeatureInit; // Repeated here because this interface is Partial<>
  /**
   * Will be called after a restoration turbo:visit, if provided.
   *
   * Clicking forward/back button in browser triggers a restoration turbo:visit, which will restore
   * a page directly from cache. Some of the features injected by repoinfo, however, cannot be fully
   * restored. Hence extra code(i.e. `restore`) is needed to keep features always behaving right.
   */
  restore?: FeatureRestore;
} & Partial<InternalRunConfig>;

export type InternalRunConfig = ShouldRunConditions & {
  init: FeatureInit;
};

import { importedFeatures } from '../README.md';

export type RepoInfoOptions = typeof defaults;

export const defaults = Object.assign(
    {
        locale: 'en',
    },
    Object.fromEntries(
        importedFeatures.map((name) => [`repoinfo-${name}` as FeatureId, true])
    )
);

class OptionsStorage {
    public async getAll(): Promise<RepoInfoOptions> {
        return (await chrome.storage.sync.get(defaults)) as RepoInfoOptions;
    }

    public async set(options: Partial<RepoInfoOptions>): Promise<void> {
        await chrome.storage.sync.set(options);
    }
}

const optionsStorage = new OptionsStorage();

export default optionsStorage;

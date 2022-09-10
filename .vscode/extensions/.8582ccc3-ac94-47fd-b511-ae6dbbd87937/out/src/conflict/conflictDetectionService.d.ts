import { SourceComponent } from '@salesforce/source-deploy-retrieve';
import { DirectoryDiffer, DirectoryDiffResults } from './directoryDiffer';
import { MetadataCacheCallback, MetadataCacheExecutor, MetadataCacheResult } from './metadataCacheService';
export interface ConflictDetectionConfig {
    username: string;
    manifest: string;
}
export declare class ConflictDetector {
    private differ;
    private diffs;
    private error?;
    private static instance;
    private static EMPTY_DIFFS;
    constructor(differ?: DirectoryDiffer);
    static getInstance(): ConflictDetector;
    checkForConflicts(data: ConflictDetectionConfig): Promise<DirectoryDiffResults>;
    createCacheExecutor(username: string, callback: MetadataCacheCallback): MetadataCacheExecutor;
    private handleCacheResults;
    private reportError;
}
export declare function diffFolder(cache: MetadataCacheResult, username: string): Promise<void>;
/**
 * Perform file diff and execute VS Code diff comand to show in UI.
 * It matches the correspondent file in compoennt.
 * @param localFile local file
 * @param remoteComponent remote source component
 * @param defaultUsernameorAlias username/org info to show in diff
 * @returns {Promise<void>}
 */
export declare function diffOneFile(localFile: string, remoteComponent: SourceComponent, defaultUsernameorAlias: string): Promise<void>;

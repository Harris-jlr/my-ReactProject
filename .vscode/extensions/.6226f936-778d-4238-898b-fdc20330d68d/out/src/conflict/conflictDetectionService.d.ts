import { Command, CommandExecution } from '@salesforce/salesforcedx-utils-vscode/out/src/cli';
import { SourceComponent } from '@salesforce/source-deploy-retrieve';
import * as vscode from 'vscode';
import { MetadataCacheResult } from '../conflict/metadataCacheService';
import { DirectoryDiffer, DirectoryDiffResults } from './directoryDiffer';
export interface ConflictDetectionConfig {
    usernameOrAlias: string;
    packageDir: string;
    manifest: string;
}
export declare class ConflictDetector {
    private differ;
    private static instance;
    constructor(differ?: DirectoryDiffer);
    static getInstance(): ConflictDetector;
    getCachePath(username: string): string;
    buildRetrieveOrgSourceCommand(usernameOrAlias: string, targetPath: string, manifestPath: string): Command;
    buildMetadataApiConvertOrgSourceCommand(rootDir: string, outputDir: string): Command;
    clearCache(usernameOrAlias: string, throwErrorOnFailure?: boolean): string;
    checkForConflicts(data: ConflictDetectionConfig): Promise<DirectoryDiffResults>;
    private checkForConflictsInternal;
    executeCommand(command: Command, projectPath: string, cancellationTokenSource: vscode.CancellationTokenSource, cancellationToken: vscode.CancellationToken): Promise<string>;
    protected attachExecution(execution: CommandExecution, cancellationTokenSource: vscode.CancellationTokenSource, cancellationToken: vscode.CancellationToken): void;
    private clearDirectory;
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

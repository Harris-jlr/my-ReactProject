import { ComponentSet, MetadataApiRetrieve, RetrieveResult, SourceComponent } from '@salesforce/source-deploy-retrieve';
import * as vscode from 'vscode';
import { RetrieveExecutor } from '../commands/baseDeployRetrieve';
export interface MetadataContext {
    baseDirectory: string;
    commonRoot: string;
    components: SourceComponent[];
}
export declare const enum PathType {
    Folder = "folder",
    Individual = "individual",
    Manifest = "manifest",
    Unknown = "unknown"
}
export interface MetadataCacheResult {
    selectedPath: string;
    selectedType: PathType;
    cachePropPath?: string;
    cache: MetadataContext;
    project: MetadataContext;
}
export declare class MetadataCacheService {
    private static CACHE_FOLDER;
    private static PROPERTIES_FOLDER;
    private static PROPERTIES_FILE;
    private username;
    private cachePath;
    private componentPath?;
    private projectPath?;
    private isManifest;
    private sourceComponents;
    constructor(username: string);
    /**
     * Specify the base project path and a component path that will define the metadata to cache for the project.
     *
     * @param componentPath A path referring to a project folder or an individual component resource
     * @param projectPath The base path of an sfdx project
     */
    initialize(componentPath: string, projectPath: string, isManifest?: boolean): void;
    /**
     * Load a metadata cache based on a project path that defines a set of components.
     *
     * @param componentPath A path referring to a project folder, an individual component resource
     * or a manifest file
     * @param projectPath The base path of an sfdx project
     * @param isManifest Whether the componentPath references a manifest file
     * @returns MetadataCacheResult describing the project and cache folders
     */
    loadCache(componentPath: string, projectPath: string, isManifest?: boolean): Promise<MetadataCacheResult | undefined>;
    getSourceComponents(): Promise<ComponentSet>;
    createRetrieveOperation(comps?: ComponentSet): Promise<MetadataApiRetrieve>;
    processResults(result: RetrieveResult | undefined): Promise<MetadataCacheResult | undefined>;
    private extractResults;
    private findLongestCommonDir;
    private saveProperties;
    private getRelativePath;
    getCachePath(): string;
    makeCachePath(cacheKey: string): string;
    getPropsPath(): string;
    clearCache(throwErrorOnFailure?: boolean): string;
    private clearDirectory;
}
export declare type MetadataCacheCallback = (username: string, cache: MetadataCacheResult | undefined) => Promise<void>;
export declare class MetadataCacheExecutor extends RetrieveExecutor<string> {
    private cacheService;
    private callback;
    private isManifest;
    private username;
    constructor(username: string, executionName: string, logName: string, callback: MetadataCacheCallback, isManifest?: boolean);
    protected getComponents(response: any): Promise<ComponentSet>;
    protected doOperation(components: ComponentSet, token: vscode.CancellationToken): Promise<RetrieveResult | undefined>;
    protected postOperation(result: RetrieveResult | undefined): Promise<void>;
}

import { ComponentSet, FileProperties } from '@salesforce/source-deploy-retrieve';
import { MetadataApiDeployStatus } from '@salesforce/source-deploy-retrieve/lib/src/client/types';
import { ExtensionContext } from 'vscode';
interface ConflictFileProperties {
    lastModifiedDate: string;
}
export declare class PersistentStorageService {
    private storage;
    private static instance?;
    private constructor();
    static initialize(context: ExtensionContext): void;
    static getInstance(): PersistentStorageService;
    getPropertiesForFile(key: string): ConflictFileProperties | undefined;
    setPropertiesForFile(key: string, conflictFileProperties: ConflictFileProperties | undefined): void;
    setPropertiesForFilesRetrieve(fileProperties: FileProperties | FileProperties[]): void;
    setPropertiesForFilesDeploy(components: ComponentSet, status: MetadataApiDeployStatus): void;
    makeKey(type: string, fullName: string): string;
}
export {};

export interface TimestampFileProperties {
    path: string;
    localLastModifiedDate?: string | undefined;
    remoteLastModifiedDate?: string | undefined;
}
export interface DirectoryDiffResults {
    different: Set<TimestampFileProperties>;
    localRoot: string;
    remoteRoot: string;
    scannedLocal?: number;
    scannedRemote?: number;
}
export interface DirectoryDiffer {
    diff(localSourcePath: string, remoteSourcePath: string): DirectoryDiffResults;
}
export declare class CommonDirDirectoryDiffer implements DirectoryDiffer {
    constructor();
    diff(localSourcePath: string, remoteSourcePath: string): DirectoryDiffResults;
    private filesDiffer;
    private listFiles;
    private walkFiles;
}

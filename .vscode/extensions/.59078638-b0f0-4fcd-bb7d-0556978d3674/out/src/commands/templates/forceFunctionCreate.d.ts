import { Measurements, Properties } from '@salesforce/salesforcedx-utils-vscode/out/src';
import { Command } from '@salesforce/salesforcedx-utils-vscode/out/src/cli';
import { CancelResponse, ContinueResponse, FunctionInfo, ParametersGatherer } from '@salesforce/salesforcedx-utils-vscode/out/src/types';
import { BaseTemplateCommand } from './baseTemplateCommand';
export declare class ForceFunctionCreateExecutor extends BaseTemplateCommand {
    build(data: FunctionInfo): Command;
    runPostCommandTasks(data: FunctionInfo): Promise<unknown>;
    logMetric(logName: string | undefined, hrstart: [number, number], properties?: Properties, measurements?: Measurements): void;
}
export declare class FunctionInfoGatherer implements ParametersGatherer<FunctionInfo> {
    gather(): Promise<CancelResponse | ContinueResponse<FunctionInfo>>;
}
export declare function forceFunctionCreate(): Promise<void>;

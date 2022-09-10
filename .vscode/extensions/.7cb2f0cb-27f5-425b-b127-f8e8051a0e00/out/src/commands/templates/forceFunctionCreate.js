"use strict";
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@salesforce/salesforcedx-utils-vscode/out/src/cli");
const cp = require("child_process");
const path = require("path");
const vscode = require("vscode");
const messages_1 = require("../../messages");
const notifications_1 = require("../../notifications");
const util_1 = require("../util");
const baseTemplateCommand_1 = require("./baseTemplateCommand");
const metadataTypeConstants_1 = require("./metadataTypeConstants");
const LANGUAGE_JAVA = 'java';
const LANGUAGE_JAVASCRIPT = 'javascript';
const LOG_NAME = 'force_function_create';
class ForceFunctionCreateExecutor extends baseTemplateCommand_1.BaseTemplateCommand {
    build(data) {
        if (data.language === LANGUAGE_JAVASCRIPT) {
            this.metadata = metadataTypeConstants_1.FUNCTION_TYPE_JS;
            this.setFileExtension('js');
        }
        else if (data.language === LANGUAGE_JAVA) {
            this.metadata = metadataTypeConstants_1.FUNCTION_TYPE_JAVA;
            this.setFileExtension('java');
        }
        return new cli_1.SfdxCommandBuilder()
            .withDescription(messages_1.nls.localize('force_function_create_text'))
            .withArg('generate:function')
            .withFlag('--name', data.fileName)
            .withFlag('--language', data.language)
            .withLogName(LOG_NAME)
            .build();
    }
    runPostCommandTasks(data) {
        const language = data.language;
        if (language === LANGUAGE_JAVA) {
            const pathToSource = this.getPathToSource(data.outputdir, data.fileName);
            const targetDir = path.join(path.dirname(pathToSource), '..', '..', '..', '..', '..');
            return new Promise((resolve, reject) => {
                cp.exec('mvn install', { cwd: path.join(targetDir) }, err => {
                    if (err) {
                        notifications_1.notificationService.showWarningMessage(messages_1.nls.localize('force_function_install_mvn_dependencies_error', err.message));
                        reject(err);
                    }
                    resolve();
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                const pathToSource = this.getPathToSource(data.outputdir, data.fileName);
                const targetDir = path.dirname(pathToSource);
                cp.exec('npm install', { cwd: targetDir }, err => {
                    if (err) {
                        notifications_1.notificationService.showWarningMessage(messages_1.nls.localize('force_function_install_npm_dependencies_error', err.message));
                        reject(err);
                    }
                    resolve();
                });
            });
        }
    }
    logMetric(logName, hrstart, properties, measurements) {
        if (properties) {
            const fileExtension = this.getFileExtension();
            if (fileExtension === '.js') {
                properties.language = 'node';
            }
            else if (fileExtension === '.java') {
                properties.language = 'java';
            }
        }
        super.logMetric(logName, hrstart, properties, measurements);
    }
}
exports.ForceFunctionCreateExecutor = ForceFunctionCreateExecutor;
class FunctionInfoGatherer {
    gather() {
        return __awaiter(this, void 0, void 0, function* () {
            const nameInputOptions = {
                prompt: messages_1.nls.localize('force_function_enter_function')
            };
            const name = yield vscode.window.showInputBox(nameInputOptions);
            if (name === undefined) {
                return { type: 'CANCEL' };
            }
            const language = yield vscode.window.showQuickPick([LANGUAGE_JAVA, LANGUAGE_JAVASCRIPT], {
                placeHolder: messages_1.nls.localize('force_function_enter_language')
            });
            if (language === undefined) {
                return { type: 'CANCEL' };
            }
            // In order to reuse code used by other templates that have outputdir
            // and extends DirFileNameSelection, we are passing an empty outputdir
            return {
                type: 'CONTINUE',
                data: {
                    fileName: name,
                    language,
                    outputdir: ''
                }
            };
        });
    }
}
exports.FunctionInfoGatherer = FunctionInfoGatherer;
const parameterGatherer = new util_1.CompositeParametersGatherer(new FunctionInfoGatherer());
function forceFunctionCreate() {
    return __awaiter(this, void 0, void 0, function* () {
        const commandlet = new util_1.SfdxCommandlet(new util_1.SfdxWorkspaceChecker(), parameterGatherer, new ForceFunctionCreateExecutor());
        yield commandlet.run();
    });
}
exports.forceFunctionCreate = forceFunctionCreate;
//# sourceMappingURL=forceFunctionCreate.js.map
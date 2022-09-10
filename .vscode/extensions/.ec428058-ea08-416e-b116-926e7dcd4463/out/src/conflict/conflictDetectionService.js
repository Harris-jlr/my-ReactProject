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
const path = require("path");
const vscode = require("vscode");
const channels_1 = require("../channels");
const util_1 = require("../commands/util");
const conflict_1 = require("../conflict");
const messages_1 = require("../messages");
const notifications_1 = require("../notifications");
const telemetry_1 = require("../telemetry");
const directoryDiffer_1 = require("./directoryDiffer");
const metadataCacheService_1 = require("./metadataCacheService");
class ConflictDetector {
    constructor(differ) {
        this.differ = differ || new directoryDiffer_1.CommonDirDirectoryDiffer();
        this.diffs = Object.assign({}, ConflictDetector.EMPTY_DIFFS);
    }
    static getInstance() {
        if (!ConflictDetector.instance) {
            ConflictDetector.instance = new ConflictDetector(new directoryDiffer_1.CommonDirDirectoryDiffer());
        }
        return ConflictDetector.instance;
    }
    checkForConflicts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = process.hrtime();
            this.diffs = Object.assign({}, ConflictDetector.EMPTY_DIFFS);
            this.error = undefined;
            try {
                const cacheExecutor = this.createCacheExecutor(data.username, this.handleCacheResults.bind(this));
                const commandlet = new util_1.SfdxCommandlet(new util_1.SfdxWorkspaceChecker(), new util_1.SimpleGatherer(data.manifest), cacheExecutor);
                yield commandlet.run();
                if (this.error) {
                    throw this.error;
                }
            }
            catch (error) {
                this.reportError('conflict_detect_error', error);
                return Promise.reject(error);
            }
            telemetry_1.telemetryService.sendCommandEvent('conflict_detect', startTime, undefined, {
                conflicts: this.diffs.different.size,
                orgFiles: this.diffs.scannedRemote,
                localFiles: this.diffs.scannedLocal
            });
            return this.diffs;
        });
    }
    createCacheExecutor(username, callback) {
        const executor = new metadataCacheService_1.MetadataCacheExecutor(username, messages_1.nls.localize('conflict_detect_execution_name'), 'conflict_detect', callback, true);
        return executor;
    }
    handleCacheResults(username, result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (result) {
                const localPath = path.join(result.project.baseDirectory, result.project.commonRoot);
                const remotePath = path.join(result.cache.baseDirectory, result.cache.commonRoot);
                this.diffs = this.differ.diff(localPath, remotePath);
            }
            else {
                this.error = new Error(messages_1.nls.localize('conflict_detect_empty_results'));
            }
        });
    }
    reportError(messageKey, error) {
        console.error(error);
        const errorMsg = messages_1.nls.localize(messageKey, error.toString());
        channels_1.channelService.appendLine(errorMsg);
        telemetry_1.telemetryService.sendException('ConflictDetectionException', errorMsg);
    }
}
exports.ConflictDetector = ConflictDetector;
ConflictDetector.EMPTY_DIFFS = {
    localRoot: '',
    remoteRoot: '',
    different: new Set(),
    scannedLocal: 0,
    scannedRemote: 0
};
function diffFolder(cache, username) {
    return __awaiter(this, void 0, void 0, function* () {
        const localPath = path.join(cache.project.baseDirectory, cache.project.commonRoot);
        const remotePath = path.join(cache.cache.baseDirectory, cache.cache.commonRoot);
        const differ = new directoryDiffer_1.CommonDirDirectoryDiffer();
        const diffs = differ.diff(localPath, remotePath);
        conflict_1.conflictView.visualizeDifferences(messages_1.nls.localize('force_source_diff_folder_title', username), username, true, diffs);
    });
}
exports.diffFolder = diffFolder;
/**
 * Perform file diff and execute VS Code diff comand to show in UI.
 * It matches the correspondent file in compoennt.
 * @param localFile local file
 * @param remoteComponent remote source component
 * @param defaultUsernameorAlias username/org info to show in diff
 * @returns {Promise<void>}
 */
function diffOneFile(localFile, remoteComponent, defaultUsernameorAlias) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePart = path.basename(localFile);
        const remoteFilePaths = remoteComponent.walkContent();
        if (remoteComponent.xml) {
            remoteFilePaths.push(remoteComponent.xml);
        }
        for (const filePath of remoteFilePaths) {
            if (filePath.endsWith(filePart)) {
                const remoteUri = vscode.Uri.file(filePath);
                const localUri = vscode.Uri.file(localFile);
                try {
                    yield vscode.commands.executeCommand('vscode.diff', remoteUri, localUri, messages_1.nls.localize('force_source_diff_title', defaultUsernameorAlias, filePart, filePart));
                }
                catch (err) {
                    notifications_1.notificationService.showErrorMessage(err.message);
                    channels_1.channelService.appendLine(err.message);
                    channels_1.channelService.showChannelOutput();
                    telemetry_1.telemetryService.sendException(err.name, err.message);
                }
                return;
            }
        }
    });
}
exports.diffOneFile = diffOneFile;
//# sourceMappingURL=conflictDetectionService.js.map
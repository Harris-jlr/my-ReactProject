"use strict";
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const messages_1 = require("../messages");
const _1 = require("./");
const componentDiffer_1 = require("./componentDiffer");
class TimestampConflictDetector {
    constructor() {
        this.diffs = Object.assign({}, TimestampConflictDetector.EMPTY_DIFFS);
    }
    createDiffs(result) {
        if (!result) {
            throw new Error(messages_1.nls.localize('conflict_detect_empty_results'));
        }
        this.createRootPaths(result);
        const components = _1.MetadataCacheService.correlateResults(result);
        this.determineConflicts(components);
        return this.diffs;
    }
    determineConflicts(data) {
        const cache = _1.PersistentStorageService.getInstance();
        const conflicts = new Set();
        data.forEach(component => {
            var _a;
            let lastModifiedInOrg;
            let lastModifiedInCache;
            lastModifiedInOrg = component.lastModifiedDate;
            const key = cache.makeKey(component.cacheComponent.type.name, component.cacheComponent.fullName);
            lastModifiedInCache = (_a = cache.getPropertiesForFile(key)) === null || _a === void 0 ? void 0 : _a.lastModifiedDate;
            if (!lastModifiedInCache || lastModifiedInOrg !== lastModifiedInCache) {
                const differences = componentDiffer_1.diffComponents(component.projectComponent, component.cacheComponent, this.diffs.localRoot, this.diffs.remoteRoot);
                differences.forEach(difference => {
                    const cachePathRelative = path_1.relative(this.diffs.remoteRoot, difference.cachePath);
                    const projectPathRelative = path_1.relative(this.diffs.localRoot, difference.projectPath);
                    if (cachePathRelative === projectPathRelative) {
                        conflicts.add({
                            path: cachePathRelative,
                            localLastModifiedDate: lastModifiedInCache,
                            remoteLastModifiedDate: lastModifiedInOrg
                        });
                    }
                });
            }
        });
        this.diffs.different = conflicts;
    }
    createRootPaths(result) {
        this.diffs.localRoot = path_1.join(result.project.baseDirectory, result.project.commonRoot);
        this.diffs.remoteRoot = path_1.join(result.cache.baseDirectory, result.cache.commonRoot);
    }
}
exports.TimestampConflictDetector = TimestampConflictDetector;
TimestampConflictDetector.EMPTY_DIFFS = {
    localRoot: '',
    remoteRoot: '',
    different: new Set()
};
//# sourceMappingURL=timestampConflictDetector.js.map
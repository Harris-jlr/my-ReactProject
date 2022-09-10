"use strict";
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
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const source_deploy_retrieve_1 = require("@salesforce/source-deploy-retrieve");
const fs = require("fs");
const os = require("os");
const path = require("path");
const shell = require("shelljs");
const baseDeployRetrieve_1 = require("../commands/baseDeployRetrieve");
const util_1 = require("../util");
class MetadataCacheService {
    constructor(username) {
        this.username = username;
        this.sourceComponents = new source_deploy_retrieve_1.ComponentSet();
        this.cachePath = this.makeCachePath(username);
    }
    /**
     * Specify the base project path and a component path that will define the metadata to cache for the project.
     *
     * @param componentPath A path referring to a project folder or an individual component resource
     * @param projectPath The base path of an sfdx project
     */
    initialize(componentPath, projectPath) {
        this.componentPath = componentPath;
        this.projectPath = projectPath;
    }
    /**
     * Load a metadata cache based on a project path that defines a set of components.
     *
     * @param componentPath A path referring to a project folder or an individual component resource
     * @param projectPath The base path of an sfdx project
     * @returns MetadataCacheResult describing the project and cache folders
     */
    loadCache(componentPath, projectPath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.initialize(componentPath, projectPath);
            const components = yield this.getSourceComponents();
            const operation = yield this.createRetrieveOperation(components);
            const results = yield operation.start();
            return this.processResults(results);
        });
    }
    getSourceComponents() {
        return this.componentPath
            ? (this.sourceComponents = source_deploy_retrieve_1.ComponentSet.fromSource(this.componentPath))
            : new source_deploy_retrieve_1.ComponentSet();
    }
    createRetrieveOperation(comps) {
        return __awaiter(this, void 0, void 0, function* () {
            const components = comps || (yield this.getSourceComponents());
            this.clearDirectory(this.cachePath, true);
            const operation = components.retrieve({
                usernameOrConnection: this.username,
                output: this.cachePath,
                merge: false
            });
            return operation;
        });
    }
    processResults(result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!result) {
                return;
            }
            const { components, properties } = this.extractResults(result);
            if (components.length > 0 && this.componentPath && this.projectPath) {
                const propsFile = this.saveProperties(properties);
                const cacheCommon = this.findLongestCommonDir(components, this.cachePath);
                const projCommon = this.findLongestCommonDir(this.sourceComponents.getSourceComponents().toArray(), this.projectPath);
                const isPathDirectory = fs.existsSync(this.componentPath) &&
                    fs.lstatSync(this.componentPath).isDirectory();
                return {
                    selectedPath: this.componentPath,
                    selectedIsDirectory: isPathDirectory,
                    cache: {
                        baseDirectory: this.cachePath,
                        commonRoot: cacheCommon,
                        components
                    },
                    cachePropPath: propsFile,
                    project: {
                        baseDirectory: this.projectPath,
                        commonRoot: projCommon,
                        components: this.sourceComponents.getSourceComponents().toArray()
                    }
                };
            }
        });
    }
    extractResults(result) {
        const properties = [];
        if (Array.isArray(result.response.fileProperties)) {
            properties.push(...result.response.fileProperties);
        }
        else {
            properties.push(result.response.fileProperties);
        }
        const components = result.components.getSourceComponents().toArray();
        return { components, properties };
    }
    findLongestCommonDir(comps, baseDir) {
        if (comps.length === 0) {
            return baseDir;
        }
        if (comps.length === 1) {
            return this.getRelativePath(comps[0], baseDir);
        }
        const allPaths = comps.map(c => this.getRelativePath(c, baseDir));
        const baseline = allPaths[0];
        let shortest = baseline.length;
        for (let whichPath = 1; whichPath < allPaths.length; whichPath++) {
            const sample = allPaths[whichPath];
            shortest = Math.min(shortest, sample.length);
            for (let comparePos = 0; comparePos < shortest; comparePos++) {
                if (baseline[comparePos] !== sample[comparePos]) {
                    shortest = comparePos;
                    break;
                }
            }
        }
        const dir = baseline.substring(0, shortest);
        return dir.endsWith(path.sep) ? dir.slice(0, -path.sep.length) : dir;
    }
    saveProperties(properties) {
        const props = {
            componentPath: this.componentPath,
            fileProperties: properties
        };
        const propDir = this.getPropsPath();
        const propsFile = path.join(propDir, MetadataCacheService.PROPERTIES_FILE);
        fs.mkdirSync(propDir);
        fs.writeFileSync(propsFile, JSON.stringify(props));
        return propsFile;
    }
    getRelativePath(comp, baseDir) {
        const compPath = comp.content || comp.xml;
        if (compPath) {
            const compDir = path.dirname(compPath);
            return compDir.substring(baseDir.length + path.sep.length);
        }
        return '';
    }
    getCachePath() {
        return this.cachePath;
    }
    makeCachePath(cacheKey) {
        return path.join(os.tmpdir(), ...MetadataCacheService.CACHE_FOLDER, cacheKey);
    }
    getPropsPath() {
        return path.join(this.cachePath, ...MetadataCacheService.PROPERTIES_FOLDER);
    }
    clearCache(throwErrorOnFailure = false) {
        this.clearDirectory(this.cachePath, throwErrorOnFailure);
        return this.cachePath;
    }
    clearDirectory(dirToRemove, throwErrorOnFailure) {
        try {
            shell.rm('-rf', dirToRemove);
        }
        catch (error) {
            if (throwErrorOnFailure) {
                throw error;
            }
        }
    }
}
exports.MetadataCacheService = MetadataCacheService;
MetadataCacheService.CACHE_FOLDER = ['.sfdx', 'diff'];
MetadataCacheService.PROPERTIES_FOLDER = ['prop'];
MetadataCacheService.PROPERTIES_FILE = 'file-props.json';
class MetadataCacheExecutor extends baseDeployRetrieve_1.RetrieveExecutor {
    constructor(username, executionName, logName, callback) {
        super(executionName, logName);
        this.callback = callback;
        this.username = username;
        this.cacheService = new MetadataCacheService(username);
    }
    getComponents(response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cacheService.initialize(response.data, util_1.getRootWorkspacePath());
            return this.cacheService.getSourceComponents();
        });
    }
    doOperation(components, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = yield this.cacheService.createRetrieveOperation(components);
            this.setupCancellation(operation, token);
            return operation.start();
        });
    }
    postOperation(result) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = yield this.cacheService.processResults(result);
            yield this.callback(this.username, cache);
        });
    }
}
exports.MetadataCacheExecutor = MetadataCacheExecutor;
//# sourceMappingURL=metadataCacheService.js.map
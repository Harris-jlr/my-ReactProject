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
const sfdxProject_1 = require("../sfdxProject");
const util_1 = require("../util");
var PathType;
(function (PathType) {
    PathType["Folder"] = "folder";
    PathType["Individual"] = "individual";
    PathType["Manifest"] = "manifest";
    PathType["Unknown"] = "unknown";
})(PathType = exports.PathType || (exports.PathType = {}));
class MetadataCacheService {
    constructor(username) {
        this.isManifest = false;
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
    initialize(componentPath, projectPath, isManifest = false) {
        this.componentPath = componentPath;
        this.projectPath = projectPath;
        this.isManifest = isManifest;
    }
    /**
     * Load a metadata cache based on a project path that defines a set of components.
     *
     * @param componentPath A path referring to a project folder, an individual component resource
     * or a manifest file
     * @param projectPath The base path of an sfdx project
     * @param isManifest Whether the componentPath references a manifest file
     * @returns MetadataCacheResult describing the project and cache folders
     */
    loadCache(componentPath, projectPath, isManifest = false) {
        return __awaiter(this, void 0, void 0, function* () {
            this.initialize(componentPath, projectPath, isManifest);
            const components = yield this.getSourceComponents();
            const operation = yield this.createRetrieveOperation(components);
            const results = yield operation.start();
            return this.processResults(results);
        });
    }
    getSourceComponents() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.componentPath && this.projectPath) {
                const packageDirs = yield sfdxProject_1.SfdxPackageDirectories.getPackageDirectoryFullPaths();
                this.sourceComponents = this.isManifest
                    ? yield source_deploy_retrieve_1.ComponentSet.fromManifest({
                        manifestPath: this.componentPath,
                        resolveSourcePaths: packageDirs,
                        forceAddWildcards: true
                    })
                    : source_deploy_retrieve_1.ComponentSet.fromSource(this.componentPath);
                return this.sourceComponents;
            }
            return new source_deploy_retrieve_1.ComponentSet();
        });
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
                const sourceComps = this.sourceComponents.getSourceComponents().toArray();
                const projCommon = this.findLongestCommonDir(sourceComps, this.projectPath);
                let selectedType = "unknown" /* Unknown */;
                if (fs.existsSync(this.componentPath) &&
                    fs.lstatSync(this.componentPath).isDirectory()) {
                    selectedType = "folder" /* Folder */;
                }
                else if (this.isManifest) {
                    selectedType = "manifest" /* Manifest */;
                }
                else {
                    selectedType = "individual" /* Individual */;
                }
                return {
                    selectedPath: this.componentPath,
                    selectedType,
                    cache: {
                        baseDirectory: this.cachePath,
                        commonRoot: cacheCommon,
                        components
                    },
                    cachePropPath: propsFile,
                    project: {
                        baseDirectory: this.projectPath,
                        commonRoot: projCommon,
                        components: sourceComps
                    },
                    properties
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
            return '';
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
    /**
     * Groups the information in a MetadataCacheResult by component
     * @param result A MetadataCacheResult
     * @returns An array with one entry per retrieved component, with all corresponding information about the component included
     */
    static correlateResults(result) {
        const components = [];
        const projectIndex = new Map();
        for (const comp of result.project.components) {
            projectIndex.set(MetadataCacheService.makeKey(comp.type.name, comp.fullName), comp);
        }
        const cacheIndex = new Map();
        for (const comp of result.cache.components) {
            cacheIndex.set(MetadataCacheService.makeKey(comp.type.name, comp.fullName), comp);
        }
        const fileIndex = new Map();
        for (const fileProperty of result.properties) {
            fileIndex.set(MetadataCacheService.makeKey(fileProperty.type, fileProperty.fullName), fileProperty);
        }
        fileIndex.forEach((fileProperties, key) => {
            const cacheComponent = cacheIndex.get(key);
            const projectComponent = projectIndex.get(key);
            if (cacheComponent && projectComponent) {
                components.push({
                    cacheComponent,
                    projectComponent,
                    lastModifiedDate: fileProperties.lastModifiedDate
                });
            }
        });
        return components;
    }
    static makeKey(type, fullName) {
        return `${type}#${fullName}`;
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
    constructor(username, executionName, logName, callback, isManifest = false) {
        super(executionName, logName);
        this.isManifest = false;
        this.callback = callback;
        this.isManifest = isManifest;
        this.username = username;
        this.cacheService = new MetadataCacheService(username);
    }
    getComponents(response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cacheService.initialize(response.data, util_1.getRootWorkspacePath(), this.isManifest);
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
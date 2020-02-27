const path = require('path');
const fs = require('fs');

module.exports = {
    fsAccess,
    fsStat,

    fsReadFile,
    fsWriteFile,
    fsAppendFile,
    fsUnlink,

    fsMkdir,
    fsRmdir,
    fsRmdirRecursive,
    fsReaddir,

    fsUtimes,

    copyFile,
    copyFolderRecursive,
    copyFolderContentRecursive,

    W_OK: fs.constants.W_OK
};

/**
 * fs.access
 * @param {string} dirPath
 * @returns {Promise<string>|Promise<Error>}
 */
function fsAccess(dirPath) {
    return new Promise((resolve, reject) => {
        fs.access(dirPath, (err) => {
            return err ? reject(err) : resolve(dirPath);
        });
    });
}

/**
 * fs.stat
 * @param {string} dirPath
 * @returns {Promise<string>|Promise<Error>}
 */
function fsStat(dirPath) {
    return new Promise((resolve, reject) => {
        fs.stat(dirPath, (err, stat) => {
            return err ? reject(err) : resolve(stat);
        });
    });
}

/**
 * fs.readFile
 * @param {string} filePath
 * @param {object} [_options]
 * @returns {Promise<string>|Promise<Error>}
 */
function fsReadFile(filePath, _options) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, _options, (err, res) => {
            return err ? reject(err) : resolve(res);
        });
    });
}

/**
 * fs.writeFile
 * @param {string} filePath
 * @param {string} data
 * @param {object} [_options]
 * @returns {Promise<string>|Promise<Error>}
 */
function fsWriteFile(filePath, data, _options) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, _options, (err) => {
            return err ? reject(err) : resolve(filePath);
        });
    });
}

/**
 * fs.appendFile
 * @param {string} filePath
 * @param {string} data
 * @param {object} [_options]
 * @returns {Promise<string>|Promise<Error>}
 */
function fsAppendFile(filePath, data, options) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, options, (err) => {
            return err ? reject(err) : resolve(filePath);
        });
    });
}

/**
 * fs.unlink
 * @param {string} filePath
 * @returns {Promise<string>|Promise<Error>}
 */
function fsUnlink(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            return err ? reject(err) : resolve(filePath);
        });
    });
}

/**
 * fs.mkdir
 * @param {string} dirPath
 * @param {number} [_mode]
 * @returns {Promise<string>|Promise<Error>}
 */
function fsMkdir(dirPath, _mode) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, _mode, (err) => {
            return err ? reject(err) : resolve(dirPath);
        });
    });
}

/**
 * fs.rmdir
 * @param {string} dirPath
 * @returns {Promise<string>|Promise<Error>}
 */
function fsRmdir(dirPath) {
    return new Promise((resolve, reject) => {
        fs.rmdir(dirPath, (err) => {
            return err ? reject(err) : resolve(dirPath);
        });
    });
}

/**
 * Removes folder with all content inside
 * @param {string} dirPath - directory path to remove
 * @param {boolean} [onlyContent] - remove the folder as well or only content inside
 * @param {Array<string>} [excludePaths] - array of relative paths which to exclude from removing
 * like ['a', 'a/b', 'a/c.txt']
 * @param {string} [_root] - used for recursive call of function and keep reference to main (root)
 * folder
 * @returns {Promise.<(boolean|string)>|Promise<Error>}
 */
function fsRmdirRecursive(dirPath, onlyContent = false, excludePaths = [], _root) {
    const dir = dirPath;
    let root = _root || dirPath;

    if (_excludeItem(dirPath, root, excludePaths)) {
        return Promise.resolve(true);
    }

    return fsReaddir(dir)
        .then((files) => {
            const itemsStatP = files.map((item) => {
                const itemPath = path.resolve(dir, item);
                return fsStat(itemPath)
                    .then((stat) => {
                        return {
                            stat,
                            itemPath
                        };
                    });
            });

            return Promise.all(itemsStatP)
                .then((itemsStat) => {
                    return Promise.all(itemsStat.map(({stat, itemPath}) => {
                        if (stat.isDirectory()) {
                            return fsRmdirRecursive(itemPath, false, excludePaths, root);
                        }
                        else {
                            if (_excludeItem(itemPath, root, excludePaths)) {
                                return Promise.resolve(true);
                            }
                            return fsUnlink(itemPath);
                        }
                    }));
                })
                .then((results) => {
                    return results.find((item) => {
                        return item === true;
                    });
                })
        })
        .then((innerExclude) => {
            if (onlyContent || innerExclude) {
                return true;
            }
            return fsRmdir(dir);
        });
}

/**
 * fs.readdir
 * @param {string} dirPath
 * @returns {Promise<Array<string>>|Promise<Error>}
 */
function fsReaddir(dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            return err ? reject(err) : resolve(files);
        });
    });
}

/**
 * fs.utimes
 * @param {string} filePath
 * @param {nuber} atime
 * @param {nuber} mtime
 * @returns {Promise<string>|Promise<Error>}
 */
function fsUtimes(filePath, atime, mtime) {
    return new Promise((resolve, reject) => {
        fs.utimes(filePath, atime, mtime, (err) => {
            return err ? reject(err) : resolve(filePath);
        });
    });
}

/**
 * Copy file from 'source' to 'target'
 * @param {string} source
 * @param {string} target
 * @returns {Promise<string>|Promise.<Error>}
 */
function copyFile(source, target) {
    let targetFile = target;

    return fsAccess(target)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
        .then((targetIsExist) => {
            if (targetIsExist) {
                return fsStat(target)
                    .then((stats) => {
                        if (stats.isDirectory()) {
                            targetFile = path.join(target, path.basename(source));
                        }
                        return targetFile;
                    });
            }
            return targetFile;
        })
        .then(() => {
            return fsAccess(source);
        })
        .then(() => {
            return fsReadFile(source);
        })
        .then((content) => {
            return fsWriteFile(targetFile, content);
        });
}

/**
 * Copy folder and all content of it from 'source' to 'target'
 * @param {string} source
 * @param {string} target
 * @returns {Promise<string>|Promise.<Error>}
 */
function copyFolderRecursive(source, target) {
    let targetFolder = path.join(target, path.basename(source));
    return copyFolderContentRecursive(source,targetFolder);
}

/**
 * Copy all content of source folder to 'target'
 * @param {string} source
 * @param {string} target
 * @returns {Promise<string>|Promise.<Error>}
 */
function copyFolderContentRecursive(source, targetFolder) {

    return fsAccess(targetFolder)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
        .then((targetIsExist) => {
            if (!targetIsExist) {
                return fsMkdir(targetFolder);
            }
        })
        .then(() => {
            return fsStat(source);
        })
        .then((stats) => {
            if (stats.isDirectory()){
                return fsReaddir(source);
            }
            return [];
        })
        .then((files) => {
            let filesWithStatsPromises = files.map((file) => {
                let curSource = path.join(source, file);
                return Promise.all([file, fsStat(curSource)]);
            });

            return Promise.all(filesWithStatsPromises);
        })
        .then((filesWithStats) => {
            let filesWithStatsPromises = filesWithStats.map(([file, stats]) => {
                let curSource = path.join(source, file);
                if (stats.isDirectory()) {
                    return copyFolderRecursive(curSource, targetFolder);
                } else {
                    return copyFile(curSource, targetFolder);
                }
            });

            return Promise.all(filesWithStatsPromises);
        });
}

/**
 * Determinate if file/folder should be excluded from removing in "fsRmdirRecursive" function
 * @param itemPath
 * @param root
 * @param excludeArray
 * @return {boolean}
 * @private
 */
function _excludeItem(itemPath, root, excludeArray = []) {
    let exclude = false;
    let relativePath = '';
    if (root) {
        relativePath = path.relative(root, itemPath);
    }
    if (relativePath) {
        excludeArray.forEach((item) => {
            if (relativePath === path.normalize(item)) {
                exclude = true;
            }
        });
    }
    return exclude;
}

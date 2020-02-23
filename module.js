const path = require('path');
const express = require('express');

/**
 * @module
 * Contains utilities that helps in unit testing
 */

function getStack(){
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    const err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    const stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
}

/**
 * Returns the path to the module from which caller function were called.
 */
function getModulePathBasedOnParentModule(module){
    const modulePath = module.indexOf('/') >= 0 || module.indexOf(path.sep) >= 0 ? path.join(path.dirname(getStack()[2].getFileName()), module) : module;
    return require.resolve(modulePath);
}

console.log(require.resolve('express'));

module.exports = {


    /**
     * Removes module from node cache. Next time module will be required, node will reload it.
     * NOTE!! Doesn't work with node native modules such as fs, path, etc
     * @param {string} module - module name or path to the module
     * @returns {boolean} - returns true if module were removed, false otherwise.
     * (NOTE! if module wasn't loaded by node before calling this function false will be returned since there is nothing to remove)
     */
    removeModuleFromCache(module){
        return delete require.cache[getModulePathBasedOnParentModule(module)];
    },

    /**
     * Replaces loaded module with passed module. If module wasn't loaded this function will force node to load the module and then replace loaded module with passed one.
     * NOTE!! Doesn't work with node native modules such as fs, path, etc
     * @param {string} module - module name or path
     * @param {Object|Function} newModule - new module's object/function
     * @returns {{restore: (function()), getPreviousModule()}} - object with restore function which rolls back changes and replaces passed module with original module in cache and the previousModule which was in the cache
     */
    replaceModuleInCache(module, newModule){
        const modulePath = getModulePathBasedOnParentModule(module);
        let prevModule = require.cache[modulePath] && require.cache[modulePath].exports;

        if (!prevModule) {
            require.cache[modulePath] = {};
        }

        require.cache[modulePath].exports = newModule;
        return {
            /**
             * Rolls back the changes
             */
            restore(){
                if (prevModule) {
                    require.cache[modulePath].exports = prevModule;
                } else {
                    delete require.cache[modulePath];
                }
            },
            /**
             * Returns the previous module if it exists
             * @returns {Object} - the previous module which was in the cache
             */
            getPreviousModule(){
                return prevModule;
            }
        };
    },

    /**
     * Replaces loaded external module with passed module. If module wasn't loaded this function will force node to load the module and then replace loaded module with passed one.
     * NOTE!! external module must have index.js file
     * @param {string} module - module name
     * @param {Object|Function} newModule - new module's object/function
     * @returns {{restore: (function()), getPreviousModule()}} - object with restore function which rolls back changes and replaces passed module with original module in cache and the previousModule which was in the cache
     */
    replaceExternalModuleInCache(module, newModule){
        return this.replaceModuleInCache(`../node_modules/${module}`, newModule);
    }
};

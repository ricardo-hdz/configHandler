// Utility function to handle js configs
/* jslint nomen: true */
/* global define */
define(
    [
        'configs/configs',
        'jquery'
    ],
    function (config, $) {
        'use strict';
            
        var CONFIG_FILES_PATH_ID = 'configFiles',
            configHandler = {},
            _configFiles,
            _configFilesLoaded = {},
            _environment,
            _environmentConfig = {};
        
        // PRIVATE FUNCTIONS

        /**
         * Gets the configFiles object from the main config file (configs.js)
         * @returns Object
         */
        function _getConfigFilePaths() {
            return (config && config.hasOwnProperty(CONFIG_FILES_PATH_ID)) ? config[CONFIG_FILES_PATH_ID] : null;
        }

        /**
         * Gets the environment according to the hostname.
         * This will be used to retrieve the proper config values according to the env.
         *
         * @returns String env
         */
        function _getEnvironment() {
            
            var hostname = window.location.hostname,
                environments;

            environments = {
                /* local */
                'localhost'     : 'local',
                '127.0.0.1'     : 'local',

                /* dev */
                'dev.com'       : 'dev',

                /* qa */
                'qa.com'        : 'qa',

                /* production */
                'prod.com'      : 'production'
            };
            
            return environments[hostname];
        }

        /**
         * Gets the config object applying to the environment.
         *
         * @param String configName The root object name of the config file
         * @param String env e.g. localhost, qa
         * @returns Object config
         */
        function _getEnvironmentConfig(configName, env) {
            var configObj = (_configFilesLoaded && _configFilesLoaded.hasOwnProperty(configName)) ?
                    _configFilesLoaded[configName] : null;
            return (configObj && configObj.hasOwnProperty(env)) ? configObj[env] : null;
        }

        /**
         * Gets config value from an specific environment config object.
         *
         * @param String key
         * @returns Mixed value
         */
        function _getValueFromEnvConfig(key) {
            return (_environmentConfig && _environmentConfig.hasOwnProperty(key)) ? _environmentConfig[key] : null;
        }

        /**
         * Recursive function to find inner key-value pair from a config object.
         *
         * @param Object sections
         * @param String val
         *
         * @returns String val
         */
        function _resolveConfigKey(sections, val) {
            if ($.isArray(sections)) {
                sections.forEach(function (section) {
                    val = (val && val.hasOwnProperty(section)) ? val[section] : null;
                });
            }

            return val;
        }

        //PUBLIC FUNCTIONS

        /**
         * Returns a config value by key.
         * Usage:
         *      getEnvironmentConfig('myKey')           - Returns top level object
         *      getEnvironmentConfig('myKey.property')  - Returns specific key
         *
         * @param String key
         * @returns Mixed val
         */
        configHandler.getConfigKey = function (key) {
            //return 'Hello from local';
            var configName,
                sections = key.split('.'),
                val = null;
            
            if (key && typeof key === 'string') {
                console.log('Length of envConfig: ' + Object.keys(_environmentConfig).length);
                configName = sections.shift();
                val = (_environmentConfig && _environmentConfig.hasOwnProperty(configName)) ? _environmentConfig[configName] : null;
                val = (val) ? _resolveConfigKey(sections, val) : null;
            }

            return val;
        };

        /**
         * Loads the config files and returns a $.Deferred to be resolved when
         * all configs have been loaded.
         *
         * @returns $.Deferred
         */
        configHandler.loadConfig = function () {
            var deferred = $.Deferred();
            
            if (_configFiles) {
                $.each(_configFiles, function (key, value) {
                    var configLength = Object.keys(_configFiles).length,
                        assignConfig = function (config) {
                            _configFilesLoaded[key] = config;
                            // Resolve when all config files have been loaded
                            _environmentConfig[key] = _getEnvironmentConfig(key, _environment);
                            if (configLength === Object.keys(_configFilesLoaded).length) {
                                deferred.resolve();
                            }
                        };
                    require([value], assignConfig);
                });
            }
            return deferred.promise();
        };
        
        // Load config file paths from main config at initialize
        _configFiles = _getConfigFilePaths();
        _environment = _getEnvironment();

        return configHandler;
    }
);
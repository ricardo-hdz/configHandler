requirejs.config({
    baseUrl: '',
    
    paths: {
        'jquery'        : '../src/js/jquery-1.9.1.min',
        'configHandler' : '../src/configHandler'
    },
    
    shim: {
        'jquery': {
            exports: '$'
        }
    }
});

requirejs(
    [
        'jquery',
        'configHandler',
        'configHandler.test'
    ],
    function ($, ConfigHandler) {
        'use strict';
        
        //Toggle qUnit to aSync mode
        QUnit.stop();
        
        // Defer Qunit so RequireJS can work its magic and resolve all modules.
        QUnit.config.autostart = false;
        
        // Start Qunit when configFiles have been loaded
        $.when(ConfigHandler.loadConfig()).done(QUnit.start());
    }
);
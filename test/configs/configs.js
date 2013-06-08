// Defines the config files the handler is going to load.
// e.g. id: path
define(function () {
    'use strict';
    
    var config = {
        'configFiles': {
            'environment'   : 'configs/environment',
            'bootstrap'     : 'configs/bootstrap'
        }
    };

    return config;
});
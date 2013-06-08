// Environment config file

/* jslint browser: true */
/* global define */
define(function () {
    'use strict';
    
    var environment = {
        
        'local' : {
            'text' : 'Hello from local'
        },
        
        'dev'   : {
            'text' : 'Hello from dev'
        },
        
        'qa'    : {
            'text' : 'Hello from qa'
        },
        
        'prod'  : {
            'text' : 'Hello from prod'
        }
    };

    return environment;
});
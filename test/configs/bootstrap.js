// Additional config file

/* jslint browser: true */
/* global define */
define(function () {
    'use strict';
    
    var bootstrap = {
        
        'local' : {
            'text' : 'Bootstrapping from local'
        },
        
        'dev'   : {
            'text' : 'Bootstrapping from dev'
        },
        
        'qa'    : {
            'text' : 'Bootstrapping from qa'
        },
        
        'prod'  : {
            'text' : 'Bootstrapping from prod'
        }
    };

    return bootstrap;
});
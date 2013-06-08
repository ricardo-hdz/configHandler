require([
    'jquery',
    'configHandler',
    'configs/environment',
    'configs/bootstrap'
],
function ($, ConfigHandler, env, bootstrap) {
    module( "ConfigHandler Tests", {
        setup: function() {
            this.environmentMessage = ConfigHandler.getConfigKey('environment.text');
            this.bootstrapMessage = ConfigHandler.getConfigKey('bootstrap.text');
        }
    });

    test("Test get config key", function (){
        strictEqual(this.environmentMessage, env.local.text);
        strictEqual(this.bootstrapMessage, bootstrap.local.text);
    });
});

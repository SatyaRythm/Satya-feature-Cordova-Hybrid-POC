cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.salesforce.plugin.oauth",
      "file": "plugins/com.salesforce/www/com.salesforce.plugin.oauth.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.plugin.network",
      "file": "plugins/com.salesforce/www/com.salesforce.plugin.network.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.plugin.sdkinfo",
      "file": "plugins/com.salesforce/www/com.salesforce.plugin.sdkinfo.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.plugin.smartstore",
      "file": "plugins/com.salesforce/www/com.salesforce.plugin.smartstore.js",
      "pluginId": "com.salesforce",
      "clobbers": [
        "navigator.smartstore"
      ]
    },
    {
      "id": "com.salesforce.plugin.smartstore.client",
      "file": "plugins/com.salesforce/www/com.salesforce.plugin.smartstore.client.js",
      "pluginId": "com.salesforce",
      "clobbers": [
        "navigator.smartstoreClient"
      ]
    },
    {
      "id": "com.salesforce.plugin.sfaccountmanager",
      "file": "plugins/com.salesforce/www/com.salesforce.plugin.sfaccountmanager.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.plugin.mobilesync",
      "file": "plugins/com.salesforce/www/com.salesforce.plugin.mobilesync.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.util.bootstrap",
      "file": "plugins/com.salesforce/www/com.salesforce.util.bootstrap.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.util.event",
      "file": "plugins/com.salesforce/www/com.salesforce.util.event.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.util.exec",
      "file": "plugins/com.salesforce/www/com.salesforce.util.exec.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.util.logger",
      "file": "plugins/com.salesforce/www/com.salesforce.util.logger.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.util.promiser",
      "file": "plugins/com.salesforce/www/com.salesforce.util.promiser.js",
      "pluginId": "com.salesforce"
    },
    {
      "id": "com.salesforce.util.push",
      "file": "plugins/com.salesforce/www/com.salesforce.util.push.js",
      "pluginId": "com.salesforce"
    }
  ];
  module.exports.metadata = {
    "com.salesforce": "13.0.1"
  };
});
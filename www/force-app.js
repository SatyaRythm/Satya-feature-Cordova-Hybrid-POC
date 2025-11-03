/**
 * Salesforce Mobile SDK integration for Rhythm Mobile
 * This file bridges the Salesforce Mobile SDK with the existing LWC OAuth flow
 */

// Global namespace for our app
var RhythmApp = RhythmApp || {};

// Salesforce Mobile SDK integration
RhythmApp.SFMobileSDK = (function() {
    // Private variables
    var _authenticated = false;
    var _userInfo = null;
    var _isInitialized = false;
    
    // Public methods
    return {
        /**
         * Initialize the Salesforce Mobile SDK
         */
        init: function() {
            if (_isInitialized) {
                return;
            }
            
            document.addEventListener('deviceready', function() {
                console.log('Device ready - initializing Salesforce Mobile SDK bridge');
                
                // Register for Salesforce events
                document.addEventListener('salesforceready', RhythmApp.SFMobileSDK.onSalesforceReady, false);
                
                // Set up global OAuth callback handler (this will be called from the native layer)
                window.__rhythmHandleOAuthCallback = function(oauthData) {
                    console.log('Received OAuth callback from native layer', oauthData);
                    
                    // Forward the OAuth data to the existing LWC login component
                    const event = new CustomEvent('sf:oauth-callback', {
                        detail: oauthData,
                        bubbles: true,
                        cancelable: true
                    });
                    document.dispatchEvent(event);
                };
                
                // Check for pending OAuth data
                if (window.__rhythmPendingOAuth) {
                    console.log('Processing pending OAuth data');
                    window.__rhythmHandleOAuthCallback(window.__rhythmPendingOAuth);
                    window.__rhythmPendingOAuth = null;
                }
                
                _isInitialized = true;
                console.log('Salesforce Mobile SDK bridge initialized');
            }, false);
        },
        
        /**
         * Handler for when Salesforce Mobile SDK is ready
         */
        onSalesforceReady: function() {
            console.log('Salesforce Mobile SDK is ready');
            
            // Dispatch ready event
            const event = new CustomEvent('sf:ready', {
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
        },
        
        /**
         * Get Salesforce Mobile SDK version
         */
        getSDKVersion: function() {
            if (window.cordova && typeof window.cordova.require === 'function') {
                try {
                    const sdkInfo = window.cordova.require("com.salesforce.plugin.sdkinfo");
                    return sdkInfo.getInfo().sdkVersion;
                } catch (e) {
                    console.error('Error getting SDK version', e);
                    return 'unknown';
                }
            }
            return 'not available';
        },
        
        /**
         * Register a callback for the OAuth flow
         */
        registerOAuthCallback: function(callback) {
            if (typeof callback === 'function') {
                document.addEventListener('sf:oauth-callback', function(event) {
                    callback(event.detail);
                });
            }
        }
    };
})();

// Initialize the Salesforce Mobile SDK bridge when the script loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded - initializing Salesforce Mobile SDK bridge');
    RhythmApp.SFMobileSDK.init();
});
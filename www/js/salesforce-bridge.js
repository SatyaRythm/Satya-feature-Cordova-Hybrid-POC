/* eslint-disable @lwc/lwc/no-document-query */
/* eslint-disable @lwc/lwc/no-async-operation */
/**
 * Salesforce Bridge - Connects Salesforce Mobile SDK with LWC OAuth implementation
 * This file provides the bridge between the Salesforce Mobile SDK and the existing LWC OAuth flow
 */

(function() {
    // Wait for both document and cordova to be ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM ready - waiting for deviceready event');
        
        document.addEventListener('deviceready', function() {
            console.log('Device ready - initializing Salesforce bridge');
            initSalesforceBridge();
        }, false);
    });
    
    /**
     * Initialize the bridge between Salesforce Mobile SDK and LWC
     */
    function initSalesforceBridge() {
        console.log('Initializing Salesforce bridge for Rhythm Mobile');
        
        // Set up event listeners to forward OAuth events from the SDK to LWC
        document.addEventListener('sf:oauth-callback', function(event) {
            console.log('Received OAuth callback event, forwarding to LWC');
            forwardOAuthCallbackToLWC(event.detail);
        });
        
        // Listen for login events from LWC
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'lwc-oauth-start') {
                console.log('Received OAuth start request from LWC');
                // LWC is requesting to start OAuth flow
                // This is handled by the native Android code
            }
        });
        
        console.log('Salesforce bridge initialized');
    }
    
    /**
     * Forward OAuth callback data to LWC
     */
    function forwardOAuthCallbackToLWC(oauthData) {
        // Check if we have the main content iframe loaded
        const mainContent = document.getElementById('main');
        if (mainContent) {
            console.log('Forwarding OAuth data to LWC app');
            
            // Create a global function that the LWC app can call to get the OAuth data
            window.__getSalesforceOAuthData = function() {
                return oauthData;
            };
            
            // Dispatch an event that the LWC app can listen for
            const event = new CustomEvent('sf:oauth-data-available', {
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
        } else {
            console.log('Main content not loaded yet, storing OAuth data for later');
            // Store the data for later
            window.__pendingOAuthData = oauthData;
            
            // Check again in a second
            setTimeout(function() {
                if (window.__pendingOAuthData) {
                    forwardOAuthCallbackToLWC(window.__pendingOAuthData);
                    window.__pendingOAuthData = null;
                }
            }, 1000);
        }
    }
})();





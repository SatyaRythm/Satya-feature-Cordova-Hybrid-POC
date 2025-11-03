# Salesforce Mobile SDK Integration with LWC OSS

This document outlines the integration between the Salesforce Mobile SDK and the existing Lightning Web Components (LWC) Open Source application.

## Overview

The integration leverages the security features of the Salesforce Mobile SDK while maintaining the existing LWC OSS application's functionality and OAuth flow. This approach allows the application to pass Salesforce security reviews while preserving the existing user experience.

## Architecture

The integration follows these key principles:

1. **Salesforce Mobile SDK** provides the security container and native capabilities
2. **Existing OAuth Flow** is preserved and bridged to the Salesforce Mobile SDK
3. **LWC OSS Application** continues to function with minimal changes

## Components

### Android Native Components

- **RhythmApplication**: Custom Application class that initializes the Salesforce Mobile SDK
- **MainActivity**: Custom SalesforceActivity that bridges OAuth callbacks to the web layer
- **OAuthCallbackActivity**: Handles OAuth callbacks from the Salesforce authentication flow
- **SecureConfigProvider**: Securely stores OAuth configuration values
- **AndroidConfig**: JavaScript interface for accessing secure configuration values

### JavaScript Bridge Components

- **force-app.js**: Initializes the Salesforce Mobile SDK and provides core functionality
- **salesforce-bridge.js**: Bridges the Salesforce Mobile SDK with the LWC OAuth implementation

## OAuth Flow

1. User initiates login in the LWC application
2. The LWC OAuth service builds the authorization URL
3. The browser opens the Salesforce login page
4. After successful authentication, Salesforce redirects to the OAuth callback URL
5. The OAuthCallbackActivity intercepts the callback and extracts the authorization code
6. The MainActivity receives the code and injects it into the WebView
7. The LWC login component processes the authorization code and completes the OAuth flow

## Security Features

The integration leverages several security features from the Salesforce Mobile SDK:

- **Secure Storage**: OAuth tokens are stored in encrypted storage
- **Certificate Pinning**: HTTPS connections to Salesforce are validated with certificate pinning
- **Offline Authentication**: Users can authenticate offline with stored credentials
- **Secure Configuration**: OAuth client IDs and secrets are stored securely

## Integration Points

### 1. Native to Web Communication

The native Android code communicates with the web layer through:

```javascript
// Inject OAuth callback data into the WebView
webView.loadUrl("javascript:window.__rhythmHandleOAuthCallback({...})");
```

### 2. Web to Native Communication

The web layer can access native functionality through:

```javascript
// Access secure configuration values
const clientId = window.AndroidConfig.getConfigValue("SF_CLIENT_ID");
```

### 3. Event-Based Communication

Events are used to communicate between components:

```javascript
// Native OAuth callback triggers an event in the web layer
document.dispatchEvent(new CustomEvent('sf:oauth-callback', { 
    detail: oauthData 
}));
```

## Building and Deployment

### Prerequisites

- Android SDK 30+
- Cordova CLI 12.0.0+
- Salesforce Mobile SDK 13.0.0+
- Node.js 16+

### Build Process

1. Build the LWC OSS application:
   ```
   cd /path/to/Rhythm-Mobile-7
   npm run build
   ```

2. Build the Salesforce Hybrid App:
   ```
   cd SalesforceHybridApp
   cordova prepare android
   cordova build android
   ```

3. Deploy to a device:
   ```
   cordova run android
   ```

## Troubleshooting

### Common Issues

1. **OAuth Callback Not Working**
   - Verify the OAuth redirect URI matches exactly in both the connected app and bootconfig.json
   - Check that the AndroidManifest.xml has the correct intent filter for the callback URL

2. **Salesforce SDK Initialization Errors**
   - Check the Android logs for initialization errors
   - Verify that RhythmApplication is properly registered in AndroidManifest.xml

3. **JavaScript Bridge Not Working**
   - Verify that the AndroidConfig JavascriptInterface is properly added to the WebView
   - Check that the event listeners are properly set up in salesforce-bridge.js

## Resources

- [Salesforce Mobile SDK Documentation](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/overview.html)
- [LWC OSS Documentation](https://lwc.dev/)
- [Cordova Documentation](https://cordova.apache.org/docs/en/latest/)





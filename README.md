# Salesforce Hybrid Mobile SDK Integration with LWC OSS

This project integrates a Lightning Web Components Open Source (LWC OSS) application with the Salesforce Mobile SDK using a hybrid approach. This allows for better security compliance with Salesforce standards while maintaining the functionality of your existing LWC OSS application.

## Setup Instructions

### 1. Complete Salesforce Connected App Setup

1. Log in to your Salesforce org
2. Navigate to Setup > Apps > App Manager
3. Click "New Connected App"
4. Fill in the required fields:
   - Connected App Name: Rhythm Mobile
   - API Name: Rhythm_Mobile
   - Contact Email: [your email]
   - Enable OAuth Settings: Checked
   - Callback URL: `com.rhythm.innovations://auth/success`
   - Selected OAuth Scopes:
     - Access and manage your data (api)
     - Access your basic information (id, profile, email, address, phone)
     - Perform requests on your behalf at any time (refresh_token, offline_access)
5. Save the Connected App
6. After saving, note the Consumer Key (client ID) and Consumer Secret

### 2. Update bootconfig.json

Edit the `www/bootconfig.json` file and replace the placeholder values:

```json
{
    "remoteAccessConsumerKey": "YOUR_CONNECTED_APP_CONSUMER_KEY",
    "oauthRedirectURI": "com.rhythm.innovations://auth/success",
    "oauthScopes": [
        "web",
        "api"
    ],
    "isLocal": true,
    "startPage": "index.html",
    "errorPage": "error.html",
    "shouldAuthenticate": true,
    "attemptOfflineLoad": false,
    "androidPushNotificationClientId": ""
}
```

### 3. Build Your LWC OSS Application

1. From the root directory of your project, run:
   ```
   npm run build
   ```
   This will build your LWC OSS application into the `site` directory.

### 4. Prepare the Salesforce Hybrid App

1. Install required Cordova plugins (if not already installed):
   ```
   cd SalesforceHybridApp
   cordova plugin add salesforce-mobilesdk-cordova-plugin
   ```

2. Build the Android app:
   ```
   cordova prepare android
   cordova build android
   ```

### 5. Testing the Integration

1. Deploy the app to your Android device or emulator:
   ```
   cordova run android
   ```

2. The app should:
   - Launch with the Salesforce Mobile SDK
   - Prompt for Salesforce authentication
   - After authentication, load your LWC OSS application

## Troubleshooting

### Common Issues

1. **Authentication Failures**
   - Verify your Connected App settings in Salesforce
   - Check that the Consumer Key in bootconfig.json is correct
   - Ensure the OAuth redirect URI matches exactly

2. **LWC Content Not Loading**
   - Check that the LWC OSS build completed successfully
   - Verify the path to your site directory in the index.html file
   - Check browser console for any JavaScript errors

3. **Content Security Policy Issues**
   - If you encounter CSP errors, update the meta tag in index.html to include any additional domains

## Development Workflow

1. Make changes to your LWC OSS components in the main project
2. Run `npm run build` to build the updated LWC OSS application
3. Run `cordova prepare android` in the SalesforceHybridApp directory
4. Run `cordova run android` to deploy and test the changes

## Security Considerations

- The Salesforce Mobile SDK provides enhanced security features including:
  - Secure storage for OAuth tokens
  - PIN code protection
  - Offline authentication
  - Certificate pinning
  - Data encryption

- Always follow Salesforce security best practices:
  - Minimize OAuth scopes to only what's needed
  - Implement proper session management
  - Follow secure coding guidelines

## Resources

- [Salesforce Mobile SDK Documentation](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/overview.html)
- [LWC OSS Documentation](https://lwc.dev/)
- [Cordova Documentation](https://cordova.apache.org/docs/en/latest/)





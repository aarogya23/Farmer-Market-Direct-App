# Google OAuth Setup Guide

This guide explains how to set up Google OAuth for your Farmer Direct Market application.

## Prerequisites

- Google Cloud Project (create one at: https://console.cloud.google.com/)
- Backend running Spring Boot application
- Frontend React Native/Expo application

## Backend Setup

### 1. Get Google Client Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth2 Credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:8082/login/oauth2/code/google`
     - `http://YOUR_SERVER_IP:8082/login/oauth2/code/google`
   - Copy your **Client ID** and **Client Secret**

### 2. Update Backend Configuration

Edit `FarmerDirectMarkert/src/main/resources/application.properties`:

```properties
# OAuth2 - Google
spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
spring.security.oauth2.client.registration.google.scope=profile,email
spring.security.oauth2.client.provider.google.user-name-attribute=sub
```

Replace:
- `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID
- `YOUR_GOOGLE_CLIENT_SECRET` with your actual Client Secret

### 3. Backend Testing

Test the Google login endpoint:

```bash
curl -X POST http://localhost:8082/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{
    "idToken": "YOUR_GOOGLE_ID_TOKEN"
  }'
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd FarmerMarketDirectApp
npm install
```

### 2. Get Google Client IDs

You only need the Web Client ID for this implementation as we use Expo Auth Session with proxy.

#### For Web (Used for all platforms):
- Use the Web Client ID from earlier

### 3. Update Frontend Configuration

Edit `FarmerMarketDirectApp/components/google-sign-in-button.tsx`:

Ensure the `Google.useAuthRequest` call has your Web Client ID:

```typescript
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    responseType: ResponseType.IdToken,
    redirectUri,
  });
```

Replace `YOUR_GOOGLE_WEB_CLIENT_ID` with your actual Web Client ID.

### 4. Frontend Testing

The Google Sign-In button will appear on the login screen. Users can:
1. Tap "Continue with Google"
2. Select their Google account
3. Grant permissions
4. Be logged in automatically

## Troubleshooting

### Backend Issues

1. **Invalid ID Token**
   - Ensure the ID token is fresh (less than 1 hour old)
   - Verify the Client ID matches between frontend and backend

2. **CORS Errors**
   - Check that your frontend domain is allowed in CORS configuration
   - Update `GlobalExceptionHandler` if needed

3. **User Creation Fails**
   - Ensure the User entity has the correct fields
   - Check database connection and permissions

### Frontend Issues

1. **Sign-In Button Not Working**
   - Verify Google Play Services is installed (Android)
   - Check that Client IDs are correctly configured
   - Ensure app is signed with the correct keystore (Android)

2. **Token Not Received**
   - Check Google Play Services version
   - Verify SHA-1 fingerprint matches in console (Android)

3. **User Not Logged In**
   - Check that the backend returns a valid JWT token
   - Verify AsyncStorage is working
   - Check network requests in browser DevTools

## API Endpoints

### Login with Google
- **POST** `/api/auth/google`
- **Body**: 
  ```json
  {
    "idToken": "google_id_token_here"
  }
  ```
- **Query Parameters**: `role` (optional, defaults to BUYER)
- **Response**:
  ```json
  {
    "token": "jwt_token",
    "tokenType": "Bearer",
    "userId": "user_id",
    "fullName": "User Name",
    "email": "user@example.com",
    "role": "BUYER"
  }
  ```

## Security Best Practices

1. **Never commit credentials** to git
2. **Use environment variables** for sensitive data
3. **Keep ID tokens fresh** (regenerate hourly)
4. **Validate tokens on backend** before creating users
5. **Use HTTPS in production** for all OAuth flows
6. **Rotate Client Secrets regularly**

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Spring Boot OAuth2 Guide](https://spring.io/guides/tutorials/spring-boot-oauth2/)
- [React Native Google Sign-In](https://github.com/react-native-google-signin/google-signin)

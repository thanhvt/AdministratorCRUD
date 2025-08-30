# Keycloak Authentication Testing Guide

This guide provides comprehensive testing procedures for the Keycloak authentication integration in the AdministratorCRUD application.

## Prerequisites

1. **Keycloak Server**: Ensure Keycloak is running on `http://localhost:8080`
2. **Realm Configuration**: The `vss-dev` realm should be configured
3. **Client Configuration**: The `vss_app_uat` client should be properly configured
4. **Environment Variables**: All required environment variables should be set in `.env.local`

## Environment Setup

Verify your `.env.local` file contains:

```env
FRONTEND_CLIENT_ID=vss_app_uat
FRONTEND_CLIENT_SECRET=RvxLdTjPV55pKUJG2Cvgl3bxfpUoQY0r
AUTH_ISSUER=http://localhost:8080/realms/vss-dev
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=secret-auth-next-client
END_SESSION_URL=http://localhost:8080/realms/vss-dev/protocol/openid-connect/logout
REFRESH_TOKEN_URL=http://localhost:8080/realms/vss-dev/protocol/openid-connect/token
```

## Testing Scenarios

### 1. Login Flow Testing

#### Test Case 1.1: Successful Login
1. Navigate to `http://localhost:3000/login`
2. Click "Sign in with Keycloak"
3. **Expected**: Redirect to Keycloak login page
4. Enter valid credentials
5. **Expected**: Redirect back to application dashboard
6. **Verify**: User information displayed correctly

#### Test Case 1.2: Failed Login
1. Navigate to login page
2. Click "Sign in with Keycloak"
3. Enter invalid credentials
4. **Expected**: Error message displayed
5. **Expected**: Remain on Keycloak login page

#### Test Case 1.3: Login Cancellation
1. Navigate to login page
2. Click "Sign in with Keycloak"
3. Cancel the authentication process
4. **Expected**: Return to login page with appropriate error message

### 2. Route Protection Testing

#### Test Case 2.1: Unauthenticated Access
1. Open incognito/private browser window
2. Navigate directly to protected routes:
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/securities`
   - `http://localhost:3000/trading`
   - `http://localhost:3000/settings`
3. **Expected**: Redirect to login page for all routes

#### Test Case 2.2: Authenticated Access
1. Login successfully
2. Navigate to protected routes
3. **Expected**: Access granted to all routes
4. **Verify**: User interface displays correctly

### 3. Token Refresh Testing

#### Test Case 3.1: Automatic Token Refresh
1. Login successfully
2. Monitor browser network tab
3. Wait for token refresh (occurs 5 minutes before expiration)
4. **Expected**: Automatic refresh request to Keycloak
5. **Expected**: No user interruption
6. **Verify**: New tokens received and stored

#### Test Case 3.2: Failed Token Refresh
1. Login successfully
2. Manually invalidate refresh token (via Keycloak admin)
3. Wait for automatic refresh attempt
4. **Expected**: Automatic logout and redirect to login page
5. **Expected**: Error message displayed

### 4. Session Timeout Testing

#### Test Case 4.1: Session Warning
1. Login successfully
2. Remain inactive for 25 minutes (default warning time)
3. **Expected**: Session timeout warning modal appears
4. Click "Stay Logged In"
5. **Expected**: Session extended, modal disappears

#### Test Case 4.2: Automatic Logout
1. Login successfully
2. Remain inactive for 30 minutes (default timeout)
3. **Expected**: Automatic logout and redirect to login page
4. **Expected**: Session timeout message displayed

### 5. Logout Flow Testing

#### Test Case 5.1: Manual Logout
1. Login successfully
2. Click logout button in dashboard
3. **Expected**: Logout from both application and Keycloak
4. **Expected**: Redirect to login page
5. **Verify**: Cannot access protected routes without re-authentication

#### Test Case 5.2: Keycloak Session Termination
1. Login successfully
2. In another tab, logout from Keycloak admin console
3. Try to access protected routes in original tab
4. **Expected**: Automatic logout and redirect to login page

### 6. Error Handling Testing

#### Test Case 6.1: Network Errors
1. Login successfully
2. Disconnect network connection
3. Try to access protected routes
4. **Expected**: Appropriate error messages displayed
5. Reconnect network
6. **Expected**: Automatic recovery when possible

#### Test Case 6.2: Keycloak Server Down
1. Stop Keycloak server
2. Try to login
3. **Expected**: Connection error message displayed
4. Start Keycloak server
5. **Expected**: Login functionality restored

#### Test Case 6.3: Invalid Token Scenarios
1. Login successfully
2. Manually corrupt session token (via browser dev tools)
3. Try to access protected routes
4. **Expected**: Automatic logout and redirect to login page

### 7. Browser Compatibility Testing

Test all scenarios across different browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### 8. Mobile Responsiveness Testing

Test authentication flows on mobile devices:
- iOS Safari
- Android Chrome
- Responsive design verification

## Automated Testing

### Running Automated Tests

1. Open browser console on any page
2. Run: `runAuthTests()`
3. **Expected**: Comprehensive test results displayed in console

### Test Panel (Development Only)

1. Navigate to any page while in development mode
2. The AuthTestPanel component provides:
   - Session status monitoring
   - Quick action buttons
   - Automated test runner
   - Manual testing guide

## Performance Testing

### Load Testing
1. Simulate multiple concurrent logins
2. Monitor token refresh performance
3. Test session timeout handling under load

### Memory Testing
1. Monitor memory usage during long sessions
2. Verify proper cleanup on logout
3. Check for memory leaks in token refresh cycles

## Security Testing

### Token Security
1. Verify tokens are stored securely (httpOnly cookies)
2. Check token expiration times
3. Validate refresh token rotation

### CSRF Protection
1. Verify CSRF tokens are properly implemented
2. Test cross-site request forgery protection

### Session Security
1. Test session fixation protection
2. Verify secure cookie settings
3. Check session invalidation on logout

## Troubleshooting Common Issues

### Issue: Redirect Loop
- **Cause**: Misconfigured callback URLs
- **Solution**: Verify NEXTAUTH_URL matches application URL

### Issue: Token Refresh Fails
- **Cause**: Invalid client credentials or expired refresh token
- **Solution**: Check client configuration in Keycloak

### Issue: Session Not Persisting
- **Cause**: Cookie configuration issues
- **Solution**: Verify secure cookie settings match environment

### Issue: CORS Errors
- **Cause**: Keycloak CORS configuration
- **Solution**: Add application URL to Keycloak client CORS settings

## Monitoring and Logging

### Development Monitoring
- Check browser console for authentication logs
- Monitor network tab for token refresh requests
- Use AuthTestPanel for real-time session monitoring

### Production Monitoring
- Implement error tracking (Sentry, LogRocket)
- Monitor authentication success/failure rates
- Track token refresh performance metrics

## Success Criteria

All tests should pass with the following outcomes:
- ✅ Successful login and logout flows
- ✅ Proper route protection enforcement
- ✅ Automatic token refresh 5 minutes before expiration
- ✅ Session timeout warnings and automatic logout
- ✅ Comprehensive error handling and user feedback
- ✅ Secure token storage and management
- ✅ Cross-browser compatibility
- ✅ Mobile responsiveness

## Reporting Issues

When reporting authentication issues, include:
1. Browser and version
2. Steps to reproduce
3. Expected vs actual behavior
4. Console error messages
5. Network request details
6. Session state information

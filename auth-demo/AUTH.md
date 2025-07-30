# Authentication Implementation Guide

## Overview

This document provides a comprehensive overview of the authentication system implemented in the Trustbuilder AI platform dashboard. The system uses Supabase for authentication with email OTP (One-Time Password) as the sole authentication method, ensuring a passwordless and secure user experience.

## Architecture

### Technology Stack

- **Authentication Provider**: Supabase Auth
- **Authentication Method**: Email OTP (passwordless)
- **Session Management**: Client-side with React hooks
- **Routing**: React Router (HashRouter for static hosting)
- **Environment**: Static site deployment (GitHub Pages compatible)

### Key Components

#### 1. Supabase Configuration

- **Location**: `src/config.ts` and `src/lib/supabase.ts`
- **Purpose**: Centralized Supabase client initialization and auth wrapper functions
- **Environment Variables**: Uses `VITE_SUPABASE_PUBLIC_ANON_KEY` for API access

```typescript
// src/lib/supabase.ts
export const auth = {
  signInWithOtp: async (email: string) => {...},
  signOut: async () => {...},
  getSession: async () => {...},
  onAuthStateChange: (callback) => {...}
}
```

#### 2. Authentication Hook

- **Location**: `src/hooks/useAuth.ts`
- **Purpose**: Provides reactive session state management
- **Features**:
  - Automatic session initialization on mount
  - Real-time session updates via `onAuthStateChange`
  - Loading state management
  - TypeScript support for session types

```typescript
const { session, loading } = useAuth();
```

#### 3. Login Modal Component

- **Location**: `src/components/LoginModal.jsx`
- **Purpose**: User interface for email OTP authentication
- **Features**:
  - Email validation
  - Loading states during OTP sending
  - Success/error message display
  - Auto-close on successful OTP send

#### 4. Protected Card Component

- **Location**: `src/components/ProtectedCard.jsx`
- **Purpose**: Wrapper component for content requiring authentication
- **Features**:
  - Loading state while checking authentication
  - Unauthenticated state with login prompt
  - Automatic content display when authenticated
  - Role-based access control ready (via `requiredRole` prop)

## Authentication Flow

### 1. Login Process

1. User clicks "Login / Register" in the header
2. Login modal opens with email input
3. User enters email and submits
4. System calls `auth.signInWithOtp(email)`
5. Supabase sends OTP to user's email
6. Modal displays success message and closes
7. User checks email for OTP link

### 2. OTP Verification

1. User clicks the link in their email
2. Browser navigates to `/auth/callback` with token parameters
3. Callback component extracts `token_hash` and `type` from URL
4. System calls `supabase.auth.verifyOtp()` with parameters
5. On success: User is redirected to home page with active session
6. On failure: Error message is displayed with option to return home

### 3. Session Management

- Sessions are automatically persisted in browser storage
- `useAuth` hook provides session state throughout the app
- `onAuthStateChange` listener updates UI in real-time
- Session refresh is handled automatically by Supabase

### 4. Logout Process

1. User clicks their email in the header
2. Dropdown menu appears with "Log Out" option
3. User clicks "Log Out"
4. System calls `auth.signOut()`
5. Session is cleared and UI updates immediately

## Development Guide

### Using Protected Components

To protect any component or content that requires authentication:

```jsx
import { ProtectedCard } from "./components/ProtectedCard";

function MyProtectedContent() {
  return (
    <ProtectedCard>
      <div>
        <h2>Sensitive Content</h2>
        <p>This content is only visible to authenticated users</p>
      </div>
    </ProtectedCard>
  );
}
```

### Adding Role-Based Access Control

The ProtectedCard component is designed to support role-based access:

```jsx
<ProtectedCard requiredRole="admin">
  <AdminPanel />
</ProtectedCard>
```

Note: Role checking logic needs to be implemented based on your user metadata structure.

### Accessing User Session

To access the current user session in any component:

```jsx
import { useAuth } from "../hooks/useAuth";

function MyComponent() {
  const { session, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (session) {
    return <div>Welcome, {session.user.email}!</div>;
  }

  return <div>Please log in</div>;
}
```

### Environment Setup

1. Create a `.env` file in the project root:

```env
VITE_SUPABASE_PUBLIC_ANON_KEY=your-supabase-anon-key
```

2. Ensure the Supabase project URL matches the one in `src/config.ts`

3. Configure Supabase Auth settings:
   - Enable Email provider
   - Set up email templates for OTP
   - Configure redirect URLs for your domain

## Security Considerations

1. **Client-Side Only**: All authentication logic runs client-side for static hosting compatibility
2. **No Passwords**: Email OTP eliminates password-related vulnerabilities
3. **Secure Tokens**: Authentication tokens are managed by Supabase and stored securely
4. **HTTPS Required**: Always deploy to HTTPS-enabled hosts for secure token transmission
5. **Environment Variables**: Never commit API keys to version control

## Future Enhancements

### Potential Improvements

1. **Multi-Factor Authentication**: Add SMS or TOTP as second factor
2. **Social Login**: Integrate OAuth providers (Google, GitHub, etc.)
3. **User Profiles**: Extend user metadata with profile information
4. **Role Management**: Implement comprehensive RBAC system
5. **Session Timeout**: Add configurable session expiration
6. **Remember Me**: Implement persistent sessions option

### API Integration

When backend APIs are added:

1. Include session token in API requests
2. Validate tokens server-side
3. Implement refresh token rotation
4. Add request interceptors for auth headers

## Troubleshooting

### Common Issues

1. **"Missing VITE_SUPABASE_PUBLIC_ANON_KEY"**
   - Ensure `.env` file exists with the correct key
   - Restart the development server after adding env variables

2. **OTP Email Not Received**
   - Check spam folder
   - Verify email address is correct
   - Check Supabase email settings and quotas

3. **Callback Route Not Working**
   - Ensure HashRouter is configured correctly
   - Verify `/auth/callback` route is registered
   - Check browser console for token parsing errors

4. **Session Not Persisting**
   - Clear browser storage and try again
   - Check for third-party cookie blocking
   - Verify Supabase client initialization

## Maintenance

### Regular Tasks

1. Monitor Supabase auth logs for suspicious activity
2. Update Supabase client library regularly
3. Review and rotate API keys periodically
4. Test auth flow after any routing changes
5. Keep email templates up to date

### Monitoring

- Track authentication success/failure rates
- Monitor OTP email delivery rates
- Set up alerts for authentication errors
- Review user session analytics

This authentication system provides a secure, user-friendly foundation for the Trustbuilder AI platform while maintaining compatibility with static hosting requirements.

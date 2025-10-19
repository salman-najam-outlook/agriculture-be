# Device Identification and New Device Login Notification Feature

## Overview
This feature implements device identification and notification system that alerts users when their account is accessed from a new device. This enhances security by helping users detect unauthorized access attempts.

## Features

### 1. **Automatic Device Identification**
- Automatically identifies and records devices during login
- Uses device fingerprinting based on:
  - Browser name and version
  - Operating system and version
  - Device type (mobile, tablet, desktop)
  - IP address
  - User agent string

### 2. **New Device Notifications**
When a user logs in from a new device, they receive notifications through multiple channels:
- **Push Notification**: Sent to all registered devices
- **Email Notification**: Detailed email with device information
- **In-App Notification**: Stored in the notification center

### 3. **Device Management**
Users can view and manage their trusted devices through API endpoints.

## Database Schema

### UserDevices Table
```sql
- id: INTEGER (Primary Key)
- userId: INTEGER (Foreign Key to users table)
- deviceId: STRING(255) (Unique device identifier hash)
- deviceType: STRING(50) (mobile, tablet, desktop)
- browser: STRING(100)
- browserVersion: STRING(50)
- os: STRING(100)
- osVersion: STRING(50)
- deviceName: STRING(255) (Friendly name)
- ipAddress: STRING(45)
- userAgent: TEXT
- lastUsedAt: DATE
- isTrusted: BOOLEAN
- createdAt: DATE
- updatedAt: DATE
```

## API Endpoints

### 1. Login Endpoint (Enhanced)
**POST** `/admin/login`

The existing login endpoint now includes automatic device identification.

**Request:**
```json
{
  "credential": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "code": 200,
  "message": "Logged in successfully.",
  "data": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "sideBarMenu": [...],
    "moduleAndPermissions": [...]
  }
}
```

**Note:** Device identification happens in the background and doesn't affect the response structure.

### 2. Get User Devices
**GET** `/admin/devices`

Retrieve all devices that have been used to login to the account.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "code": 200,
  "message": "Devices retrieved successfully",
  "data": {
    "devices": [
      {
        "id": 1,
        "deviceId": "abc123...",
        "deviceName": "Chrome on Windows Computer",
        "deviceType": "desktop",
        "browser": "Chrome",
        "browserVersion": "120.0.0",
        "os": "Windows",
        "osVersion": "10",
        "ipAddress": "192.168.1.1",
        "lastUsedAt": "2025-10-18T10:30:00.000Z",
        "isTrusted": true,
        "createdAt": "2025-10-01T08:00:00.000Z"
      },
      {
        "id": 2,
        "deviceId": "def456...",
        "deviceName": "Safari on iOS Mobile",
        "deviceType": "mobile",
        "browser": "Safari",
        "browserVersion": "17.0",
        "os": "iOS",
        "osVersion": "17.1",
        "ipAddress": "192.168.1.2",
        "lastUsedAt": "2025-10-18T09:15:00.000Z",
        "isTrusted": true,
        "createdAt": "2025-10-05T12:00:00.000Z"
      }
    ]
  }
}
```

### 3. Remove Device
**DELETE** `/admin/devices/:deviceId`

Remove a specific device from the user's list of trusted devices.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parameters:**
- `deviceId` (path parameter): The ID of the device to remove

**Response:**
```json
{
  "success": true,
  "code": 200,
  "message": "Device removed successfully"
}
```

## Notification Format

### Email Notification
Users receive a detailed email when logging in from a new device:

**Subject:** 🔐 New Device Login Alert - Dimitra

**Content includes:**
- Device name
- Browser and version
- Operating system and version
- IP address
- Login timestamp
- Security warning if login wasn't authorized

### Push Notification
```json
{
  "type": "security_alert",
  "title": "New Device Login",
  "body": "Login detected from a new device: Chrome on Windows Computer. IP: 192.168.1.1. Time: [timestamp]",
  "data": {
    "deviceName": "Chrome on Windows Computer",
    "browser": "Chrome",
    "os": "Windows",
    "ipAddress": "192.168.1.1",
    "timestamp": "2025-10-18T10:30:00.000Z"
  }
}
```

## Implementation Details

### Device Fingerprinting
The system creates a unique device fingerprint using:
```javascript
SHA256(browser + browserVersion + os + osVersion + deviceType + ipAddress)
```

This ensures that the same device is consistently identified even across sessions.

### Security Considerations
1. **Non-blocking**: Device identification runs in a try-catch block to ensure login process isn't interrupted if identification fails
2. **Privacy**: Device information is stored securely and only accessible by the account owner
3. **Notifications**: Multiple notification channels ensure users are promptly informed of security events
4. **IP Tracking**: IP addresses are logged to help identify suspicious login patterns

### Error Handling
If device identification fails:
- The error is logged for debugging
- The login process continues normally
- Users are not notified of the identification failure
- No device record is created

## Installation & Setup

### 1. Install Dependencies
```bash
npm install ua-parser-js crypto-js
```

### 2. Run Database Migration
```bash
npx sequelize-cli db:migrate
```

This will create the `user_devices` table with all necessary fields and indexes.

### 3. Test the Feature
1. Log in to the application
2. Check your email for the new device notification
3. Use the `/admin/devices` endpoint to view your devices
4. Try logging in from a different browser or device to see the notification

## Files Modified/Created

### New Files:
1. `database/migrations/20251018000001-create-user-devices.js` - Migration file
2. `models/userDevices.js` - Sequelize model
3. `helpers/deviceIdentification.js` - Core logic for device identification
4. `DEVICE_IDENTIFICATION_FEATURE.md` - This documentation

### Modified Files:
1. `routes/admin/index.js` - Enhanced login route, added device management endpoints
2. `package.json` - Added ua-parser-js and crypto-js dependencies

## Usage Example

### Frontend Integration
```javascript
// Login function
async function login(credential, password) {
  const response = await fetch('/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ credential, password })
  });
  
  const data = await response.json();
  
  if (data.success) {
    // User logged in successfully
    // Device identification happens automatically in the background
    console.log('Login successful');
    
    // Optionally, fetch user's devices
    const devicesResponse = await fetch('/admin/devices', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const devicesData = await devicesResponse.json();
    console.log('User devices:', devicesData.data.devices);
  }
}

// Remove a device
async function removeDevice(deviceId) {
  const response = await fetch(`/admin/devices/${deviceId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  const data = await response.json();
  
  if (data.success) {
    console.log('Device removed successfully');
  }
}
```

## Future Enhancements

Potential improvements for this feature:
1. **Geolocation**: Add approximate location based on IP address
2. **Device Trust Levels**: Implement different trust levels for devices
3. **Suspicious Activity Detection**: Flag logins from unusual locations or patterns
4. **Two-Factor Authentication**: Require 2FA for new device logins
5. **Device Nicknames**: Allow users to set custom names for their devices
6. **Login History**: Show detailed login history for each device
7. **Block/Unblock Devices**: Allow users to block specific devices
8. **Session Management**: Link devices to active sessions for better control

## Troubleshooting

### Issue: Notifications not being sent
**Solution:** 
- Verify Firebase configuration is correct
- Check that user has valid device registration tokens
- Ensure email service is properly configured

### Issue: Same device showing as new device
**Solution:**
- Check if IP address changes frequently (VPN, mobile network)
- Verify user agent string consistency
- Review device fingerprint generation logic

### Issue: Migration fails
**Solution:**
- Ensure database connection is active
- Check for existing table with same name
- Verify user has proper database permissions

## Support
For questions or issues related to this feature, please contact the development team or create an issue in the project repository.

---
**Last Updated:** October 18, 2025
**Version:** 1.0.0



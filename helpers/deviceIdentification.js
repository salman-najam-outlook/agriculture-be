'use strict';

const UAParser = require('ua-parser-js');
const crypto = require('crypto');
const db = require(rootPath + '/models');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { SendNotificationToMultipleDevices, CreateAdminNotification } = require(rootPath + '/helpers/systemNotifications');
const { sendEmail } = require(rootPath + '/helpers/general');

/**
 * Extract IP address from request
 * @param {Object} req - Express request object
 * @returns {String} IP address
 */
const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() ||
         req.headers['x-real-ip'] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         req.connection?.socket?.remoteAddress ||
         'unknown';
};

/**
 * Parse user agent and extract device information
 * @param {String} userAgent - User agent string
 * @returns {Object} Parsed device information
 */
const parseUserAgent = (userAgent) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return {
    browser: result.browser.name || 'Unknown',
    browserVersion: result.browser.version || '',
    os: result.os.name || 'Unknown',
    osVersion: result.os.version || '',
    deviceType: result.device.type || 'desktop', // mobile, tablet, desktop, etc.
    deviceModel: result.device.model || '',
    deviceVendor: result.device.vendor || ''
  };
};

/**
 * Generate a unique device fingerprint
 * @param {Object} deviceInfo - Device information
 * @param {String} ipAddress - IP address
 * @returns {String} Device ID (hash)
 */
const generateDeviceId = (deviceInfo, ipAddress) => {
  // Create a fingerprint based on device characteristics
  const fingerprint = `${deviceInfo.browser}-${deviceInfo.browserVersion}-${deviceInfo.os}-${deviceInfo.osVersion}-${deviceInfo.deviceType}-${ipAddress}`;
  
  // Generate a hash of the fingerprint
  return crypto.createHash('sha256').update(fingerprint).digest('hex');
};

/**
 * Generate a friendly device name
 * @param {Object} deviceInfo - Device information
 * @returns {String} Friendly device name
 */
const generateDeviceName = (deviceInfo) => {
  const deviceType = deviceInfo.deviceType === 'desktop' ? 'Computer' : 
                     deviceInfo.deviceType === 'mobile' ? 'Mobile' :
                     deviceInfo.deviceType === 'tablet' ? 'Tablet' : 'Device';
  
  return `${deviceInfo.browser} on ${deviceInfo.os} ${deviceType}`;
};

/**
 * Send notification for new device login
 * @param {Object} user - User object
 * @param {Object} deviceInfo - Device information
 * @param {String} ipAddress - IP address
 */
const sendNewDeviceNotification = async (user, deviceInfo, ipAddress) => {
  try {
    const deviceName = generateDeviceName(deviceInfo);
    const timestamp = new Date().toLocaleString('en-US', { 
      dateStyle: 'full', 
      timeStyle: 'long' 
    });

    // Create notification message
    const notificationMessage = {
      type: 'security_alert',
      title: 'New Device Login',
      body: `Login detected from a new device: ${deviceName}. IP: ${ipAddress}. Time: ${timestamp}`,
      data: {
        deviceName,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        ipAddress,
        timestamp: new Date().toISOString()
      }
    };

    // Send push notification to user's devices
    try {
      await SendNotificationToMultipleDevices(
        user.id,
        JSON.stringify(notificationMessage)
      );
    } catch (err) {
      console.log('Failed to send push notification:', err.message);
    }

    // Create admin notification for security log
    try {
      await CreateAdminNotification(
        user.id,
        user.id,
        `New device login detected for ${user.email || user.mobile}`,
        {
          type: 'security_alert',
          title: 'New Device Login',
          deviceName,
          ipAddress,
          timestamp: new Date().toISOString()
        }
      );
    } catch (err) {
      console.log('Failed to create admin notification:', err.message);
    }

    // Send email notification if user has email
    if (user.email) {
      try {
        const emailHtml = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #4CAF50; }
                .detail-row { margin: 10px 0; }
                .detail-label { font-weight: bold; display: inline-block; width: 150px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                .warning { color: #d9534f; font-weight: bold; margin-top: 15px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🔐 New Device Login Alert</h2>
                </div>
                <div class="content">
                  <p>Hello ${user.firstName || 'User'},</p>
                  <p>We detected a login to your account from a new device. If this was you, you can safely ignore this email.</p>
                  
                  <div class="details">
                    <h3>Login Details:</h3>
                    <div class="detail-row">
                      <span class="detail-label">Device:</span>
                      <span>${deviceName}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Browser:</span>
                      <span>${deviceInfo.browser} ${deviceInfo.browserVersion}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Operating System:</span>
                      <span>${deviceInfo.os} ${deviceInfo.osVersion}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">IP Address:</span>
                      <span>${ipAddress}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Time:</span>
                      <span>${timestamp}</span>
                    </div>
                  </div>

                  <p class="warning">
                    ⚠️ If you did not perform this login, please contact our support team immediately and change your password.
                  </p>
                </div>
                <div class="footer">
                  <p>This is an automated security notification from Dimitra Agriculture Platform.</p>
                  <p>© ${new Date().getFullYear()} Dimitra. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `;

        await sendEmail({
          to: user.email,
          subject: '🔐 New Device Login Alert - Dimitra',
          html: emailHtml
        });
      } catch (err) {
        console.log('Failed to send email notification:', err.message);
      }
    }

  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log('Error sending new device notification:', err.message);
  }
};

/**
 * Identify and record device login
 * @param {Object} req - Express request object
 * @param {Object} user - User object
 * @returns {Object} Device record and isNewDevice flag
 */
const identifyAndRecordDevice = async (req, user) => {
  try {
    const userAgent = req.headers['user-agent'] || '';
    const ipAddress = getClientIp(req);

    // Parse device information
    const deviceInfo = parseUserAgent(userAgent);

    // Generate device ID
    const deviceId = generateDeviceId(deviceInfo, ipAddress);

    // Generate friendly device name
    const deviceName = generateDeviceName(deviceInfo);

    // Check if device already exists for this user
    let device = await db.UserDevices.findOne({
      where: {
        userId: user.id,
        deviceId: deviceId
      }
    });

    let isNewDevice = false;

    if (device) {
      // Update last used timestamp
      await device.update({
        lastUsedAt: new Date(),
        ipAddress: ipAddress // Update IP in case it changed
      });
    } else {
      // Create new device record
      device = await db.UserDevices.create({
        userId: user.id,
        deviceId: deviceId,
        deviceType: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        browserVersion: deviceInfo.browserVersion,
        os: deviceInfo.os,
        osVersion: deviceInfo.osVersion,
        deviceName: deviceName,
        ipAddress: ipAddress,
        userAgent: userAgent,
        lastUsedAt: new Date(),
        isTrusted: true
      });

      isNewDevice = true;

      // Send notification for new device
      await sendNewDeviceNotification(user, deviceInfo, ipAddress);
    }

    return {
      device,
      isNewDevice,
      deviceInfo
    };

  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log('Error identifying device:', err.message);
    throw err;
  }
};

/**
 * Get all devices for a user
 * @param {Number} userId - User ID
 * @returns {Array} List of devices
 */
const getUserDevices = async (userId) => {
  try {
    const devices = await db.UserDevices.findAll({
      where: { userId },
      order: [['lastUsedAt', 'DESC']]
    });

    return devices;
  } catch (err) {
    logErrorOccurred(__filename, err);
    throw err;
  }
};

/**
 * Remove a device for a user
 * @param {Number} userId - User ID
 * @param {Number} deviceId - Device ID
 * @returns {Boolean} Success status
 */
const removeUserDevice = async (userId, deviceId) => {
  try {
    const result = await db.UserDevices.destroy({
      where: {
        userId,
        id: deviceId
      }
    });

    return result > 0;
  } catch (err) {
    logErrorOccurred(__filename, err);
    throw err;
  }
};

module.exports = {
  getClientIp,
  parseUserAgent,
  generateDeviceId,
  generateDeviceName,
  sendNewDeviceNotification,
  identifyAndRecordDevice,
  getUserDevices,
  removeUserDevice
};



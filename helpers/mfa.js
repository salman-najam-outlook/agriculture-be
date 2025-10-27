const db = require(rootPath + "/models");
const { createPassword, verifyHash } = require(rootPath + "/helpers/hash");
const { createOTP, sendSMS, sendEmail } = require(rootPath + "/helpers/general");
const { Op } = require("sequelize");

// Constants
const MFA_OTP_EXPIRY_MINUTES = 10;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 30;

/**
 * Generate and send MFA OTP to user
 * @param {Object} user - User object
 * @returns {Promise<Object>} - Result object with success status and message
 */
async function generateAndSendMfaOtp(user) {
  try {
    // Check if MFA is locked
    if (user.mfa_locked_until && new Date(user.mfa_locked_until) > new Date()) {
      const lockTimeRemaining = Math.ceil(
        (new Date(user.mfa_locked_until) - new Date()) / 1000 / 60
      );
      return {
        success: false,
        message: `MFA is locked. Please try again after ${lockTimeRemaining} minutes.`,
        locked: true,
      };
    }

    // Generate 6-digit OTP
    const otp = await createOTP();
    const otpHash = await createPassword(otp.toString());

    // Calculate expiry time
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + MFA_OTP_EXPIRY_MINUTES);

    // Invalidate any previous unused OTPs for this user
    await db.UserMfaOtps.update(
      { used: true },
      {
        where: {
          user_id: user.id,
          used: false,
        },
      }
    );

    // Store OTP hash in database
    await db.UserMfaOtps.create({
      user_id: user.id,
      otp_hash: otpHash,
      method: user.mfa_method,
      expires_at: expiresAt,
      used: false,
    });

    // Send OTP based on method
    let sent = false;
    if (user.mfa_method === "email") {
      // Send OTP via email
      const emailData = {
        to: user.email,
        subject: "Your MFA Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Multi-Factor Authentication</h2>
            <p>Hello ${user.firstName || "User"},</p>
            <p>Your verification code is:</p>
            <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This code will expire in ${MFA_OTP_EXPIRY_MINUTES} minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">This is an automated message, please do not reply.</p>
          </div>
        `,
      };
      await sendEmail(emailData);
      sent = true;
    } else if (user.mfa_method === "mobile") {
      // Send OTP via SMS
      const smsData = {
        to: `${user.countryCode}${user.mobile}`,
        body: `Your MFA verification code is: ${otp}. Valid for ${MFA_OTP_EXPIRY_MINUTES} minutes.`,
      };
      await sendSMS(smsData);
      sent = true;
    }

    if (sent) {
      return {
        success: true,
        message: `OTP sent successfully to your ${user.mfa_method}.`,
        method: user.mfa_method,
        expiresAt,
      };
    } else {
      return {
        success: false,
        message: "Failed to send OTP. Invalid method.",
      };
    }
  } catch (error) {
    console.error("Error generating MFA OTP:", error);
    throw error;
  }
}

/**
 * Verify MFA OTP
 * @param {number} userId - User ID
 * @param {string} otp - OTP to verify
 * @returns {Promise<Object>} - Result object with success status and message
 */
async function verifyMfaOtp(userId, otp) {
  try {
    // Get user with MFA settings
    const user = await db.user.findOne({
      where: { id: userId },
      attributes: [
        "id",
        "failed_mfa_attempts",
        "last_failed_attempt_at",
        "mfa_locked_until",
      ],
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    // Check if MFA is locked
    if (user.mfa_locked_until && new Date(user.mfa_locked_until) > new Date()) {
      const lockTimeRemaining = Math.ceil(
        (new Date(user.mfa_locked_until) - new Date()) / 1000 / 60
      );
      return {
        success: false,
        message: `MFA is locked. Please try again after ${lockTimeRemaining} minutes.`,
        locked: true,
      };
    }

    // Find valid OTP
    const otpRecord = await db.UserMfaOtps.findOne({
      where: {
        user_id: userId,
        used: false,
        expires_at: {
          [Op.gt]: new Date(),
        },
      },
      order: [["created_at", "DESC"]],
    });

    if (!otpRecord) {
      // Increment failed attempts
      await incrementFailedMfaAttempts(userId);
      return {
        success: false,
        message: "OTP is invalid or has expired. Please request a new one.",
      };
    }

    // Verify OTP
    const isValid = await verifyHash(otp.toString(), otpRecord.otp_hash);

    if (!isValid) {
      // Increment failed attempts
      await incrementFailedMfaAttempts(userId);
      return {
        success: false,
        message: "Invalid OTP. Please try again.",
      };
    }

    // Mark OTP as used
    await db.UserMfaOtps.update(
      { used: true },
      { where: { id: otpRecord.id } }
    );

    // Reset failed attempts
    await db.user.update(
      {
        failed_mfa_attempts: 0,
        last_failed_attempt_at: null,
        mfa_locked_until: null,
      },
      { where: { id: userId } }
    );

    return {
      success: true,
      message: "OTP verified successfully.",
    };
  } catch (error) {
    console.error("Error verifying MFA OTP:", error);
    throw error;
  }
}

/**
 * Increment failed MFA attempts and lock if necessary
 * @param {number} userId - User ID
 */
async function incrementFailedMfaAttempts(userId) {
  try {
    const user = await db.user.findOne({
      where: { id: userId },
      attributes: ["id", "failed_mfa_attempts"],
    });

    if (!user) return;

    const newFailedAttempts = (user.failed_mfa_attempts || 0) + 1;
    const updateData = {
      failed_mfa_attempts: newFailedAttempts,
      last_failed_attempt_at: new Date(),
    };

    // Lock MFA if max attempts reached
    if (newFailedAttempts >= MAX_FAILED_ATTEMPTS) {
      const lockUntil = new Date();
      lockUntil.setMinutes(lockUntil.getMinutes() + LOCKOUT_DURATION_MINUTES);
      updateData.mfa_locked_until = lockUntil;
    }

    await db.user.update(updateData, { where: { id: userId } });
  } catch (error) {
    console.error("Error incrementing failed MFA attempts:", error);
  }
}

/**
 * Check if user requires MFA
 * @param {Object} user - User object
 * @returns {boolean} - True if MFA is required
 */
function isMfaRequired(user) {
  return user.is_mfa_enabled === 1 || user.is_mfa_enabled === true;
}

/**
 * Clean up expired OTPs (should be run periodically)
 */
async function cleanupExpiredOtps() {
  try {
    const result = await db.UserMfaOtps.destroy({
      where: {
        expires_at: {
          [Op.lt]: new Date(),
        },
      },
    });
    console.log(`Cleaned up ${result} expired MFA OTPs`);
    return result;
  } catch (error) {
    console.error("Error cleaning up expired OTPs:", error);
    throw error;
  }
}

/**
 * Enable MFA for a user
 * @param {number} userId - User ID
 * @param {string} method - MFA method (email or mobile)
 */
async function enableMfa(userId, method = "email") {
  try {
    await db.user.update(
      {
        is_mfa_enabled: 1,
        mfa_method: method,
        mfa_enrolled_at: new Date(),
        failed_mfa_attempts: 0,
        last_failed_attempt_at: null,
        mfa_locked_until: null,
      },
      { where: { id: userId } }
    );
    return { success: true, message: "MFA enabled successfully." };
  } catch (error) {
    console.error("Error enabling MFA:", error);
    throw error;
  }
}

/**
 * Disable MFA for a user
 * @param {number} userId - User ID
 */
async function disableMfa(userId) {
  try {
    // Invalidate all existing OTPs
    await db.UserMfaOtps.update(
      { used: true },
      { where: { user_id: userId } }
    );

    // Disable MFA
    await db.user.update(
      {
        is_mfa_enabled: 0,
        failed_mfa_attempts: 0,
        last_failed_attempt_at: null,
        mfa_locked_until: null,
      },
      { where: { id: userId } }
    );
    return { success: true, message: "MFA disabled successfully." };
  } catch (error) {
    console.error("Error disabling MFA:", error);
    throw error;
  }
}

module.exports = {
  generateAndSendMfaOtp,
  verifyMfaOtp,
  incrementFailedMfaAttempts,
  isMfaRequired,
  cleanupExpiredOtps,
  enableMfa,
  disableMfa,
  MFA_OTP_EXPIRY_MINUTES,
  MAX_FAILED_ATTEMPTS,
  LOCKOUT_DURATION_MINUTES,
};


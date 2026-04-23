export const verificationEmailTemplate = (verifyUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0;">
    <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
    <p style="color: #555; text-align: center; font-size: 16px;">
      Click the button below to verify your email address.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${verifyUrl}" style="display: inline-block; padding: 12px 32px; background: #00be3c; color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 500; font-size: 16px;">
        Verify Email
      </a>
    </div>
    <p style="color: #999; text-align: center; font-size: 12px;">
      If you didn't create an account, you can ignore this email.
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
    <p style="color: #999; text-align: center; font-size: 12px;">
      This link expires in 1 hour.
    </p>
  </div>
`;

export const resetPwEmailTemplate = (resetUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0;">
    <h1 style="color: #333; text-align: center;">Reset your password</h1>
    <p style="color: #555; text-align: center; font-size: 16px;">
      Click the button below to reset your password.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 32px; background: #00be3c; color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 500; font-size: 16px;">
        Reset Password
      </a>
    </div>
    <p style="color: #999; text-align: center; font-size: 12px;">
      If you didn't request this, you can ignore this email.
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
    <p style="color: #999; text-align: center; font-size: 12px;">
      This link expires in 1 hour.
    </p>
  </div>
`;

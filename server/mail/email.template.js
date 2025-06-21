export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1E88E5, #43A047); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to SportConnect!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello Champion,</p>
    <p>Thanks for joining our community of sports enthusiasts! Your email verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1E88E5;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to activate your SportConnect account.</p>
    <p>The code will expire in 15 minutes for your safety.</p>
    <p>If this wasn’t you, feel free to ignore this message.</p>
    <p>Stay sporty!<br>The SportConnect Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>
</body>
</html>
`;



export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1E88E5, #43A047); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Request</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi Player,</p>
    <p>We received a request to reset your password on SportConnect.</p>
    <p>If you made this request, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #1E88E5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn’t request this, no action is needed.</p>
    <p>Teamwork makes the dream work!<br>The SportConnect Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>
</body>
</html>
`;
export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1E88E5, #43A047); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Changed!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hey Sportster,</p>
    <p>We’re confirming that your password has been successfully changed.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #43A047; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you didn’t request this, please contact our support team right away.</p>
    <p>Keep your account secure:</p>
    <ul>
      <li>Use strong and unique passwords</li>
      <li>Enable 2-factor authentication</li>
      <li>Avoid reusing passwords</li>
    </ul>
    <p>Stay secure and keep playing!<br>— The SportConnect Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>
</body>
</html>
`;

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SportsCommunity" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your email - SportsCommunity',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome to SportsCommunity! 🏅</h2>
          <p>Thanks for joining us! Please use the verification code below to activate your account:</p>
          <div style="font-size: 24px; font-weight: bold; color: #1E88E5; margin: 20px 0;">
            ${verificationToken}
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>Let the games begin!<br>— The SportsCommunity Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
  } catch (error) {
    console.error('❌ Error sending verification email:', error.message);
    throw new Error('Failed to send verification email');
  }
};

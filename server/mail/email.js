import nodemailer from "nodemailer";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./email.template.js";

// Setup transporter (using Gmail as an example – adjust based on your SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail", // or use host, port, secure, auth manually for custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Common sendMail function
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"SportConnect Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent: ${info.response}`);
  } catch (error) {
    console.error(`❌ Failed to send email:`, error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

export const sendVerificationEmail = async (email, verificationToken) => {
  await sendEmail({
    to: email,
    subject: "Verify your SportConnect Email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
  });
};

export const sendWelcomeEmail = async (email, name) => {
  const html = `
    <h1>Welcome to SportConnect, ${name}!</h1>
    <p>We're thrilled to have you join our sports community. Start connecting and playing today!</p>
    <p>– The SportConnect Team</p>
  `;
  await sendEmail({
    to: email,
    subject: "Welcome to SportConnect!",
    html,
  });
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  await sendEmail({
    to: email,
    subject: "Reset Your SportConnect Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
  });
};

export const sendResetSuccessEmail = async (email) => {
  await sendEmail({
    to: email,
    subject: "Your SportConnect Password Was Reset",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  });
};

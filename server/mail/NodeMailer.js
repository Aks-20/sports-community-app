import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail", // or use host/port if custom SMTP
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address or SMTP username
    pass: process.env.EMAIL_PASS, // App password or SMTP password
  },
});

export const sender = {
  name: "SportConnect Team",
  email: process.env.EMAIL_USER,
};

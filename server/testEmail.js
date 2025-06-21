import dotenv from "dotenv";
import { sendVerificationEmail } from "./controllers/sendMail.controller.js"; // adjust path if needed

dotenv.config();

const testEmail = async () => {
  const testRecipient = "akshat22csu312@ncuindia.edu"; // replace with your email
  const testCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

  try {
    await sendVerificationEmail(testRecipient, testCode);
    console.log("✅ Test email sent successfully to", testRecipient);
  } catch (err) {
    console.error("❌ Error sending test email:", err.message);
  }
};

testEmail();

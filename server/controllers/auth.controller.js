import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from './sendMail.controller.js'; // ✅ named import

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hrs
    });

    await user.save();

    // Set JWT token in cookie
    generateTokenAndSetCookie(res, user._id);

    // ✅ Send verification email
    try {
      await sendVerificationEmail(user.email, verificationToken);
      console.log("✅ Verification email sent.");
    } catch (err) {
      console.error("❌ Failed to send verification email:", err.message);
      // You can optionally continue or fail here
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;

  try {
	if (!email || !verificationToken) {
	  throw new Error("Email and verification token are required");
	}

	const user = await User.findOne({ email, verificationToken });
	if (!user) {
	  return res.status(400).json({ success: false, message: "Invalid verification token" });
	}

	if (user.verificationTokenExpiresAt < Date.now()) {
	  return res.status(400).json({ success: false, message: "Verification token expired" });
	}

	user.isVerified = true;
	user.verificationToken = undefined;
	user.verificationTokenExpiresAt = undefined;
	await user.save();

	res.status(200).json({ success: true, message: "Email verified successfully" });

  } catch (error) {
	res.status(400).json({ success: false, message: error.message });
  }
};



export const login = (req, res) => {
  res.send("Login Page");
};

export const logout = (req, res) => {
  res.send("Logout Page");
};

export const forgotPassword = (req, res) => {
  res.send("Forgot Password Page");
};

import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { genrateToken } from "../utils/genrateToken";
import { generateVerificationCode } from "../utils/genrateVerificationCode";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVErificationEmail,
  sendWelcomeEmail,
} from "../mailtraper/email";

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fullname, email, password, contact } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res.status(401).json({
        success: false,
        message: "User already exists with this email",
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();
    user = await User.create({
      fullname,
      email,
      password: hashPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    genrateToken(res, user);

    await sendVErificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User does not exist with this email",
      });
      return;
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(404).json({
        success: false,
        message: "Email or password is wrong",
      });
      return;
    }
    genrateToken(res, user);

    user.lastLogin = new Date();
    const userWithoutPassword = await User.findOne({ email });
    await user.save();
    res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { verificationCode } = req.body;
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpireAt: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
      return;
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.fullname);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User does not exist",
      });
      return;
    }
    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpireAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpireAt = resetTokenExpireAt.toISOString();
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTENDURL}/resetpassword/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpireAt: { $gt: Date.now() },
    }).select("+password");
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
      return;
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.id;
    const { fullname, email, country, profilePicture, address, city } = req.body;

    let cloudResponse: any;
    if (profilePicture) {
      cloudResponse = await cloudinary.uploader.upload(profilePicture);
    }
    const updatedData = {
      fullname,
      email,
      address,
      country,
      city,
      profilePicture: cloudResponse?.secure_url || profilePicture,
    };
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "User details updated",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

import z from "zod";
import User from "../models/user.model.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

const signupSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must not exceed 20 characters"),
});

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const parsedData = signupSchema.parse({ fullName, email, password });

    const existingUser = await User.findOne({ email: parsedData.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(parsedData.password, 10);
    parsedData.password = hashedPassword;

    const newUser = new User({
      fullName: parsedData.fullName,
      email: parsedData.email,
      password: parsedData.password,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.issues[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const parsedData = loginSchema.parse({ email, password });

    const user = await User.findOne({ email: parsedData.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      parsedData.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.issues[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "pingio/profile_pics",
    });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Check auth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

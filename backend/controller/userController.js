import { User } from "../models/userSchema.js";

// REGISTER LOGIC
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all details." });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists with this email." });
    }

    // Create user (password is hashed automatically by the schema hook)
    user = await User.create({ name, email, password });
    
    // Generate token
    const token = user.getJWTToken();

    // Send response with HTTP-only cookie
    res.status(201).cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }).json({
      success: true,
      message: "User registered successfully.",
      user,
      token,
    });
  } catch (error) {
    next(error); // Passes to your existing errorMiddleware
  }
};

// LOGIN LOGIC
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password." });
    }

    // Find user and explicitly select password since it's hidden by default
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email or Password." });
    }

    // Compare passwords
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({ success: false, message: "Invalid Email or Password." });
    }

    // Generate token
    const token = user.getJWTToken();

    // Send response
    res.status(200).cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }).json({
      success: true,
      message: "Logged in successfully.",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
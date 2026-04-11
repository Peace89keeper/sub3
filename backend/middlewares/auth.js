import jwt from "jsonwebtoken";
// Note: Double check that this path matches your actual user model file name
import { User } from "../models/userSchema.js"; 

export const isAuthenticated = async (req, res, next) => {
  try {
    // 1. Grab the VIP wristband (the token) from the cookie
    const { token } = req.cookies;

    // 2. If there is no token, reject them
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated. Please log in." 
      });
    }

    // 3. Verify the mathematical signature using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 4. Find the real user in MongoDB and attach them to the 'req' object
    req.user = await User.findById(decoded.id);

    // 5. Let them pass to the next function (which is getUserProfile)
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token." 
    });
  }
};
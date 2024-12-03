import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token; // Ensure cookies are parsed properly
    if (!token) {
       res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return
    }
    

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

    // Check if the payload contains `userId`
    if (!decoded || !decoded.userId) {
       res.status(401).json({
        success: false,
        message: "Invalid or malformed token",
      });
      return
    }

    // Attach user ID to the request object
    req.id = decoded.userId;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle JWT verification errors
    console.error("JWT Error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
       res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }
     res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return
  }
};

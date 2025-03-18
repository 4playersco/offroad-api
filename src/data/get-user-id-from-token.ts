import { JsonWebKey } from "crypto";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Decode the JWT to get user ID on each request
async function getUserIdFromToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(
      token,
      String(process.env.JWT_SECRET),
    ) as JsonWebKey;
    req.userId = userId as string;
    console.log("userId", userId);
  }

  next();
}

export default getUserIdFromToken;

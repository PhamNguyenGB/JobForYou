import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}
// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.token as string;
//     const secretKey = process.env.JWT_SECRET as string;
//     if (token) {
//       jwt.verify(token, secretKey, (err: any, user: any) => {
//         if (err) {
//           if (err.name === "TokenExpiredError") {
//             return res
//               .status(401)
//               .json({ message: "Token is expired", error_code: 1 });
//           }
//           return res
//             .status(401)
//             .json({ message: "Token is invalid", error_code: 2 });
//         }
//         req.user = user;
//         next();
//       });
//     }
//   } catch (error) {}
// };

const verifyToken = (token: string): string | JwtPayload | null => {
  try {
    const secretKey = process.env.JWT_SECRET as string;
    if (!secretKey)
      throw new Error("Missing JWT_SECRET in environment variables");

    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const authenticateToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ message: "Access token missing" });
    return;
  }
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  res.locals.user = decoded;
  next();
};

export const authorizeRoles = (...roles: string[]) => {
  const middleware: RequestHandler = (req, res, next) => {
    const user = res.locals.user as { role?: string };

    if (!user || !roles.includes(user.role || "")) {
      res.status(403).json({ message: "Forbidden: You don't have access" });
      return;
    }

    next();
  };

  return middleware;
};

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


class AuthMiddleware {
  static authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    // Check if the request contains a cookie with a token

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ status: "FAILED", message: 'Unauthorized: No token provided' });
    }

    try {
      // Verify the token
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) {
          return res.status(403).json({ status: "FAILED", message: 'Forbidden: Invalid token', err });
        }

        // Attach the user to the request object
        (req as Request & { user: JwtPayload }).user = user;
        next();
      }
      );
    } catch (err) {
      return res.status(500).json({ status: "FAILED", message: 'Internal Server Error' });
    }
  }


  static authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Check if the user has the necessary role
    const user = (req as Request & { user: { _id: string, role: string } }).user;

    console.log("authorizeAdmin", user);
    if (user.role !== 'admin') {
      return res.status(403).json({ status: "FAILED", message: 'Forbidden: Not authorized' });
    }

    next();
  };

  // agent
  static authorizeAgent = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user: { _id: string, role: string } }).user;
    console.log("authorizeAgent", user);

    if (user.role !== 'support_agent') {
      return res.status(403).json({ status: "FAILED", message: 'Forbidden: Not authorized' });
    }

    next();
  };

  static authorizeAgentOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user: { _id: string, role: string } }).user;
    console.log("authorizeAgentOrAdmin", user);

    if (user.role !== 'support_agent' && user.role !== 'admin') {
      return res.status(403).json({ status: "FAILED", message: 'Forbidden: Not authorized' });
    }

    next();
  }


}



export default AuthMiddleware;

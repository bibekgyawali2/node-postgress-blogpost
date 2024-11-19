import { Request, Response, NextFunction } from "express";
import JWTService from "../services/jwt.service";
import Env from "../config/env";
import HttpException from "../utils/httpExceptions";
import messages from "../constants/messages";

interface DecodedToken {
    userId: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}

class AuthMiddleware {

    public authenticate(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(
                HttpException.unauthorized(
                    messages['unAuthorized']
                )
            );
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = JWTService.verify(token, Env.JWT_SECRET) as DecodedToken;
            if (!decoded || !decoded.userId) {

                return next(HttpException.unauthorized(messages['invalidToken']));
            }

            req.body.userId = decoded.userId;

            next();
        } catch (err) {

            return next(HttpException.unauthorized(messages['invalidToken']));
        }
    }

}

export default AuthMiddleware;
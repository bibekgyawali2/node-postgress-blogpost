import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/user.service";
import HttpException from "../utils/httpExceptions";
import { StatusCodes } from "../constants/statusCodes";
import JWTService from "../services/jwt.service";
import Env from "../config/env";
import messages from "../constants/messages";

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async signUp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const user = await this.authService.signUp(req.body);

            return res.status(StatusCodes.CREATED).json({
                status: "success",
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        const user = await this.authService.signIn(req.body);
        const token = JWTService.sign({}, Env.JWT_SECRET, {
            expiresIn: Env.TOKEN_EXPIRES_IN,
        });
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: messages["validLogin"],
            data: {
                user: { ...user, password: undefined },
                token,
            },
        });
    }
}

export default AuthController;

import AuthController from "../controllers/auth.controller";
import { Router } from "express";
import Validate from "../middleware/validation.middleware";
import { SignInDTO, SignUpDTO } from "../dtos/user.dto";
import { catchAsync } from "../utils/catchAsync";

const authController = new AuthController();

class AuthRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post(
            "/signup",
            Validate(SignUpDTO),
            catchAsync(authController.signUp.bind(authController))
        );

        this.router.post(
            "/signin",
            Validate(SignInDTO),
            catchAsync(authController.signIn.bind(authController))
        )
    }

    static routerInstance() {
        const authRouter = new AuthRoutes();
        return authRouter.router;
    }
}

export default AuthRoutes.routerInstance;

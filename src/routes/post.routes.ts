import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import PostController from "../controllers/post.controller";
import { CreateBlogDTO } from "../dtos/post.dto";
import Validate from "../middleware/validation.middleware";
import AuthMiddleware from "../middleware/auth.middleware";
import MulterMiddleware from "../middleware/fileUpload.middleware";

const authMiddleware = new AuthMiddleware()
const postController = new PostController();
const multerMiddleware = new MulterMiddleware();

class PostRoutes {
    router: Router
    constructor() {
        this.router = Router()
        this.routes();
    }
    routes() {
        this.router.get(
            '/get-all-post',
            catchAsync(postController.getAllPost.bind(postController))
        );

        this.router.post(
            '/create-post',

            authMiddleware.authenticate.bind(authMiddleware),
            multerMiddleware.handleSingleFile("img"),
            Validate(CreateBlogDTO),
            catchAsync(postController.createPost.bind(postController))
        )
    }

    static routerInstance() {
        const authRouter = new PostRoutes();
        return authRouter.router;
    }
}


export default PostRoutes.routerInstance;
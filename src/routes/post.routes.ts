import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import PostController from "../controllers/post.controller";
import { CreateBlogDTO } from "../dtos/post.dto";
import Validate from "../middleware/validation.middleware";

const postController = new PostController();
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
import { PostService } from "../services/post.service";
import { StatusCodes } from "../constants/statusCodes";
import { Request, Response } from "express";
class PostController {

    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    async createPost(req: Request, res: Response,) {

        const post = await this.postService.createPost(req.body);

        return res.status(StatusCodes.CREATED).json({
            status: "success",
            data: post,
        });
    }

    async getAllPost(req: Request, res: Response) {

        const allPosts = await this.postService.getAllPost()

        return res.status(StatusCodes.SUCCESS).json({
            status: 'success',
            data: allPosts,
        })
    }
}

export default PostController;
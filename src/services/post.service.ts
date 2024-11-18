import { Repository } from "typeorm";
import Post from "../entities/post.entity";
import dataSource from "../config/database.config";
import { CreateBlogDTO } from "../dtos/post.dto";
import HttpException from "../utils/httpExceptions";
import messages from "../constants/messages";

export class PostService {
    private postRepository: Repository<Post>;

    constructor() {
        this.postRepository = dataSource.getRepository(Post);
    }

    async getAllPost(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    async createPost(postData: CreateBlogDTO): Promise<Post> {
        const newPost = this.postRepository.create(postData);
        return await this.postRepository.save(newPost);
    }

    async editPost(postId: string, postData: Partial<CreateBlogDTO>): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: { postId: postId }
        });

        if (!post) {
            throw HttpException.notFound(messages["notFound"]);
        }

        // Update the post with new data
        Object.assign(post, postData);

        try {
            return await this.postRepository.save(post);
        } catch (error) {
            throw HttpException.badRequest(messages["dataUpdateFailed"] || "Failed to update post");
        }
    }

    async deletePost(postId: string): Promise<void> {
        const post = await this.postRepository.findOne({
            where: { postId: postId }
        });

        if (!post) {
            throw HttpException.notFound(messages["notFound"]);
        }

        try {
            await this.postRepository.remove(post);
        } catch (error) {
            throw HttpException.badRequest(messages["dataUpdateFailed"] || "Failed to delete post");
        }
    }

    async getPostById(postId: string): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: { postId: postId }
        });

        if (!post) {
            throw HttpException.notFound("Post not found");
        }

        return post;
    }
}
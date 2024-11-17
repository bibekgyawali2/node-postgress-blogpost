import { Repository } from "typeorm";
import Post from "../entities/post.entity";
import dataSource from "../config/database.config";
import { CreateBlogDTO } from "../dtos/post.dto";

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
}
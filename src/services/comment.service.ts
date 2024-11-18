import { Repository } from "typeorm";
import AppDataSource from "../config/database.config";
import Comment from "../entities/comment.entity";

export class CommentService {
    private commentRepository: Repository<Comment>;
    constructor() {
        this.commentRepository = AppDataSource.getRepository(Comment);
    }

    async getCommentByPostId(postId: string): Promise<Comment[]> {
        const comments = await this.commentRepository.find({
            where: { post: { postId: postId } },
            relations: {
                user: true,
                post: true
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return comments;
    }

    async createComment(commentData: Partial<Comment>): Promise<Comment> {

        const newComment = this.commentRepository.create(commentData);

        return await this.commentRepository.save(newComment);

    }

    async deleteComment(
        commentId: string,
        userId: string
    ): Promise<boolean> {

        const result = await this.commentRepository.delete({
            commentId: commentId,
            user: { userId: userId } // Ensure user owns the comment
        });

        if (result.affected === 0) {
            throw new Error('Comment not found or user not authorized');
        }

        return true;

    }
}
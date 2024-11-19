import { CommentService } from "../services/comment.service";


export class CommentController {

    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
    }

}
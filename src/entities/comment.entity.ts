import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import CommonEntity from "./common.entity";
import Post from "./post.entity";
import User from "./user.entity";

@Entity({ name: "comments" })
class Comment extends CommonEntity {
    @PrimaryGeneratedColumn("uuid")
    commentId!: string;

    @Column("text")
    content!: string;

    // Relations
    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: "postId" })
    post!: Post;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: "userId" }) // Ensure foreign key column name matches
    user!: User;
}

export default Comment;

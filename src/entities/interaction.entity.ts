import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import CommonEntity from "./common.entity";
import Post from "./post.entity";
import User from "./user.entity";

@Entity({ name: "interactions" })
class Interaction extends CommonEntity {
    @PrimaryGeneratedColumn("uuid")
    interactionId!: string;

    @Column()
    type!: string;

    // Relations
    @ManyToOne(() => User, (user) => user.interactions)
    @JoinColumn({ name: "userId" })
    user!: User;

    @ManyToOne(() => Post, (post) => post.interactions)
    @JoinColumn({ name: "postId" })
    post!: Post;
}

export default Interaction;

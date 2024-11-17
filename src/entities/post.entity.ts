import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import CommonEntity from "./common.entity";
import User from "./user.entity";
import Comment from "./comment.entity";
import Interaction from "./interaction.entity";

@Entity({ name: "posts" })
class Post extends CommonEntity {

    @PrimaryGeneratedColumn("uuid")
    postId!: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    title!: string;

    @Column({
        type: "text",
        nullable: false,
    })
    content!: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    category!: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    img!: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    publicationDate!: Date;

    @Column({
        type: "simple-array",
        nullable: true,
    })
    tags!: string[];

    @Column()
    userId!: string;

    // Relationship with User
    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: "userId" })
    user!: User;

    // Relationship with Comment
    @OneToMany(() => Comment, (comment) => comment.post)
    comments!: Comment[];

    @OneToMany(() => Interaction, interaction => interaction.post)
    interactions!: Interaction[];
}

export default Post;

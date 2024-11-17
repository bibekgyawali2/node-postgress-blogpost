import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CommonEntity from "./common.entity";
import Post from "./post.entity";
import Comment from "./comment.entity";
import Interaction from "./interaction.entity";

@Entity({
    name: "users",
})
class User extends CommonEntity {
    @PrimaryGeneratedColumn("uuid")
    userId!: string;

    @Column({
        name: "name",
        nullable: false,
    })
    name!: string;

    @Column({
        name: "email",
        unique: true,
        nullable: false,
    })
    email!: string;

    @Column({
        name: "password",
        nullable: false,
    })
    password!: string;

    // Relations
    @OneToMany(() => Post, (post) => post.user)
    posts!: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments!: Comment[];

    @OneToMany(() => Interaction, interaction => interaction.user)
    interactions!: Interaction[];
}

export default User;

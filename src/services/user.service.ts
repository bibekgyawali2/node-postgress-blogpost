import { Repository } from "typeorm";
import User from "../entities/user.entity";
import dataSource from "../config/database.config";
import { SignInDTO, SignUpDTO } from "../dtos/user.dto";
import { Post, Route, Tags } from "tsoa";
import HttpException from "../utils/httpExceptions";
import messages from "../constants/messages";
import BcryptService from "./bcrypt.service";



export class AuthService {
    private userRepository: Repository<User>;
    constructor() {
        this.userRepository = dataSource.getRepository(User);
    }
    async signUp(userData: SignUpDTO): Promise<Omit<User, 'password'>> {

        const { email, name, password } = userData;

        const isExists = await this.userRepository.findOneBy({ email });
        if (isExists) {
            throw HttpException.badRequest(messages["emailAlreadyExists"]);
        }
        const hashedPassword = await BcryptService.hash(password);
        const user = this.userRepository.create({
            email,
            name,
            password: hashedPassword
        });
        const savedUser = await this.userRepository.save(user);

        const { password: _, ...userWithoutPassword } = savedUser;

        return userWithoutPassword;
    }

    async signIn(userData: SignInDTO): Promise<User> {
        const { email, password } = userData;
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            throw HttpException.badRequest(messages["invalidAuth"]);
        }


        const isValidPassword = await BcryptService.compare(
            password,
            user.password
        );
        if (!isValidPassword) {
            throw HttpException.badRequest(messages["invalidAuth"]);
        }
        return user;
    }
}

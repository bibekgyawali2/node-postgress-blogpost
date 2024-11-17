import {
    IsEmail,
    IsString,
    MinLength,
    IsOptional,
    Matches,
    IsNotEmpty,
} from "class-validator";


export class SignUpDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "password is  too weak",
    })
    @IsString()
    @IsNotEmpty()
    password!: string;
}

export class SignInDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "password is  too weak",
    })
    @IsString()
    @IsNotEmpty()
    password!: string;
}

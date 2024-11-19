import { IsString, IsOptional, IsArray, IsNotEmpty, ArrayNotEmpty } from "class-validator";

export class CreateBlogDTO {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsOptional()
    tags?: string[];


    @IsString()
    @IsOptional()
    img?: string;
}

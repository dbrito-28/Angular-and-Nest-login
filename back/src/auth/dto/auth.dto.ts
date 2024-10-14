import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class createUserDto {

    @IsString({ message: 'El email debe ser una cadena de texto valida' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string;
}
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dto/auth.dto';
import { encrypt } from 'src/libs/bcrypt';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private PrismaService: PrismaService, private JwtService: JwtService) { }

    async getUsers() {
        return await this.PrismaService.user.findMany()

    }

    async singUp(user: createUserDto) {
        try {
            const userFound = await this.findUserByEmail(user.email);
            if (userFound) throw new BadRequestException("User Found");

            const hashedPassword = await encrypt(user.password);
            const newUser = await this.PrismaService.user.create({
                data: {
                    email: user.email,
                    password: hashedPassword,
                },
            });
            
            const accessT = await this.generateJwtToken(newUser);
            return { jwt: accessT };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new Error(error);
        }
    }

    async login(user: createUserDto) {
        try {

            const userFound = await this.findUserByEmail(user.email);
            if (!userFound) throw new BadRequestException("User not found");

            const isPasswordValid = await compare(user.password, userFound.password);
            if (!isPasswordValid) throw new BadRequestException("Invalid password");

            const accessT = await this.generateJwtToken(userFound);
            return { jwt: accessT };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException("An error occurred during user login");
        }
    }

    //generar Token
    private async generateJwtToken(user: createUserDto) {
        const { password, ...result } = user;
        return await this.JwtService.signAsync({ ...result });
    }

    //buscar usuario por correo
    private async findUserByEmail(email: string) {
        return await this.PrismaService.user.findUnique({
            where: {
                email,
            },
        });
    }


}


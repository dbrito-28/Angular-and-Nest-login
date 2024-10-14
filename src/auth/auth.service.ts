import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(private PrismaService: PrismaService) { }

    async getUsers() {
        return await this.PrismaService.user.findMany()
    }

    singUp(user: createUserDto) {
        console.log("🚀 ~ AuthService ~ singUp ~ user:", user)
        // return
    }


}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService:AuthService){}

    @Get('login')
    LogIn() {
        return this.AuthService.getUsers()
    }

    @Post('sign-up')
    signUp(@Body() user:createUserDto) {
        // console.log("🚀 ~ AuthController ~ signUp ~ user:", user)
        const createS = this.AuthService.singUp(user)
        // return this.AuthService.singUp()
    }


}

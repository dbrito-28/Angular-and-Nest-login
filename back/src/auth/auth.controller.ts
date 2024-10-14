import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/auth.dto';
import { authGuard, Public } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    LogIn(@Body() user: createUserDto) {
        return  this.AuthService.login(user)
    }

    @Public()
    // @UseGuards(authGuard)
    @Get('users')
    getUsers() {
        return this.AuthService.getUsers()
    }

    @HttpCode(HttpStatus.CREATED)    
    @Post('sign-up')
    signUp(@Body() user: createUserDto) {
        // console.log("🚀 ~ AuthController ~ signUp ~ user:", user)
        const createS = this.AuthService.singUp(user)
        return createS;
        // return this.AuthService.singUp()
    }


}

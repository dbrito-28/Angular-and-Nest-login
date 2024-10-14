import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


export const IS_PUBLIC_KEY = 'isPublic';
//Decorador
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Injectable()

export class authGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        console.log("🚀 ~ authGuard ~ canActivate ~ token:", token)
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET,
            });
            console.log("🚀 ~ authGuard ~ canActivate ~ payload:", payload)


        } catch (error) {
            throw new UnauthorizedException();
        }

        return true
    }

    private extractToken(request: Request): string | undefined {

        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }
}
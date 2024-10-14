import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { authGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
// import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  // providers: [AuthService, authGuard],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: authGuard,
  },
  ],
  imports: [PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],

})
export class AuthModule { }

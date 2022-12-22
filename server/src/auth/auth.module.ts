import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensService } from './tokens.service';
import { User } from '../users/models/user.model';
import { UserSession } from 'src/sessions/models/user-session.model';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokensService],
  imports: [
    forwardRef(() => UsersModule),
    SessionsModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '5m',
      },
    }),
    SequelizeModule.forFeature([User, UserSession]),
  ],
  exports: [AuthService, TokensService, JwtModule],
})
export class AuthModule {}

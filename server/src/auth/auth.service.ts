import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import {
  refreshTokenTime,
  refreshTokenTimeCookie,
  TokensService,
} from './tokens.service';
import { LoginRequest, RegisterRequest } from './requests';
import { Response, Request } from 'express';
import { UserSession } from 'src/sessions/models/user-session.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
  ) {}

  //   async register(
  //     registerRequest: RegisterRequest,
  //     response: Response,
  //     request: Request,
  //   ) {
  //     const user_ip = request.ip;
  //     const user_agent = loginRequest.userAgent;
  //     const userPassword = loginRequest.password;

  //     const user = await this.userService.getUserByEmail(loginRequest.nickname);
  //     const valid = user ? await compare(userPassword, user.HASH) : false;

  //     if (!valid) {
  //       throw new UnauthorizedException('Неверный пароль');
  //     }

  //     const userSession = await UserSession.findOne({
  //       where: {
  //         userId: user.UUID,
  //         userIp,
  //         userAgent,
  //       },
  //       include: { all: true },
  //     });

  //     const accessToken = await this.tokensService.generateAccessToken(user);
  //     const refreshToken = await this.tokensService.generateRefreshToken(
  //       userSession,
  //       user,
  //       { user_ip, user_agent },
  //       refreshTokenTime,
  //     );

  //     response.cookie('refreshToken', refreshToken, {
  //       maxAge: refreshTokenTimeCookie,
  //       httpOnly: true,
  //     });

  //     return {
  //       user,
  //       accessToken,
  //     };
  //   }

  async login(
    loginRequest: LoginRequest,
    response: Response,
    request: Request,
  ) {
    const userIp = request.ip;
    const userAgent = loginRequest.userAgent;
    const userPassword = loginRequest.password;

    const user = await this.userService.getUserByEmail(loginRequest.email);

    if (user) {
      const valid = await compare(userPassword, user.password);

      if (!valid) {
        throw new UnauthorizedException('Неверный пароль');
      }

      const userSession = await UserSession.findOne({
        where: {
          userId: user.id,
          userIp,
          userAgent,
        },
        include: { all: true },
      });

      const accessToken = await this.tokensService.generateAccessToken(user);
      const refreshToken = await this.tokensService.generateRefreshToken(
        userSession,
        user,
        { userIp, userAgent },
        refreshTokenTime,
      );

      response.cookie('refreshToken', refreshToken, {
        maxAge: refreshTokenTimeCookie,
        httpOnly: true,
      });

      return {
        user,
        accessToken,
      };
    }

    throw new UnauthorizedException('Пользователь с таким email не найден');
  }

  async refresh(request: Request, response: Response, userAgent: string) {
    const { user, accessToken, refreshToken } =
      await this.tokensService.createTokensFromRefreshToken(
        request.cookies.refreshToken,
        userAgent,
        request.ip,
      );

    response.cookie('refreshToken', refreshToken, {
      maxAge: refreshTokenTimeCookie,
      httpOnly: true,
    });

    return {
      user,
      accessToken,
    };
  }
}

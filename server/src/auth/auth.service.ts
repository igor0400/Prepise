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

  async register(
    registerRequest: RegisterRequest,
    response: Response,
    request: Request,
  ) {
    const userIp = request.ip;
    const userAgent = request.headers['user-agent'];
    const requestCopy = JSON.parse(JSON.stringify(registerRequest));
    delete requestCopy.emailVerifyCode;

    const isUserCreated = await this.userService.getUserByEmail(
      registerRequest.email,
    );

    if (isUserCreated) {
      throw new UnauthorizedException('Данный email уже используется');
    }

    // перед созданием пользователя сделать проверку registerRequest.emailVerifyCode
    const user = await this.userService.createUser({
      ...requestCopy,
      emailVerify: true,
    });

    const accessToken = await this.tokensService.generateAccessToken(user);
    const refreshToken = await this.tokensService.generateRefreshToken(
      undefined,
      user,
      { userIp, userAgent },
      refreshTokenTime,
    );

    response.cookie('refreshToken', refreshToken, {
      maxAge: refreshTokenTimeCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    const currentUser = await this.userService.getUserByEmail(
      registerRequest.email,
    );
    return {
      user: currentUser,
      accessToken,
    };
  }

  async login(
    loginRequest: LoginRequest,
    response: Response,
    request: Request,
  ) {
    const userIp = request.ip;
    const userAgent = request.headers['user-agent'];

    const user = await this.userService.getUserByEmail(loginRequest.email);

    if (user) {
      const valid = await compare(loginRequest.password, user.password);

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
        secure: process.env.NODE_ENV === 'production',
      });

      const currentUser = await this.userService.getUserByEmail(
        loginRequest.email,
      );
      return {
        user: currentUser,
        accessToken,
      };
    }

    throw new UnauthorizedException('Пользователь с таким email не найден');
  }

  async refresh(request: Request, response: Response) {
    console.log(request.cookies);
    const { user, accessToken, refreshToken } =
      await this.tokensService.createTokensFromRefreshToken(
        request.cookies.refreshToken,
        request.headers['user-agent'],
        request.ip,
      );

    response.cookie('refreshToken', refreshToken, {
      maxAge: refreshTokenTimeCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      user,
      accessToken,
    };
  }
}

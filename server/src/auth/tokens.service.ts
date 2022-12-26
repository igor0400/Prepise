import { UnprocessableEntityException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { UserSession } from '../sessions/models/user-session.model';

import { UsersService } from 'src/users/users.service';
import { SessionsRepository } from '../sessions/session.repository';

import { v4 } from 'uuid';
import { User } from 'src/users/models/user.model';
import { InjectModel } from '@nestjs/sequelize';

export interface RefreshTokenPayload {
  jti: string;
  sub: string;
  userIp: string;
  userAgent: string;
}

export interface AddOptionsType {
  userIp: string;
  userAgent: string;
}

interface CreateTokensType {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface UserSessionOptions {
  userIp: string;
  userAgent: string;
}

export const refreshTokenTime = 1000 * 60 * 60 * 24 * 60;
export const refreshTokenTimeCookie = 60 * 24 * 60 * 60 * 1000;

@Injectable()
export class TokensService {
  private readonly tokens: SessionsRepository;
  private readonly users: UsersService;
  private readonly jwt: JwtService;

  public constructor(
    tokens: SessionsRepository,
    users: UsersService,
    jwt: JwtService,
    @InjectModel(UserSession)
    private userSessionRepository: typeof UserSession,
  ) {
    this.tokens = tokens;
    this.users = users;
    this.jwt = jwt;
  }

  public async generateAccessToken(user: User): Promise<string> {
    const opts: SignOptions = {
      subject: user.id.toString(),
    };

    return this.jwt.signAsync({}, opts);
  }

  public async generateRefreshToken(
    userSession: UserSession | undefined,
    user: User,
    addOptions: AddOptionsType,
    expiresIn: number,
  ): Promise<string> {
    let token;
    const { userIp, userAgent } = addOptions;

    const tokenId: string = v4();
    const opts: SignOptions = {
      expiresIn,
      subject: user.id.toString(),
      jwtid: userSession ? userSession.id.toString() : tokenId,
    };

    const refreshOpts: UserSessionOptions = {
      userIp,
      userAgent,
    };

    if (userSession) {
      token = this.jwt.signAsync(refreshOpts, opts);

      const expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn);

      userSession.expires = expiration;
      userSession.save();
    } else {
      token = this.jwt.signAsync(refreshOpts, opts);

      const addTokenOptions = {
        userIp,
        userAgent,
        tokenId,
      };

      await this.tokens.createRefreshToken(user, expiresIn, addTokenOptions);
    }

    return token;
  }

  public async resolveUserSession(
    encoded: string,
  ): Promise<{ user: User; token: UserSession }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh токен не найден');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh токен неверного формате');
    }

    return { user, token };
  }

  public async createTokensFromRefreshToken(
    refresh: string,
    userAgent: string,
    userIp: string,
  ): Promise<CreateTokensType> {
    const { user } = await this.resolveUserSession(refresh);

    const userSession = await this.userSessionRepository.findOne({
      where: {
        userId: user.id,
        userIp,
        userAgent,
      },
      include: { all: true },
    });

    if (!userSession) {
      throw new UnprocessableEntityException('Refresh токен не найден');
    }

    const addOptions = { userIp, userAgent };

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + refreshTokenTime);

    userSession.expires = expiration;
    userSession.save();

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(
      userSession,
      user,
      addOptions,
      refreshTokenTime,
    );
    
    return { user, accessToken, refreshToken };
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException(
          'Истек срок действия refresh токена',
        );
      } else {
        throw new UnprocessableEntityException(
          'Refresh токен неверного формате',
        );
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh токен неверного формате');
    }

    return this.users.getUserById(+subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<UserSession | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh токен неверного формате');
    }

    return this.tokens.findTokenById(tokenId);
  }
}

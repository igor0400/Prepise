import { Injectable } from '@nestjs/common';

import { UserSession } from './models/user-session.model';
import { AddOptionsType } from '../auth/tokens.service';
import { User } from 'src/users/models/user.model';

@Injectable()
export class SessionsRepository {
  public async createRefreshToken(
    user: User,
    ttl: number,
    addTokenOptions: AddOptionsType,
  ): Promise<UserSession> {
    const token = new UserSession();
    const { userAgent, userIp } = addTokenOptions;

    token.userId = user.id;
    token.userAgent = userAgent;
    token.userIp = userIp;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    return token.save();
  }

  public async findTokenById(id: string): Promise<UserSession | null> {
    return UserSession.findOne({
      where: {
        id,
      },
    });
  }
}

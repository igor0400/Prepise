import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSessionOptions } from 'src/auth/tokens.service';
import { UserSession } from './models/user-session.model';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(UserSession)
    private sessionRepository: typeof UserSession,
  ) {}

  async createSession(
    userId: number,
    ttl: number,
    addTokenOptions: UserSessionOptions,
  ) {
    const expires = new Date();
    expires.setTime(expires.getTime() + ttl);

    const session = await this.sessionRepository.create({
      userId,
      expires,
      ...addTokenOptions,
    });
    return session;
  }

  async updateSession(session: UserSession, ttl: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + ttl);

    const userSession = await this.sessionRepository.findOne({
      where: { id: session.id },
      include: { all: true },
    });

    userSession.expires = expires;
    return userSession.save();
  }

  async findSessionById(id: number) {
    const session = await this.sessionRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return session;
  }
}

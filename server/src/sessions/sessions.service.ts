import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSessionDto } from './dto/create-session.dto';
import { UserSession } from './models/user-session.model';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(UserSession)
    private sessionRepository: typeof UserSession,
  ) {}

  async addSession(dto: CreateSessionDto) {
    const session = await this.sessionRepository.create(dto);
    return session;
  }
}

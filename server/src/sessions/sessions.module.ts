import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSession } from './models/user-session.model';
import { SessionsService } from './sessions.service';
import { SessionsRepository } from './session.repository';

@Module({
  providers: [SessionsService, SessionsRepository],
  imports: [SequelizeModule.forFeature([UserSession])],
  exports: [SessionsRepository],
})
export class SessionsModule {}

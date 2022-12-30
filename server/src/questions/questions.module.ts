import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { DefaultQuestionInfo } from './models/default-question-info.model';
import { QuestionFile } from './models/question-file.model';
import { QuestionImg } from './models/question-img.model';
import { QuestionUsedUserInfo } from './models/question-used-user-info.model';
import { Question } from './models/question.model';
import { TestQuestionInfo } from './models/test-question-info.model';
import { TestQuestionReplyFile } from './models/test-question-reply-file.model';
import { TestQuestionReply } from './models/test-question-reply.model';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
    SequelizeModule.forFeature([
      Question,
      QuestionImg,
      QuestionFile,
      DefaultQuestionInfo,
      QuestionUsedUserInfo,
      TestQuestionInfo,
      TestQuestionReply,
      TestQuestionReplyFile,
    ]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
})
export class QuestionsModule {}

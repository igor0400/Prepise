import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { DefaultQuestionInfo } from './models/default-question-info.model';
import { QuestionFile } from './models/question-file.model';
import { QuestionImg } from './models/question-img.model';
import { Question } from './models/question.model';
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
    ]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '5m',
      },
    }),
  ],
})
export class QuestionsModule {}

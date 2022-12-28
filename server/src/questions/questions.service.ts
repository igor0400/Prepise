import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './models/question.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private questionRepository: typeof Question,
  ) {}

  async getAllQuestions() {
    const questions = await this.questionRepository.findAll({
      include: { all: true },
    });
    return questions;
  }

  async createQuestion(dto: CreateQuestionDto) {
    const question = await this.questionRepository.create(dto);
    return question;
  }
}

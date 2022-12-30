import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BanQuestionDto } from './dto/ban-question.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { BanQuestion } from './models/banned-questions.model';
import { BanUser } from './models/banned-users.model';

@Injectable()
export class BannedService {
  constructor(
    @InjectModel(BanUser)
    private banUserRepository: typeof BanUser,
    @InjectModel(BanQuestion)
    private banQuestionRepository: typeof BanQuestion,
  ) {}

  async banUser(dto: BanUserDto) {
    const isBanned = await this.banUserRepository.findOne({
      where: { userId: dto.userId },
      include: { all: true },
    });

    if (isBanned) {
      throw new HttpException(
        `Пользователь с id: ${dto.userId} уже забанен`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return this.banUserRepository.create(dto);
  }

  async banQuestion(dto: BanQuestionDto) {
    const isBanned = await this.banQuestionRepository.findOne({
      where: { questionId: dto.questionId },
      include: { all: true },
    });

    if (isBanned) {
      throw new HttpException(
        `Вопрос с id: ${dto.questionId} уже забанен`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return this.banQuestionRepository.create(dto);
  }
}

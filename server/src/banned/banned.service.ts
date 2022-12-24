import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BanUserDto } from './dto/ban-user.dto';
import { BanUser } from './models/banned-users.model';

@Injectable()
export class BannedService {
  constructor(
    @InjectModel(BanUser)
    private banUserRepository: typeof BanUser,
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

    await this.banUserRepository.create(dto);
    return dto;
  }
}

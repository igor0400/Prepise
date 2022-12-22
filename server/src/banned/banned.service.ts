import { Injectable } from '@nestjs/common';
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
    await this.banUserRepository.create(dto);
    return dto;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

const defaultAvatars = {
  male: ['efron.png'],
  female: ['camilla.png'],
};

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async createUser(dto: CreateUserDto) {
    const avatar =
      dto.gender === 'male'
        ? defaultAvatars.male[getRandomNum(defaultAvatars.male.length)]
        : defaultAvatars.female[getRandomNum(defaultAvatars.female.length)];

    const user = await this.userRepository.create({
      ...dto,
      avatar: `/avatars/default/${dto.gender}/${avatar}`,
    });
    return user;
  }
}

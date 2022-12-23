import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { hash } from 'bcryptjs';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/roles/models/user-roles.model';

const defaultAvatars = {
  male: ['efron.png'],
  female: ['camilla.png'],
};

function getRandomNum(max: number): number {
  return Math.floor(Math.random() * max);
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(UserRoles)
    private userRolesRepository: typeof UserRoles,
    private roleService: RolesService,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async createUser(dto: CreateUserDto) {
    const password = await hash(dto.password, 10);
    const avatar =
      dto.gender === 'male'
        ? defaultAvatars.male[getRandomNum(defaultAvatars.male.length)]
        : defaultAvatars.female[getRandomNum(defaultAvatars.female.length)];

    const user = await this.userRepository.create({
      ...dto,
      avatar: `/avatars/default/${dto.gender}/${avatar}`,
      password,
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return user;
  }

  async deleteUserById(id: number) {
    const isDelete = await this.userRepository.destroy({
      where: { id },
    });

    if (isDelete) {
      return `Пользователь с id: ${id} удален`;
    } else {
      return `Пользователь с id: ${id} не найден`;
    }
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      const userRole = {
        userId: dto.userId,
        roleId: role.id,
      };
      await this.userRolesRepository.create(userRole);
      return userRole;
    }

    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}

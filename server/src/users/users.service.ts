import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { hash } from 'bcryptjs';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/roles/models/user-roles.model';
import { UserInfo } from './models/users-info.model';

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
    @InjectModel(UserInfo)
    private userInfoRepository: typeof UserInfo,
    private roleService: RolesService,
  ) {}

  private readonly defaultAvatars = {
    male: [
      'andre.png',
      'ashton.png',
      'brad.png',
      'brini.png',
      'efron.png',
      'greggy.png',
      'greta.png',
      'lars.png',
      'marnie.png',
      'maxim.png',
      'nicola.png',
      'paul.png',
      'pitta.png',
      'raul.png',
      'rudiger.png',
      'sam.png',
      'theo.png,',
    ],
    female: [
      'babs.png',
      'camilla.png',
      'charlotte.png',
      'clara.png',
      'elsa.png',
      'elvira.png',
      'fini.png',
      'gene.png',
      'hanna.png',
      'laura.png',
      'leni.png',
      'ludmilla.png',
      'luisa.png',
      'phichi.png',
      'reana.png',
      'saskia.png',
      'serj.png',
      'tzu-yung.png',
    ],
  };

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { all: true, nested: true },
    });
    return users;
  }

  async createUser(userDto: CreateUserDto) {
    const password = await hash(userDto.password, 10);

    const user = await this.userRepository.create({
      ...userDto,
      avatar: userDto.gender
        ? this.getAvatar('user', userDto.gender)
        : this.getAvatar('company'),
      password,
    });

    if (userDto.gender) {
      await this.addRole({ value: 'USER', userId: user.id });
      await this.userInfoRepository.create({
        userId: user.id,
        gender: userDto.gender,
      });
    } else {
      await this.addRole({ value: 'COMPANY', userId: user.id });
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true, nested: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true, nested: true },
    });

    return user;
  }

  // ????????????!!!!!!!!!!!!!!!!
  async deleteUserById(id: number) {
    const isDelete = await this.userRepository.destroy({
      where: { id },
    });

    if (isDelete) {
      return `???????????????????????? ?? id: ${id} ????????????`;
    } else {
      throw new HttpException(
        `???????????????????????? ?? id: ${id} ???? ????????????`,
        HttpStatus.NOT_FOUND,
      );
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
      '???????????????????????? ?????? ???????? ???? ??????????????',
      HttpStatus.NOT_FOUND,
    );
  }

  private getAvatar(
    userType: 'company' | 'user',
    gender: 'male' | 'female' = undefined,
  ) {
    if (userType === 'company') {
      return '/avatars/default/companies/main.png';
    } else {
      if (gender === 'male') {
        return `/avatars/default/users/${gender}/${
          this.defaultAvatars.male[
            getRandomNum(this.defaultAvatars.male.length)
          ]
        }`;
      } else if (gender === 'female') {
        return `/avatars/default/users/${gender}/${
          this.defaultAvatars.female[
            getRandomNum(this.defaultAvatars.female.length)
          ]
        }`;
      }
    }
  }
}

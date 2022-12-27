import { Param, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.getUserById(id);

    if (user) {
      return user;
    } else {
      return `Пользователь с id: ${id} не найден`;
    }
  }

  // УБРАТЬ!!!!!!!!!!!!!!!!
  @Delete('/:id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }
}

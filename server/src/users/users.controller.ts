import {
  Param,
  Controller,
  Delete,
  Get,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Roles } from 'src/roles/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
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

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add-role')
  async addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  // УБРАТЬ!!!!!!!!!!!!!!!!
  @Delete('/:id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }
}

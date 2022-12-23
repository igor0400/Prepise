import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './roles-auth.decorator';

@Roles('ADMIN')
@UseGuards(RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}

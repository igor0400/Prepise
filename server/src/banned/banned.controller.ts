import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Roles } from 'src/roles/roles-auth.decorator';
import { BannedService } from './banned.service';
import { BanQuestionDto } from './dto/ban-question.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Roles('ADMIN')
@UseGuards(RolesGuard)
@Controller('ban')
export class BannedController {
  constructor(private bannedService: BannedService) {}

  @Post('user')
  banUser(@Body() banUserDto: BanUserDto) {
    return this.bannedService.banUser(banUserDto);
  }

  @Post('question')
  banQuestion(@Body() banQuestionDto: BanQuestionDto) {
    return this.bannedService.banQuestion(banQuestionDto);
  }
}

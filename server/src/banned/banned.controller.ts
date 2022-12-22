import { Body, Controller, Post } from '@nestjs/common';
import { BannedService } from './banned.service';
import { BanUserDto } from './dto/ban-user.dto';

@Controller('ban')
export class BannedController {
  constructor(private bannedService: BannedService) {}

  @Post()
  banUser(@Body() banUserDto: BanUserDto) {
    return this.bannedService.banUser(banUserDto);
  }
}

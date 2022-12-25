import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('verify')
  verifyEmail(@Body('email') email: string) {
    return this.emailService.sendVerifyCode(email);
  }
}

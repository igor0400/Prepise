import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import { RedisCacheService } from 'src/redis/redis.service';
import { uid } from 'uid';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly redisService: RedisCacheService,
  ) {}

  async sendVerifyCode(email: string) {
    const verifyCode = uid(10);
    await this.redisService.set(email, verifyCode);

    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'Код подтверждения',
        template: join(__dirname, '/../templates', 'verifyEmail'),
        context: {
          verifyCode,
        },
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(
          'Ошибка работы почты',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }

  async checkVerifyCode(email: string, code: string): Promise<boolean> {
    const redisCode = await this.redisService.get(email);
    console.log(redisCode);

    if (redisCode === code) {
      await this.redisService.del(email);
      return true;
    } else return false;
  }

  // ЗАГАТОВКА ДЛЯ СМЕНЫ ПАРОЛЯ

  //   async sendNewPasswordToMail(user: User, password: string) {
  //     return await this.mailerService
  //       .sendMail({
  //         to: user.email,
  //         subject: 'Новый пароль',
  //         template: join(__dirname, '/../templates', 'newPassword'),
  //         context: {
  //           name: user.name,
  //           password,
  //         },
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         throw new HttpException(
  //           `Ошибка работы почты`,
  //           HttpStatus.UNPROCESSABLE_ENTITY,
  //         );
  //       });
  //   }
}

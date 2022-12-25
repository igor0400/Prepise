import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import { uid } from 'uid';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyCode(email: string) {
    const verifyCode = uid(10);

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

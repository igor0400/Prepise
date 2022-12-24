import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: 'Поле email обязательно' })
  readonly email: string;

  @IsNotEmpty({ message: 'Поле password обязательно' })
  readonly password: string;
}

export class RegisterRequest {
  @IsNotEmpty({ message: 'Поле name обязательно' })
  readonly name: string;

  @IsNotEmpty({ message: 'Поле email обязательно' })
  readonly email: string;

  @IsNotEmpty({ message: 'Поле emailVerifyCode обязательно' })
  readonly emailVerifyCode: string;

  @IsNotEmpty({ message: 'Поле password обязательно' })
  readonly password: string;

  @IsNotEmpty({ message: 'Поле gender обязательно' })
  readonly gender?: 'male' | 'female';
}

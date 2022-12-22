import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: 'Поле email обязательно' })
  readonly email: string;

  @IsNotEmpty({ message: 'Поле password обязательно' })
  readonly password: string;

  @IsNotEmpty({ message: 'Поле userIp обязательно' })
  readonly userIp: string;

  @IsNotEmpty({ message: 'Поле userAgent обязательно' })
  readonly userAgent: string;
}

export class RegisterRequest {
  @IsNotEmpty({ message: 'Поле name обязательно' })
  readonly name: string;

  @IsNotEmpty({ message: 'Поле email обязательно' })
  readonly email: string;

  @IsNotEmpty({ message: 'Поле email_verify обязательно' })
  readonly email_verify: boolean;

  @IsNotEmpty({ message: 'Поле password обязательно' })
  readonly password: string;

  @IsNotEmpty({ message: 'Поле gender обязательно' })
  readonly gender: 'male' | 'female';

  @IsNotEmpty({ message: 'Поле userIp обязательно' })
  readonly userIp: string;

  @IsNotEmpty({ message: 'Поле userAgent обязательно' })
  readonly userAgent: string;
}

export class RefreshRequest {
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refresh_token: string;
}

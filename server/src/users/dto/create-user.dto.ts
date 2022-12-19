export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly email_verify: boolean;
  readonly gender: 'male' | 'female';
}

export class CreateSessionDto {
  readonly userId: number;
  readonly userIp: string;
  readonly userAgent: string;
  readonly expires: Date;
}

export class CreateTQRDto {
  readonly testQuestionInfoId: number;
  readonly authorId: number;
  readonly text: string;
  readonly files?: string[];
}

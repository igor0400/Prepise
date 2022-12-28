export class CreateQuestionDto {
  readonly authorId: number;
  readonly title: string;
  readonly description: string;
  readonly commented?: boolean;
  readonly interviewPosition?: boolean;
}

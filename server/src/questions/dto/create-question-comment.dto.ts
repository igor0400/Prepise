export class CreateQuestionCommentDto {
  readonly questionId: number;
  readonly authorId: number;
  readonly text: string;
}

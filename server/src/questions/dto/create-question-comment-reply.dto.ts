export class CreateQuestionCommentReplyDto {
  readonly questionCommentId: number;
  readonly authorId: number;
  readonly text: string;
}

export class CreateQuestionDto {
  readonly title: string;
  readonly description: string;
  readonly authorId?: number;
  readonly commented?: boolean;
  readonly interviewPosition?: boolean;
  readonly interviewCompany?: string;
  readonly imgs?: string[];
  readonly files?: string[];
}

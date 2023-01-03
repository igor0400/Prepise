import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { CustomReq } from 'src/types/request-type';
import { CreateTQRDto } from './dto/create-test-question-reply.dto';
import { CreateQuestionCommentDto } from './dto/create-question-comment.dto';
import { CreateQuestionCommentReplyDto } from './dto/create-question-comment-reply.dto';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

export interface Files {
  image: Express.Multer.File[];
  file?: Express.Multer.File[];
}

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  getAllQuestions() {
    return this.questionsService.getAllQuestions();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/question')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 10 },
      { name: 'file', maxCount: 10 },
    ]),
  )
  async createQuestion(
    @Body() dto: CreateQuestionDto,
    @Req() req: CustomReq,
    @UploadedFiles() files: Files,
  ) {
    return this.questionsService.createQuestion(
      {
        ...dto,
        authorId: +req.user.sub,
      },
      files,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/test-question')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 10 },
      { name: 'file', maxCount: 10 },
    ]),
  )
  createTestQuestion(
    @Body() dto: CreateQuestionDto,
    @Req() req: CustomReq,
    @UploadedFiles() files: Files,
  ) {
    return this.questionsService.createQuestion(
      {
        ...dto,
        authorId: +req.user.sub,
      },
      files,
      true,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/reply/test-question')
  @UseInterceptors(FilesInterceptor('file'))
  replyTestQuestion(
    @Body() dto: CreateTQRDto,
    @Req() req: CustomReq,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.questionsService.replyTestQuestion(
      {
        ...dto,
        authorId: +req.user.sub,
      },
      files,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/comment/question/:id')
  commentQuestion(
    @Body() dto: CreateQuestionCommentDto,
    @Param('id') questionId: string,
    @Req() req: CustomReq,
  ) {
    return this.questionsService.commentQuestion({
      ...dto,
      authorId: +req.user.sub,
      questionId: +questionId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/reply/question-comment/:id')
  replyCommentQuestion(
    @Body() dto: CreateQuestionCommentReplyDto,
    @Param('id') questionCommentId: string,
    @Req() req: CustomReq,
  ) {
    return this.questionsService.replyCommentQuestion({
      ...dto,
      authorId: +req.user.sub,
      questionCommentId: +questionCommentId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/view/question/:id')
  viewQuestion(@Param('id') questionId: string, @Req() req: CustomReq) {
    this.questionsService.viewQuestion({
      userId: +req.user.sub,
      questionId: +questionId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/done/question/:id')
  doneQuestion(@Param('id') questionId: string, @Req() req: CustomReq) {
    this.questionsService.doneQuestion({
      userId: +req.user.sub,
      questionId: +questionId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/like/question/:id')
  likeQuestion(@Param('id') questionId: string, @Req() req: CustomReq) {
    this.questionsService.likeQuestion({
      userId: +req.user.sub,
      questionId: +questionId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/dislike/question/:id')
  dislikeQuestion(@Param('id') questionId: string, @Req() req: CustomReq) {
    this.questionsService.dislikeQuestion({
      userId: +req.user.sub,
      questionId: +questionId,
    });
  }
}

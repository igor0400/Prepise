import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { CustomReq } from 'src/types/request-type';
import { CreateTQRDto } from './dto/create-test-question-reply.dto';
import { CreateQuestionCommentDto } from './dto/create-question-comment.dto';
import { CreateQuestionCommentReplyDto } from './dto/create-question-comment-reply.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  getAllQuestions() {
    return this.questionsService.getAllQuestions();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/question')
  createQuestion(@Body() dto: CreateQuestionDto, @Req() req: CustomReq) {
    return this.questionsService.createQuestion({
      ...dto,
      authorId: +req.user.sub,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/test-question')
  createTestQuestion(@Body() dto: CreateQuestionDto, @Req() req: CustomReq) {
    return this.questionsService.createQuestion(
      {
        ...dto,
        authorId: +req.user.sub,
      },
      true,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/reply-test-question')
  replyTestQuestion(@Body() dto: CreateTQRDto, @Req() req: CustomReq) {
    return this.questionsService.replyTestQuestion({
      ...dto,
      authorId: +req.user.sub,
    });
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

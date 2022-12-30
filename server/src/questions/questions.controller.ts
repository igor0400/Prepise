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
    return this.questionsService.replyTestQuestion(
      {
        ...dto,
        authorId: +req.user.sub,
      },
    );
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
}

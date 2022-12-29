import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { CustomReq } from 'src/types/request-type';

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
}

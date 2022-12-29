import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateImgAndFileDto } from './dto/create-img-file.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { DefaultQuestionInfo } from './models/default-question-info.model';
import { QuestionFile } from './models/question-file.model';
import { QuestionImg } from './models/question-img.model';
import { Question } from './models/question.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private questionRepository: typeof Question,
    @InjectModel(QuestionImg)
    private questionImgRepository: typeof QuestionImg,
    @InjectModel(QuestionFile)
    private questionFileRepository: typeof QuestionFile,
    @InjectModel(DefaultQuestionInfo)
    private defaultQuestionInfoRepository: typeof DefaultQuestionInfo,
  ) {}

  async getAllQuestions() {
    const questions = await this.questionRepository.findAll({
      include: { all: true },
    });
    return questions;
  }

  async createQuestion(dto: CreateQuestionDto) {
    const question = await this.questionRepository.create(dto);

    if (dto.imgs) this.createImgs(dto.imgs, question.id);
    if (dto.files) this.createFiles(dto.files, question.id);
    this.defaultQuestionInfoRepository.create({
      questionId: question.id,
      interviewCompany: dto.interviewCompany ?? null,
    });

    return question;
  }

  private createImgs(imgs: string[], questionId: number) {
    const imgsArr: CreateImgAndFileDto[] = imgs.map((img) => ({
      url: img,
      questionId,
    }));

    imgsArr.forEach(async (img: CreateImgAndFileDto) => {
      await this.questionImgRepository.create(img);
    });

    return imgsArr;
  }

  private createFiles(files: string[], questionId: number) {
    const filesArr: CreateImgAndFileDto[] = files.map((file) => ({
      url: file,
      questionId,
    }));

    filesArr.forEach(async (file: CreateImgAndFileDto) => {
      await this.questionFileRepository.create(file);
    });

    return filesArr;
  }
}

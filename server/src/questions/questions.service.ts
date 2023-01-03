import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateImgAndFileDto } from './dto/create-img-file.dto';
import { CreateQuestionCommentReplyDto } from './dto/create-question-comment-reply.dto';
import { CreateQuestionCommentDto } from './dto/create-question-comment.dto';
import { CreateQUUIDto } from './dto/create-question-used-user-info.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateTQRFDto } from './dto/create-test-question-reply-file.dto';
import { CreateTQRDto } from './dto/create-test-question-reply.dto';
import { DefaultQuestionInfo } from './models/default-question-info.model';
import { QuestionCommentReply } from './models/question-comment-reply.model';
import { QuestionComment } from './models/question-comment.model';
import { QuestionFile } from './models/question-file.model';
import { QuestionImg } from './models/question-img.model';
import { QuestionUsedUserInfo } from './models/question-used-user-info.model';
import { Question } from './models/question.model';
import { TestQuestionInfo } from './models/test-question-info.model';
import { TestQuestionReplyFile } from './models/test-question-reply-file.model';
import { TestQuestionReply } from './models/test-question-reply.model';
import { Files } from './questions.controller';

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
    @InjectModel(QuestionUsedUserInfo)
    private questionUUIRepository: typeof QuestionUsedUserInfo,
    @InjectModel(TestQuestionInfo)
    private testQuestionInfoRepository: typeof TestQuestionInfo,
    @InjectModel(TestQuestionReply)
    private testQuestionReplyRepository: typeof TestQuestionReply,
    @InjectModel(TestQuestionReplyFile)
    private testQuestionReplyFileRepository: typeof TestQuestionReplyFile,
    @InjectModel(QuestionComment)
    private questionCommentRepository: typeof QuestionComment,
    @InjectModel(QuestionCommentReply)
    private questionCommentReplyRepository: typeof QuestionCommentReply,
    private filesService: FilesService,
  ) {}

  async getAllQuestions() {
    const questions = await this.questionRepository.findAll({
      include: { all: true, nested: true },
    });
    return questions;
  }

  async createQuestion(
    dto: CreateQuestionDto,
    takenFiles: Files,
    isTest: boolean = false,
  ) {
    const question = await this.questionRepository.create(dto);
    const { files, images } = this.filesService.createImgsAndFiles(
      takenFiles,
      `questions/${question.id}`,
    );

    if (images.length) this.createImgs(images, question.id);
    if (files.length) this.createQFiles(files, question.id);

    if (isTest) {
      await this.testQuestionInfoRepository.create({ questionId: question.id });
    } else {
      await this.defaultQuestionInfoRepository.create({
        questionId: question.id,
        interviewCompany: dto.interviewCompany ?? null,
      });
    }

    return question;
  }

  async commentQuestion(dto: CreateQuestionCommentDto) {
    const comment = await this.questionCommentRepository.create(dto);
    return comment;
  }

  async replyCommentQuestion(dto: CreateQuestionCommentReplyDto) {
    const comment = await this.questionCommentReplyRepository.create(dto);
    return comment;
  }

  async replyTestQuestion(dto: CreateTQRDto, takenFiles: Express.Multer.File[]) {
    const testQuestionReply = await this.testQuestionReplyRepository.create(
      dto,
    );
    const files = this.filesService.createFiles(
      takenFiles,
      `test-question-replies/${testQuestionReply.id}`,
    );

    if (files.length) this.createTQRFiles(files, testQuestionReply.id);

    return testQuestionReply;
  }

  async viewQuestion(dto: CreateQUUIDto) {
    const info = await this.questionUUIRepository.findOne({
      where: { ...dto },
      include: { all: true },
    });

    if (!info) {
      await this.incQuestionParams(dto.questionId, 'viewes');
      await this.questionUUIRepository.create({ ...dto, view: true });
    }

    return true;
  }

  async doneQuestion(dto: CreateQUUIDto) {
    const info = await this.questionUUIRepository.findOne({
      where: { ...dto },
      include: { all: true },
    });

    if (!info) {
      await this.questionUUIRepository.create({
        ...dto,
        view: true,
        done: true,
      });

      return true;
    }

    info.done = true;
    return info.save();
  }

  async likeQuestion(dto: CreateQUUIDto) {
    const info = await this.questionUUIRepository.findOne({
      where: { ...dto },
      include: { all: true },
    });

    if (!info?.isLike) {
      await this.incQuestionParams(dto.questionId, 'likes');
    }

    if (info?.isDislike) {
      await this.decQuestionParams(dto.questionId, 'dislikes');
    }

    if (!info) {
      await this.questionUUIRepository.create({
        ...dto,
        view: true,
        isLike: true,
      });
      await this.incQuestionParams(dto.questionId, 'viewes');

      return true;
    }

    info.isLike = true;
    info.isDislike = false;
    return info.save();
  }

  async dislikeQuestion(dto: CreateQUUIDto) {
    const info = await this.questionUUIRepository.findOne({
      where: { ...dto },
      include: { all: true },
    });

    if (!info?.isDislike) {
      await this.incQuestionParams(dto.questionId, 'dislikes');
    }

    if (info?.isLike) {
      await this.decQuestionParams(dto.questionId, 'likes');
    }

    if (!info) {
      await this.questionUUIRepository.create({
        ...dto,
        view: true,
        isDislike: true,
      });
      await this.incQuestionParams(dto.questionId, 'viewes');

      return true;
    }

    info.isDislike = true;
    info.isLike = false;
    return info.save();
  }

  async getQuestionById(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      include: { all: true, nested: true },
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

  private createQFiles(files: string[], questionId: number) {
    const filesArr: CreateImgAndFileDto[] = files.map((file) => ({
      url: file,
      questionId,
    }));

    filesArr.forEach(async (file: CreateImgAndFileDto) => {
      await this.questionFileRepository.create(file);
    });

    return filesArr;
  }

  private createTQRFiles(files: string[], testQuestionReplyId: number) {
    const filesArr: CreateTQRFDto[] = files.map((file) => ({
      url: file,
      testQuestionReplyId,
    }));

    filesArr.forEach(async (file: CreateTQRFDto) => {
      await this.testQuestionReplyFileRepository.create(file);
    });

    return filesArr;
  }

  private async incQuestionParams(
    questionId: number,
    param: 'likes' | 'dislikes' | 'viewes',
  ) {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
      include: { all: true },
    });

    question[param] = question[param] + 1;
    return question.save();
  }

  private async decQuestionParams(
    questionId: number,
    param: 'likes' | 'dislikes' | 'viewes',
  ) {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
      include: { all: true },
    });

    question[param] = question[param] - 1;
    return question.save();
  }
}

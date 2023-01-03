import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Files } from 'src/questions/questions.controller';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  createImgsAndFiles(files: Files, folderPath: string) {
    if (!files) return;

    const returnedFiles = { files: [], images: [] };

    if (files.image) {
      files.image.forEach((image) => {
        const imageFormat = image.originalname.split('.')[1];
        const validFormats = [
          'jpg',
          'jpeg',
          'JPEG 2000',
          'jp2',
          'svg',
          'png',
          'gif',
          'webp',
          'bmp',
          'tiff',
          'tif',
        ];

        if (!validFormats.includes(imageFormat)) {
          throw new HttpException(
            'Данный формат изображения не поддерживается',
            HttpStatus.BAD_REQUEST,
          );
        }

        this.checkFileSize(image);

        const filePath = this.writeFile(image, folderPath, 'image');
        returnedFiles.images.push(filePath);
      });
    }

    if (files.file) {
      files.file.forEach((file) => {
        this.checkFileSize(file);

        const filePath = this.writeFile(file, folderPath, 'file');
        returnedFiles.files.push(filePath);
      });
    }

    return returnedFiles;
  }

  createFiles(files: Express.Multer.File[], folderPath: string) {
    if (!files) return;

    const returnedFiles = [];

    files.forEach((file) => {
      this.checkFileSize(file);

      const filePath = this.writeFile(file, folderPath, 'file');
      returnedFiles.push(filePath);
    });

    return returnedFiles;
  }

  private checkFileSize(file: Express.Multer.File) {
    const fileSize = +process.env.FILES_MAX_SIZE_IN_MB * 1024 * 1024 * 8;

    if (file.size > fileSize) {
      throw new HttpException(
        `Размер файла превышает ${process.env.FILES_MAX_SIZE_IN_MB}МБ`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private writeFile(
    file: Express.Multer.File,
    folderPath: string,
    type: 'image' | 'file',
  ) {
    const fileFormat = file.originalname.split('.')[1];

    try {
      const fileName = uuid() + `.${fileFormat}`;
      const fileLocalLocation = `/${folderPath}/${
        type === 'image' ? 'images' : 'files'
      }`;
      const fileResolvePath = `../../static${fileLocalLocation}`;
      const filePath = path.resolve(__dirname, fileResolvePath);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return `${fileLocalLocation}/${fileName}`;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editFileName, customFileFilter } from '../upload-file-local.helper';

export function DecoratorUploadSingleFile() {
  return applyDecorators(
    UseInterceptors(FileInterceptor('file', {
      fileFilter: customFileFilter,
      storage: diskStorage({
        destination: './public/images/uploads',
        filename:  editFileName,
      }),
    })),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
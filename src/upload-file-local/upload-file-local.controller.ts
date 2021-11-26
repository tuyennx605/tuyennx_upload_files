import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ApiFileMultipleFields, ApiMultipleFiles } from './decorators/multiple-file.decorator';
import { DecoratorUploadSingleFile } from './decorators/single-file.decorator';
import { ParseFile } from './pipes/parse-file.pipe';
import { editFileName, customFileFilter } from './upload-file-local.helper';

@Controller('upload-file-local')
@ApiTags('upload-file-local')
export class UploadFileLocalController {
  constructor(){}

  @Post('upload-single-file')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: customFileFilter,
    storage: diskStorage({
      destination: './public/images/uploads',
      filename:  editFileName,
    }),
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { 
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('upload-single-file-with-decorator')
  @DecoratorUploadSingleFile()
  uploadFileWithDecorator(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('upload')
  @DecoratorUploadSingleFile() 
  // ParseFile and throw 400 if file not provided
  uploadFileWithPipes(@UploadedFile(ParseFile) file: Express.Multer.File) {
    console.log(file);
  }






  //////////////////// multiple file //////////////////
  @Post('upload-multiple-files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', //  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    // khác với single file nhé
    FilesInterceptor('files', 10 /* số lượng max 1 lần upload */, {
      fileFilter: customFileFilter,
      storage: diskStorage({
        destination: './public/images/uploads',
        filename:  editFileName,
      }),
    }),
  )
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }


  @Post('upload-multiple-files-decorator')
  @ApiMultipleFiles('files', true, 1, {
    fileFilter: customFileFilter,
    storage: diskStorage({
      destination: './public/images/uploads',
      filename:  editFileName,
    }),
  })
  uploadFilesWithDecorator(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }





























  @Post('upload-multiple-with-multiple-fileld')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatars: {
            type: 'array', //  array of files
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          background: {
            type: 'array', //  array of files
            items: {
              type: 'string',
              format: 'binary',
            },
          }
        },
    },
  })
  @UseInterceptors(
    // khác với single file nhé
    FileFieldsInterceptor([
      {
        name: 'avatars',
        maxCount: 4,
      },
      {
        name: 'background',
        maxCount: 3,
      },
    ], {
      fileFilter: customFileFilter,
      storage: diskStorage({
        destination: './public/images/uploads',
        filename:  editFileName,
      }),
    }),
  )
  uploadFiles1(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    console.log(files);
  }



  @Post('upload-multiple-with-multiple-fileld-with-decorator')
  @ApiFileMultipleFields(
    [{name: 'avatars', maxCount: 4}, {name: 'background', maxCount: 4}],
    {
      fileFilter: customFileFilter,
      storage: diskStorage({
        destination: './public/images/uploads',
        filename:  editFileName,
      }),
    }
  )
  uploadFiles2(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    console.log(files);
  }

  @Post('upload-file-not-save-storage')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: customFileFilter
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { 
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
uploadFile11(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
}

}





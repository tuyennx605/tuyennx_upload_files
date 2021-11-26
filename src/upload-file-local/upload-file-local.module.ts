import { Module } from '@nestjs/common';
import { UploadFileLocalController } from './upload-file-local.controller';
import { UploadFileLocalService } from './upload-file-local.service';

@Module({
  controllers: [UploadFileLocalController],
  providers: [UploadFileLocalService]
})
export class UploadFileLocalModule {}

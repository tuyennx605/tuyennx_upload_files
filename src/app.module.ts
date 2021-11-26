import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadFileLocalModule } from './upload-file-local/upload-file-local.module';

@Module({
  imports: [UploadFileLocalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

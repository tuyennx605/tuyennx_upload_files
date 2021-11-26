import { Test, TestingModule } from '@nestjs/testing';
import { UploadFileLocalController } from './upload-file-local.controller';

describe('UploadFileLocalController', () => {
  let controller: UploadFileLocalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadFileLocalController],
    }).compile();

    controller = module.get<UploadFileLocalController>(UploadFileLocalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

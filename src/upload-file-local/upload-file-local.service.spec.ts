import { Test, TestingModule } from '@nestjs/testing';
import { UploadFileLocalService } from './upload-file-local.service';

describe('UploadFileLocalService', () => {
  let service: UploadFileLocalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadFileLocalService],
    }).compile();

    service = module.get<UploadFileLocalService>(UploadFileLocalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

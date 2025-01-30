import { Test, TestingModule } from '@nestjs/testing';
import { SickReportsService } from './sick-reports.service';

describe('SickReportsService', () => {
  let service: SickReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SickReportsService],
    }).compile();

    service = module.get<SickReportsService>(SickReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

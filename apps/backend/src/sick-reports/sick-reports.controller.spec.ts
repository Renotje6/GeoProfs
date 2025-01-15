import { Test, TestingModule } from '@nestjs/testing';
import { SickReportsController } from './sick-reports.controller';
import { SickReportsService } from './sick-reports.service';

describe('SickReportsController', () => {
  let controller: SickReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SickReportsController],
      providers: [SickReportsService],
    }).compile();

    controller = module.get<SickReportsController>(SickReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyReportController } from './emergency-report.controller';

describe('EmergencyReport Controller', () => {
  let controller: EmergencyReportController;

  beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		controllers: [EmergencyReportController],
	}).compile();

	controller = module.get<EmergencyReportController>(EmergencyReportController);
  });

  it('should be defined', () => {
	expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyReportService } from './emergency-report.service';

describe('EmergencyReportService', () => {
  let service: EmergencyReportService;

  beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [EmergencyReportService],
	}).compile();

	service = module.get<EmergencyReportService>(EmergencyReportService);
  });

  it('should be defined', () => {
	expect(service).toBeDefined();
  });
});

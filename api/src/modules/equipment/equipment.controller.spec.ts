import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentController } from './equipment.controller';

describe('Schedule Controller', () => {
  let controller: EquipmentController;

  beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		controllers: [EquipmentController],
	}).compile();

	controller = module.get<EquipmentController>(EquipmentController);
  });

  it('should be defined', () => {
	expect(controller).toBeDefined();
  });
});

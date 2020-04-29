import { Module, MiddlewareConsumer } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { Equipment } from 'src/repositories/entities/equipment.entity';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from 'src/services/equipment/equipment.service';
import { EmployeeService } from 'src/services/employee/employee.service';
import { Employee } from 'src/repositories/entities/employee.entity';

@Module({
  imports: [

	TypeOrmModule.forFeature([Equipment, Employee])
  ],
  controllers: [EquipmentController],
  providers: [
	  EquipmentService,
	  EmployeeService
  ]
})
export class EquipmentModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware).forRoutes(EquipmentController);
  }
}

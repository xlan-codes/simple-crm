import { Module, MiddlewareConsumer } from '@nestjs/common';
import {InventoryController } from './inventory.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { Inventory } from 'src/repositories/entities/inventory.entity';
import { InventoryService } from 'src/services/inventory/inventory.service';
import { EmployeeService } from 'src/services/employee/employee.service';
import { Employee } from 'src/repositories/entities/employee.entity';

@Module({
  imports: [

	TypeOrmModule.forFeature([Inventory, Employee])
  ],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    EmployeeService
  ]
})
export class InventoryModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware).forRoutes(InventoryController);
  }
}

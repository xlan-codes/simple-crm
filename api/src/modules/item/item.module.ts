import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { Employee } from 'src/repositories/entities/employee.entity';
import { ItemController } from './item.controller';
import { Item } from 'src/repositories/entities/item.entity';
import { ItemService } from 'src/services/item/item.service';
import { EmployeeService } from 'src/services/employee/employee.service';

@Module({
  imports: [
	TypeOrmModule.forFeature([Item, Employee]),
  ],
  controllers: [ItemController],
  providers: [,
    ItemService,
    EmployeeService
  ]
})
export class ItemModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ItemController);
  }
}

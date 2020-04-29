import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/repositories/entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from 'src/services/role/role.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { EmployeeService } from 'src/services/employee/employee.service';
import { Employee } from 'src/repositories/entities/employee.entity';

@Module({
  imports: [
	TypeOrmModule.forFeature([Role, Employee]),
  ],
  controllers: [RoleController],
  providers: [
  RoleService,
  EmployeeService
  ]
})
export class RoleModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(RoleController);
  }
}

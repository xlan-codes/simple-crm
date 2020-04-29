import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationService } from 'src/services/location/location.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Location } from 'src/repositories/entities/location.entity';
import { EmployeeService } from 'src/services/employee/employee.service';
import { Employee } from 'src/repositories/entities/employee.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [

	TypeOrmModule.forFeature([Location, Employee])
  ],
  controllers: [LocationsController],
  providers: [
    LocationService,
    EmployeeService
  ]
})
export class LocationsModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LocationsController);
  }
}

import { Module, MiddlewareConsumer } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobsService } from 'src/services/jobs/jobs.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Job} from 'src/repositories/entities/job.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { Employee } from 'src/repositories/entities/employee.entity';
import { EmployeeService } from 'src/services/employee/employee.service';
import { RoomsService } from '../rooms/rooms.service';
import { Room } from 'src/repositories/entities/room.entity';

@Module({
  imports: [
	TypeOrmModule.forFeature([Job, Employee, Room])
  ],
  controllers: [JobController],
  providers: [
    JobsService,
    EmployeeService,
    RoomsService
  ]
})
export class JobsModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(JobController);
  }
}

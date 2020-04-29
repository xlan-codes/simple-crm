import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from 'src/services/schedule/schedule.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Job } from 'src/repositories/entities/job.entity';
import { Employee } from 'src/repositories/entities/employee.entity';
import { Schedule } from 'src/repositories/entities/schedule.entity';
import { EmployeeService } from 'src/services/employee/employee.service';
import { JobsService } from 'src/services/jobs/jobs.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [

	TypeOrmModule.forFeature([Schedule, Job, Employee])
  ],
  controllers: [ScheduleController],
  providers: [
	ScheduleService,
	EmployeeService,
	JobsService
  ]
})
export class ScheduleModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware).forRoutes(ScheduleController);
      // .forRoutes({path: 'user', method: RequestMethod.GET}, {path: 'user', method: RequestMethod.PUT});
  }
}

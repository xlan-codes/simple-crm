import { Module, MiddlewareConsumer } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from 'src/repositories/entities/employee.entity';
import { EmployeeJob } from 'src/repositories/entities/employee-job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingHour } from 'src/repositories/entities/working-hour.entity';
import { WorkingHourService } from 'src/services/working-hour/working-hour.service';
import { JobsService } from 'src/services/jobs/jobs.service';
import { Job } from 'src/repositories/entities/job.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [
	TypeOrmModule.forFeature([Employee, EmployeeJob, WorkingHour, Job])
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeeService,
    WorkingHourService,
    JobsService
  ]
})
export class EmployeesModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EmployeesController);
  }
}

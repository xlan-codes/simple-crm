import { Module, MiddlewareConsumer } from '@nestjs/common';
import { EmergencyReportController } from './emergency-report.controller';
import { EmergencyReportService } from 'src/services/emergency-report/emergency-report.service';
import { EmergencyReport } from 'src/repositories/entities/emergency-report.entity';
import { EmployeeJob } from 'src/repositories/entities/employee-job.entity';
import { Employee } from 'src/repositories/entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { EmployeeService } from 'src/services/employee/employee.service';

@Module({
  imports: [

	TypeOrmModule.forFeature([EmergencyReport, EmployeeJob,Employee])
  ],
  controllers: [EmergencyReportController],
  providers: [
    EmergencyReportService,
    EmployeeService
  ]
})
export class EmergencyReportModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EmergencyReportController);
  }
}

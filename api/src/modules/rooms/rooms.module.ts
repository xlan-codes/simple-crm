import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/repositories/entities/room.entity';

import { Employee } from 'src/repositories/entities/employee.entity';
import { JwtService } from '@nestjs/jwt';
import { Message } from 'src/repositories/entities/message.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { EmployeeService } from 'src/services/employee/employee.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Message, Employee])
  ],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    EmployeeService
    // JwtService
  ],
  exports: [RoomsService],
})
export class RoomsModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(RoomsController);
  }
}

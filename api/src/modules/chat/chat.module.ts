import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from 'src/services/chat/chat.service';
import { ChatGateway } from 'src/gateways/chat.gatway';
import { JwtService } from '@nestjs/jwt';
import { RoomsService } from '../rooms/rooms.service';
import { RoomsModule } from '../rooms/rooms.module';
import { AuthService } from 'src/services/auth/auth.service';
import { Employee } from 'src/repositories/entities/employee.entity';
import { EmployeeService } from 'src/services/employee/employee.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/repositories/entities/message.entity';


@Module({
  controllers: [ChatController],
  providers: [
      ChatService,
      ChatGateway,
      // AuthService,
      // JwtService,
      EmployeeService
      // RoomsService
  ],
  imports: [
    RoomsModule,
    AuthModule,
    TypeOrmModule.forFeature([Employee, Message])
  ]
  
})
export class ChatModule {}

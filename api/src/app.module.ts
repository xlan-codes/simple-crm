import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './modules/employees/employees.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { LocationsModule } from './modules/locations/locations.module';
import { EmergencyReportModule } from './modules/emergency-report/emergency-report.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './modules/chat/chat.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { RoleModule } from './modules/roles/role.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ItemModule } from './modules/item/item.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
	ServeStaticModule.forRoot({
		rootPath: join(__dirname, '..', 'public'),
	  }),
	TypeOrmModule.forRoot(),
	EmployeesModule,
	JobsModule,
	ScheduleModule,
	LocationsModule,
	EmergencyReportModule,
	AuthModule,
	ChatModule,
	RoomsModule,
	RoleModule,
	InventoryModule,
	// ItemModule,
	EquipmentModule,
	SharedModule,
	// VehicleModule
  ],
  controllers: [AppController],
  providers: [
	AppService,
  ],
})
export class AppModule {}

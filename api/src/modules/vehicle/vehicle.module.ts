import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { Vehicle } from 'src/repositories/entities/vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from 'src/services/vehicle/vehicle.service';

@Module({
  imports: [
	TypeOrmModule.forFeature([Vehicle]),
  ],
  controllers: [VehicleController],
  providers: [,
    VehicleService
  ]
})
export class VehicleModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(VehicleController);
  }
}

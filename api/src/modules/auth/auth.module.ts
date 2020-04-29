import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalStrategy } from 'src/strategies/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configs } from '../../config';
import { JwtStrategy } from 'src/strategies/auth/jwt.strategy';
import { EmployeeService } from 'src/services/employee/employee.service';
import { Employee } from 'src/repositories/entities/employee.entity';

@Module({
  imports: [
	TypeOrmModule.forFeature([Employee]),
	PassportModule.register({ defaultStrategy: 'jwt' }),
	JwtModule.register({
		secret: configs.SECRET,
		signOptions: { expiresIn:  '1h'}
	})
  ],
  controllers: [AuthController],
  providers: [
	AuthService,
	LocalStrategy,
	JwtStrategy,
	EmployeeService
  ],
  exports: [
	  AuthService,
	  JwtModule
  ]
})
export class AuthModule {}

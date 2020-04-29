import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IAuthService } from 'src/interfaces/services/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { configs } from 'src/config';
import * as jwt from 'jsonwebtoken';
import { WsException } from '@nestjs/websockets';
import { Employee } from 'src/repositories/entities/employee.entity';

@Injectable()
export class AuthService implements IAuthService {

	constructor(
		private jwtService: JwtService,
		private employee: EmployeeService
	) {

	}

	public async auth(username: string, password: string): Promise<any> {

		const user = await this.employee.getOne({where: {'Username': username, 'Password': password}});


		if (user && user.Password === password) {
			// const { password, ...result } = user;
			return user;
		}

		
		return null;
	}

	async login(user: any): Promise<any> {
		const payload =  {sub: user.Id, ...user};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}


	/**
   * Validates the token
   *
   * @param {string} token - The JWT token to validate
   * @param {boolean} isWs - True to handle WS exception instead of HTTP exception (default: false)
   */
  async verify(token: string, isWs: boolean = false): Promise<Employee | null> {
    try {
      const payload = <any>jwt.verify(token, configs.SECRET);
      const user = await this.employee.getOne(payload.sub.Id);

      if (!user) {
        if (isWs) {
          throw new WsException('Unauthorized access');
        } else {
          throw new HttpException(
            'Unauthorized access',
            HttpStatus.BAD_REQUEST
          );
        }
      }

      return user;
    } catch (err) {
      if (isWs) {
        throw new WsException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}

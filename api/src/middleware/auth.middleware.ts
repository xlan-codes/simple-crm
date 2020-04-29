import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IMiddlware } from 'src/interfaces/middleware/middware.interface';
import { NextFunction } from 'express';
import { EmployeeService } from 'src/services/employee/employee.service';
import { configs } from 'src/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements IMiddlware {
  constructor(private readonly userService: EmployeeService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    next();
    // const authHeaders = req.headers['authorization'];
    // if (authHeaders && (authHeaders as string).split(' ')[1]) {
    //   try {
    //       const token = (authHeaders as string).split(' ')[1];
    //       const decoded: any = jwt.verify(token, configs.SECRET);
    //       const user = await this.userService.getOne(decoded.id);

    //       if (!user) {
    //         throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    //       }
    //       req['user'] = user;
    //   } catch (error) {
    //     throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    //   }

    // } else {
    //   throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    // }
  }
}

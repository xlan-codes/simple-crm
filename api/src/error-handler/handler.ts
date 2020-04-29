import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
  } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';


  @Catch()
  export class AllExceptionsFilter extends BaseExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		if(process.env.ENVIRONMET === 'production') {
			response.status(status).json(
				{
					statusCode: status,
					timestamp: new Date().toISOString(),
					path: request.url,
				}
			);
		} else {
			response.status(status).json(exception);
		}
	}
  }
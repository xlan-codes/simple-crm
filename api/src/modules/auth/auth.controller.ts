import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalAuthGuard } from 'src/guards/auth/local-auth-guard';
import { JwtAuthGuard } from 'src/guards/auth/jwt-auth-guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

	constructor(
		private service: AuthService
	){

	}

	@ApiOperation({ summary: 'authenticate user' })
	@ApiResponse({ status: 200, description: 'user authenticated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@UseGuards(LocalAuthGuard)
	@Post('login')
	public async auth(@Body() user: any): Promise<any> {
	// public async auth(@Request() req): Promise<string> {
		const employee = await this.service.auth(user.username, user.password);
		if(employee){
			return this.service.login(employee);
		} else {
			return 
		}

	}

	@ApiOperation({ summary: 'Check if user authorized to show profile' })
	@ApiResponse({ status: 200, description: 'user authorized to get profile data'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		// console.log(req);
		return null;
	}
}

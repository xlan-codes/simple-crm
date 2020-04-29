import { Strategy } from "passport-local";
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "src/services/auth/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<any> {
		const user = await this.authService.auth(username, password);
			if (!user) {
				throw new UnauthorizedException();
			}
			return user;
	}
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IController } from 'src/interfaces/controller/controller.interface';
import { LocationService } from 'src/services/location/location.service';
import { Location } from 'src/repositories/entities/location.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Location")
@Controller('location')
export class LocationsController  implements IController<Location>{


	constructor(
		private service: LocationService,
	){

	}

	@ApiOperation({ summary: 'Get all locations or filter locations' })
	@ApiResponse({ status: 200, description: 'Get roles'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get(@Req() req: any, @Query("limit") limit?: number, @Query("offset") offset?: number, @Query('filter') filter?: any): Promise<Array<Location> | Location> {
		return this.service.get({where: filter,take:limit, skip: offset});
	}

	@ApiOperation({ summary: 'Get latest location of employee that use app' })
	@ApiResponse({ status: 200, description: 'Get location'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get(":id")
	public async getLatestEmployeeLocation(@Req() req: any, @Param("id") id?: string | number): Promise<Location> {

		const a = await this.service.getOne({where: {
			"EmployeeId": id,
			// "Registered": {
			// 	'$gte': date,
			// 	'$lt': nextDate
			// }
		},
		order: {
			"Created": "DESC"
		}});
		return a;
	}

	@ApiOperation({ summary: 'Create new location' })
	@ApiResponse({ status: 201, description: 'location created successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(@Req() req: any, @Body() object: any): Promise<Array<Location> | Location>{
		const location = {
			Lat: object.Lat,
			Lng: object.Lng,
			Employee: req.user.Id
		};
		return await this.service.save(location);
	}

	@ApiOperation({ summary: 'update location' })
	@ApiResponse({ status: 200, description: 'location updated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Put()
	public async put(@Req() req: any, @Body() object: any): Promise<Array<Location> | Location> {
		const location = {
			Id: object.Id,
			Lat: object.Lat,
			Lng: object.Lng,
			EmployeeId: req.user.Id
		};
		return this.service.update(location).then((res)=> Promise.resolve(res.raw)).catch((rej) => Promise.reject(rej));
	}


	@ApiOperation({ summary: 'Delete locations' })
	@ApiResponse({ status: 201, description: 'location deleted successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Delete(':id')
	public async delete(@Req() req: any, @Param('id') id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}
}

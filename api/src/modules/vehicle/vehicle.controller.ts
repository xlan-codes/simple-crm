import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req } from '@nestjs/common';
import { IController } from 'src/interfaces/controller/controller.interface';
import { Vehicle } from 'src/repositories/entities/vehicle.entity';
import { VehicleService } from 'src/services/vehicle/vehicle.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('vehicle')
export class VehicleController implements IController<Vehicle>{

	constructor(
		private service: VehicleService
	){

	}

	@Get()
	@ApiResponse({ status: 201, description: 'Get all vehicles or filter vehicles.'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	public async get(@Req() req: any, @Query("limit") limit?: number, @Query("offset") offset?: number, @Query('filter') filter?: any): Promise<Array<Vehicle> | Vehicle> {
		return this.service.get({where: filter,take:limit, skip: offset});
	}

	@Post()
	@ApiResponse({ status: 201, description: 'Vehicle created successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	public async post(@Body()object: Vehicle | Array<Vehicle>): Promise<Array<Vehicle> | Vehicle> {
		return this.service.save(object);
	}

	@Put()
	@ApiResponse({ status: 201, description: 'Vehicle updated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	public async put(@Body()object: Vehicle| Array<Vehicle>): Promise<Array<Vehicle> | Vehicle> {
		return this.service.update(object);
	}

	@Delete(":id")
	@ApiResponse({ status: 201, description: 'Vehicle deleted successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	public async delete(@Param('id')id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}

	
}

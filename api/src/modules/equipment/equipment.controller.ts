import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IController } from 'src/interfaces/controller/controller.interface';
import { EquipmentService } from 'src/services/equipment/equipment.service';
import { Equipment } from 'src/repositories/entities/equipment.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Equipment")
@Controller('equipment')
export class EquipmentController implements IController<Equipment>{


	constructor(
		private service: EquipmentService,
	){

	}

	@ApiOperation({ summary: 'Get all equipment based on filter' })
	@ApiResponse({ status: 200, description: 'equipments'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get( @Req() req: any, @Query() filter?: any): Promise<Array<Equipment>> {
		return this.service.get(filter);
	}

	@ApiOperation({ summary: 'Create Equipment' })
	@ApiResponse({ status: 200, description: 'Equipment created successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(@Body() object: any): Promise<Array<Equipment> | Equipment> {
		return this.service.save(object);
	}

	@ApiOperation({ summary: 'set Equipment Location' })
	@ApiResponse({ status: 201, description: 'Equipment Location updated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post('equipment-location')
	public async setEquipmentLocation(@Body() object: any): Promise<Array<Equipment> | Equipment> {
		return this.service.save(object);
	}

	@ApiOperation({ summary: 'set equipment holder' })
	@ApiResponse({ status: 201, description: 'equipment location setted'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post('equipment-holder')
	public async setEquipmentHolder(@Body() object: any): Promise<Array<Equipment> | Equipment> {
		return this.service.save(object);
	}

	@ApiOperation({ summary: 'update equipment' })
	@ApiResponse({ status: 200, description: 'equipment updated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Put()
	public async put(@Body() object: any): Promise<Array<Equipment> | Equipment> {
		const schedule = {
			Id: object.Id,
			Name: object.Name,
			Type: object.Type,
			Code: object.Code
		
		};
		return this.service.update(schedule);
	}

	@ApiOperation({ summary: 'delete equipment' })
	@ApiResponse({ status: 201, description: 'equipment deleted successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Delete(":id")
	public async delete(@Param('id') id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}
}

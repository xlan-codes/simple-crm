import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IController } from 'src/interfaces/controller/controller.interface';
import { Inventory } from 'src/repositories/entities/inventory.entity';
import { InventoryService } from 'src/services/inventory/inventory.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("Inventory")
@Controller('inventory')
export class InventoryController  implements IController<Inventory>{


	constructor(
		private service: InventoryService,
	){

	}

	@ApiOperation({ summary: 'Get invenotry' })
	@ApiResponse({ status: 200, description: 'return all ivenotry based on filter'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get(@Req() req: any, @Query("limit") limit?: number, @Query("offset") offset?: number, @Query('filter') filter?: any): Promise<Inventory | Array<Inventory>> {
		return this.service.get({where: filter,take:limit, skip: offset});
	}

	@ApiOperation({ summary: 'Create new inventory' })
	@ApiResponse({ status: 200, description: 'return all ivenotry based on filter'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(@Body() object: any): Promise<Array<Inventory> | Inventory> {
		return this.service.save(object);
	}

	@Put()
	public async put(@Body() object: any): Promise<Array<Inventory> | Inventory> {
		const schedule = {
			Id: object.Id
		};
		return this.service.update(schedule);
	}

	@Delete(":id")
	public async delete(@Param('id') id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}
}

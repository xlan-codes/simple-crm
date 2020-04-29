import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { IController } from 'src/interfaces/controller/controller.interface';
import { Item } from 'src/repositories/entities/item.entity';
import { ItemService } from 'src/services/item/item.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Item")
@Controller('item')
export class ItemController implements IController<Item>{

	constructor(
		private service: ItemService
	){

	}

	@ApiOperation({ summary: 'Get all items based on filter' })
	@ApiResponse({ status: 200, description: 'items'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get(@Query() filter?: any): Promise<Array<Item> | Item> {
		return this.service.get(filter);
	}

	@ApiOperation({ summary: 'Create new item' })
	@ApiResponse({ status: 201, description: 'item created successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(@Body()object: Item | Array<Item>): Promise<Array<Item> | Item> {
		return this.service.save(object);
	}


	@ApiOperation({ summary: 'update successfully' })
	@ApiResponse({ status: 200, description: 'Item udpated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Put()
	public async put(@Body()object: Item | Array<Item>): Promise<Array<Item> | Item> {
		return this.service.update(object);
	}

	@ApiOperation({ summary: 'Delete item' })
	@ApiResponse({ status: 200, description: 'item deleted successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Delete(":id")
	public async delete(@Param('id')id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}

	
}

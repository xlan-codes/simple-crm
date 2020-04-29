import { Controller, Get, Post, Delete, Body, Request, Put, Param, Req, Query } from '@nestjs/common';

import { RoomsService } from './rooms.service';
import { Room } from 'src/repositories/entities/room.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IController } from 'src/interfaces/controller/controller.interface';

@ApiTags("Room")
@Controller('room')
export class RoomsController implements IController<Room> {
  
  constructor(private readonly service: RoomsService) {}



	@ApiOperation({ summary: 'Get rooms based on filter' })
	@ApiResponse({ status: 200, description: 'return all rooms based on filter'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get(@Req() req: any, @Query('filter') filter?: any): Promise<Room | Array<Room>> {
		if(filter?.Id) {
			return this.service.getOne(filter.Id);
		} else {
			return this.service.get({where: filter,take:filter?.limit, skip: filter?.offset});
		}
	}
  
  	@ApiOperation({ summary: 'Creatw new room' })
	@ApiResponse({ status: 201, description: 'room created successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(@Request() req: any, @Body() body: Room): Promise<Array<Room> | Room> {
		return this.service.save(body);
	}

  	@ApiOperation({ summary: 'Update rooms' })
	@ApiResponse({ status: 200, description: 'rooms updated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Put()
	public async put(@Request() req: any, @Body() object: Room | Array<Room>): Promise<Room> {
		return this.service.update(object);
	}

  	@ApiOperation({ summary: 'Room deleted successfully' })
	@ApiResponse({ status: 200, description: 'Room deleted successdully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Delete(':id')
	public async delete(@Request() req, @Param("id") id: string | number) {
		return this.service.delete(id);
	}
}

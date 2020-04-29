import { Controller, Get, Post, Put, Delete, Req, Query } from '@nestjs/common';
import { IController } from 'src/interfaces/controller/controller.interface';
import { Role } from 'src/repositories/entities/role.entity';
import { RoleService } from 'src/services/role/role.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Roles")
@Controller('role')
export class RoleController implements IController<Role>{

	constructor(
		private service: RoleService
	){

	}

	@ApiOperation({ summary: 'Get all role or filter role' })
	@ApiResponse({ status: 201, description: 'Get roles'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get(@Req() req: any, @Query("limit") limit?: number, @Query("offset") offset?: number, @Query('filter') filter?: any): Promise<Array<Role> | Role> {
		return this.service.get({where: filter,take:limit, skip: offset});
	}

	@ApiOperation({ summary: 'Create new role' })
	@ApiResponse({ status: 201, description: 'Role Created'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(object: Role | Array<Role>): Promise<Array<Role> | Role> {
		return this.service.save(object);
	}

	@ApiOperation({ summary: 'Update role' })
	@ApiResponse({ status: 201, description: 'Role updated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Put()
	public async put(object: Role | Array<Role>): Promise<Array<Role> | Role> {
		return this.service.update(object).then((res)=> Promise.resolve(res.raw)).catch((rej) => Promise.reject(rej));
	}

	@ApiOperation({ summary: 'Delete Role' })
	@ApiResponse({ status: 201, description: 'Role Deleted Successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Delete()
	public async delete(id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}

	
}

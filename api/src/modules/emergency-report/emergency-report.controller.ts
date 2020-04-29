import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IController } from 'src/interfaces/controller/controller.interface';
import { EmergencyReportService } from 'src/services/emergency-report/emergency-report.service';
import { EmergencyReport } from 'src/repositories/entities/emergency-report.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("EmergencyReport")
@Controller('emergency-report')
export class EmergencyReportController implements IController<EmergencyReport>{

	constructor(
		private service: EmergencyReportService
	){

	}

	@ApiOperation({ summary: 'Get all emergency report based on filter' })
	@ApiResponse({ status: 200, description: 'emergency reports'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get(@Req() req: any, @Query("limit") limit?: number, @Query("offset") offset?: number, @Query('filter') filter?: any): Promise<EmergencyReport | Array<EmergencyReport>> {
		return this.service.get({where: filter,take:limit, skip: offset});
	}

	@ApiOperation({ summary: 'created new emergency report' })
	@ApiResponse({ status: 201, description: 'emergency report created successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(@Body() object: any): Promise<Array<EmergencyReport> | EmergencyReport> {
		return this.service.save(object);
	}

	@ApiOperation({ summary: 'Update emergency report' })
	@ApiResponse({ status: 200, description: 'emergency report updated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Put()
	public async put(@Body() object: any): Promise<Array<EmergencyReport> | EmergencyReport> {
		const schedule = {
			Id: object.Id
		};
		return this.service.update(schedule);
	}

	@ApiOperation({ summary: 'Delete emergency report' })
	@ApiResponse({ status: 200, description: 'emergency report deleted successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Delete(":id")
	public async delete(@Param('id') id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}

}

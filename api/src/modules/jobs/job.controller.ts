import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IController } from '../../interfaces/controller/controller.interface';
import { JobsService } from '../../services/jobs/jobs.service';
import { Job } from '../../repositories/entities/job.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomsService } from '../rooms/rooms.service';

@ApiTags("Job")
@Controller('job')
export class JobController  implements IController<Job>{

	constructor(
		private service: JobsService,
		private roomService: RoomsService
	){

	}


	@ApiOperation({ summary: 'Get all jobs or filter jobs' })
	@ApiResponse({ status: 200, description: 'all jobs'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get(@Req() req: any, @Query("limit") limit?: number, @Query("offset") offset?: number, @Query('filter') filter?: any): Promise<Array<Job> | Job> {
		return this.service.get({where: filter,take:limit, skip: offset});
	}

	@ApiOperation({ summary: 'create new job' })
	@ApiResponse({ status: 201, description: 'job created successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(@Body() object: any): Promise<Array<Job> | Job> {
		const job = await this.service.save(object);
		if(job) {
			this.roomService.save({
				RoomCode: job.JobNumber
			})
		}
		return job;
	}

	@ApiOperation({ summary: 'job upated successfully' })
	@ApiResponse({ status: 200, description: 'all jobs'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Put()
	public async put(@Body() object: any): Promise<Array<Job> | Job> {
		return this.service.update(object);
	}

	@ApiOperation({ summary: 'Delete job' })
	@ApiResponse({ status: 200, description: 'job deleted successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Delete(':id')
	public async delete(@Param('id') id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}
}

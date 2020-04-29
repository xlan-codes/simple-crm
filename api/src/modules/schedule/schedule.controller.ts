import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IController } from 'src/interfaces/controller/controller.interface';
import { ScheduleService } from 'src/services/schedule/schedule.service';
import { Schedule } from 'src/repositories/entities/schedule.entity';
import { EmployeeService } from 'src/services/employee/employee.service';
import { JobsService } from 'src/services/jobs/jobs.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags("schedule")
@Controller('schedule')
export class ScheduleController  implements IController<Schedule>{


	constructor(
		private service: ScheduleService,
		private employeeService: EmployeeService,
		private jobService: JobsService
	){

	}

	@ApiOperation({ summary: 'Get all schedules or filter schedules' })
	@ApiResponse({ status: 200, description: 'Get schedule'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get( @Req() req: any, @Query() filter?: any): Promise<Array<Schedule> | Schedule> {
		const user = req.user;
		if(filter.filter) {
			filter = JSON.parse(filter.filter);
			if(filter.Id){
				return this.service.getOne(filter.Id)
			}
			return this.service.get({where:filter});
		} else {
			return this.service.get();
		}
		// } else {
		// 	if(filter)
		// 	{
		// 		filter = JSON.parse(filter);
		// 		return this.service.get({where: filter});
		// 	} else {
		// 		return this.service.get({
		// 			where: {
						// 'Employee.Id': user.Id,
						// 'StartHour': filter.StartHour ? filter.StartHour : new Date(),
						// 'EndHour': filter.EndHour ? filter.EndHour : new Date()
		// 			}
		// 		});
		// 	}
		// }

	}

	@ApiOperation({ summary: 'Create schedule' })
	@ApiResponse({ status: 201, description: 'Schedule created successfully.'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(@Body() object: any): Promise<Array<Schedule> | Schedule> {
		const employee = await this.employeeService.getOne(object.Employee);
		const job = await this.jobService.getOne(object.Job);
		const schedule = {
			ScheduleSubject: object.ScheduleSubject,
			StartHour: object.StartHour,
			EndHour: object.EndHour,
			Employee: employee,
			Job: job,
			TaskDescription: object.TaskDescription
		};
		return this.service.save(schedule);
	}

	@ApiOperation({ summary: 'Update schedule' })
	@ApiResponse({ status: 200, description: 'Schedule updated successfully.'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Put()
	public async put(@Body() object: any): Promise<Array<Schedule> | Schedule> {
		const employee = await this.employeeService.getOne(object.Employee);
		const job = await this.jobService.getOne(object.Job);
		const schedule = {
			Id: object.Id,
			ScheduleSubject: object.ScheduleSubject,
			StartHour: object.StartHour,
			EndHour: object.EndHour,
			Employee: employee,
			Job: job,
			TaskDescription: object.TaskDescription
		};
		return this.service.update(schedule);
	}

	@ApiOperation({ summary: 'Delete schedule' })
	@ApiResponse({ status: 200, description: 'Schedule deleted successfully.'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Delete(':id')
	public async delete(@Param('id') id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}
}

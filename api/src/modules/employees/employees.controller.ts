import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IController } from 'src/interfaces/controller/controller.interface';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from 'src/repositories/entities/employee.entity';
import { WorkingHourService } from 'src/services/working-hour/working-hour.service';
import { WorkingHour } from 'src/repositories/entities/working-hour.entity';
import { JobsService } from 'src/services/jobs/jobs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Between } from 'typeorm';

@ApiTags("Employee")
@Controller('employee')
export class EmployeesController  implements IController<any>{


	constructor(
		private service: EmployeeService,
		private workingHourService: WorkingHourService,
		private jobService: JobsService
	){

	}

	@ApiOperation({ summary: 'Get employees based on filter' })
	@ApiResponse({ status: 200, description: 'get all employees'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get()
	public async get(@Req() req: any, @Query("limit") limit?: number, @Query("offset") offset?: number, @Query('filter') filter?: any): Promise<Employee | Array<Employee>> {
		return this.service.get({where: filter,take:limit, skip: offset});
	}

	@ApiOperation({ summary: 'crate new employee' })
	@ApiResponse({ status: 201, description: 'employee created successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post()
	public async post(@Body() object: Employee |  Array<Employee>): Promise<Array<Employee> | Employee> {
		return this.service.save(object);
	}

	@ApiOperation({ summary: 'Set check-in and check-out when employee start the task and when and the task ' })
	@ApiResponse({ status: 201, description: 'check-in, checkout created successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post('working-hour')
	public async setWorkingHour(@Body() object: WorkingHour): Promise<Array<WorkingHour> | WorkingHour> {
		const workingHour = {
			Id: object.Id,
			StartHour: object.StartHour,
			EndHour: object.EndHour,
			Job: object.Job,
			Employee: object.Employee,
			Type: object.Type
		}
		return this.workingHourService.save(workingHour);
	}

	@ApiOperation({ summary: 'Check if check-in or chec-out setted' })
	@ApiResponse({ status: 200, description: 'equipment location setted'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Post('working-hour-setted')
	public async checkIfWorkingHourSetted(@Body() object: any): Promise<Array<WorkingHour> | WorkingHour> {

		const date = new Date();
		date.setHours(0)
		date.setMinutes(0)
		date.setSeconds(0)
		const nextDate = new Date();
		nextDate.setDate(date.getDate()+1);
		const workingHour = {
			where: {
				"Job.Id": object.Job.Id,
				"Employee.Id": object.Employee.Id,
				"Registered": {
					'$gte': date,
					'$lt': nextDate
				}
			},
			order: {
				"Registered": "DESC"
			}
		}
		try {
			const result = await this.workingHourService.getOne(workingHour);
			return result;
		} catch (error) {
			return null;
		}

	}

	@ApiOperation({ summary: 'return timesheet based on filter' })
	@ApiResponse({ status: 200, description: 'timesheet'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Get('working-hour')
	public async getWorkingHour(@Req() req: any, @Query('filter') filter?: any): Promise<Array<WorkingHour> | WorkingHour> {
		const user = req.user;
		filter = filter ? JSON.parse(filter) : undefined;

		let tempFilter = undefined
		if(filter) {
			filter.Registered['$gte'] = new Date(filter.Registered.gte);
			filter.Registered['$lt'] = new Date(filter.Registered.lt);
			delete filter.Registered.gte;
			delete filter.Registered.lt;
			tempFilter = {
				"Registered": {
					'$gte': filter.Registered['$gte'],
					'$lt': filter.Registered['$lt']
				}
			}
		}

		// if(!user) {
		// 	return this.workingHourService.get(filter);
		// } else {
		// 	filter['Employee.Id'] = user.Id
			return this.workingHourService.get({
				where: tempFilter
			});
		// }
	}

	
	@ApiOperation({ summary: 'update employee' })
	@ApiResponse({ status: 200, description: 'Employee updated successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Put()
	public async put(@Body() object: Employee): Promise<Array<Employee> | Employee> {
		return this.service.update(object).then((res)=> Promise.resolve(res.raw)).catch((rej) => Promise.reject(rej));
	}

	
	@ApiOperation({ summary: 'Delete Employe' })
	@ApiResponse({ status: 200, description: 'Employee deleted successfully'})
	@ApiResponse({ status: 403, description: 'Forbidden'})
	@ApiResponse({ status: 401, description: 'Unauthorized'})
	@Delete(':id')
	public async delete(@Param('id') id: string | number): Promise<Boolean> {
		return this.service.delete(id);
	}
}

import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/repositories/entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService implements IService {

	constructor(
		@InjectRepository(Employee)
		private repository: Repository<Employee>
	) {

	}
	public async getOne(filter: any): Promise<any> {
		return this.repository.findOne(filter);
	}

	public async get(filter?: any): Promise<any> {
		return this.repository.find(filter);
	}

	public async save(object: any): Promise<any> {
		return this.repository.save(object);
	}


	public async delete(id: string | number): Promise<any> {
		return this.repository.delete(id).then((res) => Promise.resolve(true)).catch((rej) => Promise.resolve(false));
	}


	public async update(object: any): Promise<any> {
		return this.repository.update(object.Id,object).then((res)=> Promise.resolve(res.raw)).catch((rej) => Promise.reject(rej));
	}
}

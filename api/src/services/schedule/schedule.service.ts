import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/repositories/entities/schedule.entity';

@Injectable()
export class ScheduleService implements IService {

	constructor(
		@InjectRepository(Schedule)
		private repository: Repository<Schedule>
	) {

	}
	getOne(filter: any): Promise<Schedule> {
		return this.repository.findOne(filter);
	}

	public async get(filter?: any): Promise<Array<Schedule> | Schedule> {
		return this.repository.find(filter);
	}

	public async save(object: any): Promise<Schedule> {
		return this.repository.save(object);
	}

	public async update(object: any): Promise<Schedule | Array<Schedule>> {
		return this.repository.update(object.Id, object).then((res)=> Promise.resolve(res.raw)).catch((rej) => Promise.reject(rej));
	}

	public async delete(id: string | number): Promise<any> {
		this.repository.delete(id);
	}


}

import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/repositories/entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService implements IService {

	constructor(
		@InjectRepository(Job)
		private repository: Repository<Job>
	) {

	}
	public async getOne(filter: any): Promise<Job> {
		return this.repository.findOne(filter);
	}

	public async get(filter?: any): Promise<any> {
		return this.repository.find(filter);
	}
	public async save(object: any): Promise<any> {
		return this.repository.save(object);
	}
	public async delete(id: string | number): Promise<boolean> {
		return this.repository.delete(id).then((res) => Promise.resolve(true)).catch((rej) => Promise.reject(false));
	}
	public async update(object: any): Promise<any> {
		return this.repository.update(object.Id, object).then((res) => Promise.resolve(res.raw)).catch((rej) => Promise.reject(rej));
	}
}

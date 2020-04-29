import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from 'src/repositories/entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService implements IService{
		constructor(
		@InjectRepository(State)
		private repository: Repository<State>
	) {

	}
	
	getOne(filter: any): Promise<any> {
		return this.repository.findOne(filter);
	}

	public async get(filter?: any): Promise<any> {
		return this.repository.find(filter);
	}

	public async save(object: any): Promise<any> {
		return this.repository.save(object);
	}

	public async update(object: any): Promise<any> {
		return this.repository.update(object.Id, object);
	}

	public async delete(id: string | number): Promise<any> {
		this.repository.delete(id);
	}
}

import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkingHour } from 'src/repositories/entities/working-hour.entity';


@Injectable()
export class WorkingHourService implements IService{

		constructor(
		@InjectRepository(WorkingHour)
		private repository: Repository<WorkingHour>
	) {

	}
	public async getOne(filter: any): Promise<WorkingHour> {
		return this.repository.findOneOrFail(filter)
	}

	public async get(filter?: any): Promise<Array<WorkingHour> | WorkingHour> {
		return this.repository.find(filter);
	}

	public async save(object: any): Promise<Array<WorkingHour> | WorkingHour> {
		return this.repository.save(object)
	}

	public async delete(id: string | number): Promise<boolean> {
		return this.repository.delete(id).then((res) => Promise.resolve(true)).catch((rej)=> Promise.resolve(false));
	}

	public async update(object: WorkingHour): Promise<Array<any> | any> {
		return this.repository.update(object.Id, object);
	}

}

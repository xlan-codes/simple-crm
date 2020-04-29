import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/repositories/entities/vehicle.entity';

@Injectable()
export class VehicleService implements IService{

	constructor(
		@InjectRepository(Vehicle)
		private repository: Repository<Vehicle>
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

	public async update(object: any): Promise<any> {
		return this.repository.update(object.Id, object);
	}

	public async delete(id: string | number): Promise<any> {
		this.repository.delete(id);
	}
}

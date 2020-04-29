import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from 'src/repositories/entities/equipment.entity';

@Injectable()
export class EquipmentService implements IService{

	constructor(
		@InjectRepository(Equipment)
		private repository: Repository<Equipment>
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

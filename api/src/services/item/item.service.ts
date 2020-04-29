import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/repositories/entities/item.entity';

@Injectable()
export class ItemService implements IService {

	constructor(
		@InjectRepository(Item)
		private repository: Repository<Item>
	) {

	}
	getOne(filter: any): Promise<any> {
		return this.repository.findOne(filter);
	}


	public async get(filter?: any): Promise<any> {
		return this.repository.find();
	}

	public async save(object: any): Promise<any> {
		return this.repository.save(object);
	}

	public async delete(id: string | number): Promise<any> {
		return await this.repository.delete(id).then((res) => Promise.resolve(true)).catch((rej) => Promise.resolve(false));
	}

	public async update(object: any): Promise<any> {
		return this.repository.update(object.Id, object);
	}
}

import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/repositories/entities/role.entity';

@Injectable()
export class RoleService implements IService {

	constructor(
		@InjectRepository(Role)
		private repository: Repository<Role>
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
		return await this.repository.delete({Id: id}).then((res) => Promise.resolve(true)).catch((rej) => Promise.resolve(false));
	}

	public async update(object: any): Promise<any> {
		return this.repository.update(object.Id, object);
	}
}

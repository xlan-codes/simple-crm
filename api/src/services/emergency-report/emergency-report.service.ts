import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { EmergencyReport } from 'src/repositories/entities/emergency-report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmergencyReportService implements IService {


	constructor(
		@InjectRepository(EmergencyReport)
		private repository: Repository<EmergencyReport>
	) {

	}
	
	getOne(filter: any): Promise<EmergencyReport> {
		return this.repository.findOne(filter);
	}

	public async get(filter?: any): Promise<Array<EmergencyReport> | EmergencyReport> {
		return this.repository.find(filter);
	}

	public async save(object: any): Promise<EmergencyReport> {
		return this.repository.save(object);
	}

	public async update(object: any): Promise<Array<EmergencyReport> | EmergencyReport> {
		return this.repository.update(object.Id, object).then((res)=> Promise.resolve(res.raw)).catch((rej) => Promise.reject(rej));
	}

	public async delete(id: string | number): Promise<Boolean> {
		return this.repository.delete(id).then((res) => Promise.resolve(true)).catch((rej) => Promise.resolve(false));;
	}

}

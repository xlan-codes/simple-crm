import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/services/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/repositories/entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService implements IService{

	constructor(
		@InjectRepository(Country)
		private repository: Repository<Country>
	) {

	}
	getOne(filter: any): Promise<any> {
		throw new Error("Method not implemented.");
	}

	get(filter?: any): Promise<any> {
		throw new Error("Method not implemented.");
	}
	save(object: any): Promise<any> {
		throw new Error("Method not implemented.");
	}
	delete(id: string): Promise<any> {
		throw new Error("Method not implemented.");
	}
	update(object: any): Promise<any> {
		throw new Error("Method not implemented.");
	}
}

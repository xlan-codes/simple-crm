
export interface IService {
	getOne(filter: any): Promise<any>;
	get(filter?: any): Promise<any | Array<any>>;
	save(object: any): Promise<any | Array<any>>;
	delete(id: string): Promise<any>;
	update(object: any): Promise<any | Array<any>>;
}

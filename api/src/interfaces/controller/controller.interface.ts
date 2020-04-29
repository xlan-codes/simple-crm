
export interface IController<T> {
	get(req: any, limit?: number, offset?: number, filter?: any): Promise<Array<T> | T>;
	post(req: any, object: T | Array<T>): Promise<Array<T> | T>;
	put(req: any, object:T | Array<T>): Promise<Array<T> | T>;
	delete(req: any, id: number | string): Promise<Boolean>;
}

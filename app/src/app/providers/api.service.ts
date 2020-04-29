import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService<T> {
    
    protected baseUrl: string;
    constructor(protected http: HTTP) {
        this.baseUrl = environment.ibx_service;
    }

    
    public get(url: string, parameters?:any, header?: any): Promise<T> {
        return this.http.get(this.baseUrl + url,parameters, header).then((res)=> Promise.resolve(res.data)).catch((error) => Promise.reject(error));
    }

    public post(url: string, body?: T | Array<T>, header?: any): Promise<T> {
        return this.http.post(this.baseUrl + url,body, header).then((res)=> Promise.resolve(res.data)).catch((error) => Promise.reject(error));
    }

    public put(url: string, body?: T | Array<T>, header?: any): Promise<T> {
        return this.http.get(this.baseUrl + url,body, header).then((res)=> Promise.resolve(res.data)).catch((error) => Promise.reject(error));
    }

    public delete(url: string, parameters?:any, header?: any): Promise<T> {
        return this.http.delete(this.baseUrl + url,parameters, header).then((res)=> Promise.resolve(res.data)).catch((error) => Promise.reject(error));
    }
}
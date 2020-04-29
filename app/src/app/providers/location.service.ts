import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Location } from '../models/location.model'


@Injectable()
export class LocationService extends ApiService<Location> {

    private url: string;
    constructor(
        http: HTTP
    ){
        super(http);
        this.url = '/location';
    }

    public async sendLocation(location: Location): Promise<Location> {
        return this.post(this.url, location);
    }
}

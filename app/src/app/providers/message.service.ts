import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class MessageService extends ApiService<any> {

    constructor(
        public http: HTTP,
        private httpClient: HttpClient
    ) {
        super(http)
    }

    public getMessage(room: string): Observable<any> {
        return this.httpClient.get(environment.ibx_service + '/room?filter='+JSON.stringify({RoomCode: room}));
    }
}

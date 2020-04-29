import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiService } from './api.service';

@Injectable()
export class TimeSheetService extends ApiService<any> {

    constructor(protected http: HTTP) {
        super(http)
    }


    private async getTimeSheet(): Promise<any> {
        return this.get('/time-sheet');
    }
}

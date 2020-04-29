import { Component } from '@angular/core';

import { DataService } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { Schedule } from '../../models/schedule.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: Schedule;
  isFavorite = false;
  defaultHref = '';
  hideCheckIn: boolean;

  constructor(
    private dataProvider: DataService,
    private userProvider: UserData,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.dataProvider.getSchedule( this.route.snapshot.paramMap.get('sessionId')).subscribe((res)=>{
      this.session = res;
      this.dataProvider.checkIfCheckIn(res).subscribe((res)=>{
        if(res) {
          if(res.Type == 'CheckIn') {
            this.hideCheckIn = true;
          }
        }
      });
    });
  
  }

  ionViewDidEnter() {
    this.defaultHref = `/schedule`;
  }

  sessionClick(session: Schedule, type: string) {
    const workingHour = {
      // Id: session.Id,
      StartHour: this.hideCheckIn ? new Date(session.StartHour) : new Date(),
			EndHour: this.hideCheckIn ? new Date() : new Date(),
			Job: session.Job,
			Employee: session.Employee,
			Type: type
    }
    this.dataProvider.setEmployoeePresent(workingHour).subscribe(async(res) => {
      const alert = await this.alertController.create({
        header: '',
        subHeader: 'SUCCESSFULLY ' + this.hideCheckIn ? 'CHECKOUT': 'CHECKIN',
        message: '',
        buttons: ['OK']
      });
  
      await alert.present();
      this.hideCheckIn = !this.hideCheckIn;
    });
  }

}

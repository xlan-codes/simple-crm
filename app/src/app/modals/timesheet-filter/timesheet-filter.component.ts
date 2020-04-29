import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-timesheet-filter',
  templateUrl: './timesheet-filter.component.html',
  styleUrls: ['./timesheet-filter.component.scss'],
})
export class TimesheetFilterComponent implements OnInit {

  startDate: Date;
  endDate: Date;
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  apply() {
    this.modalCtrl.dismiss({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

}

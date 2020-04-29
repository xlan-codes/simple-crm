import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../providers/conference-data';
import { ModalController } from '@ionic/angular';
import { TimesheetFilterComponent } from '../../modals/timesheet-filter/timesheet-filter.component';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.page.html',
  styleUrls: ['./time-sheet.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeSheetPage implements OnInit {

  public data: any;
  public columns: any;
  public rows: any;

  constructor(
    private dataService: DataService,
    private modalController: ModalController
  ) { 
  }
  

  ngOnInit() {
    this.dataService.getTimeSheet().subscribe((res) => {
      this.rows = res;
    });
  }

  public async openModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: TimesheetFilterComponent,
      showBackdrop:true,
      backdropDismiss:true
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    debugger
    if(data) {
      const filter = {
        "Registered": {
					'gte': new Date(data.startDate),
					'lt': new Date(data.endDate)
				}
      }
      this.dataService.getTimeSheetByFilter(filter).subscribe((res) => {
        this.rows = res;
      })
    }
  }


}

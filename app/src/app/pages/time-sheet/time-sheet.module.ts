import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeSheetPageRoutingModule } from './time-sheet-routing.module';

import { TimeSheetPage } from './time-sheet.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { TimesheetFilterComponent } from '../../modals/timesheet-filter/timesheet-filter.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeSheetPageRoutingModule,
    NgxDatatableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  entryComponents:[TimesheetFilterComponent],
  declarations: [TimeSheetPage, TimesheetFilterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimeSheetPageModule {}

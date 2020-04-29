import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmergencyReportComponent } from './emergency-report.component';

const routes: Routes = [
  {
    path: '',
    component: EmergencyReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyReportRoutingModule { }

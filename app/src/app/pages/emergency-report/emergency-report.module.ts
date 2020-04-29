import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { EmergencyReportRoutingModule } from './emergency-report-routing.module';
import { EmergencyReportComponent } from './emergency-report.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmergencyReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EmergencyReportRoutingModule,
  ],
  providers: [
    EmailComposer,
    Camera
  ]
})
export class EmergencyReportModule { }

import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-emergency-report',
  templateUrl: './emergency-report.component.html',
  styleUrls: ['./emergency-report.component.scss'],
})
export class EmergencyReportComponent implements OnInit {

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  public emergencyReportSubject: string;
  
  private win: any = window;

  public images: Array<string>;

  public form  : FormGroup;

  constructor(
    private camera: Camera,
    private formBuilder: FormBuilder,
    private emailComposer: EmailComposer
  ) {
    this.form = this.formBuilder.group({
      to            : ["", Validators.required],
      cc            : ["", Validators.required],
      bcc           : ["", Validators.required],
      subject       : ["", Validators.required],
      message       : ["", Validators.required]
   });
   }


    public getTrustImg(imageSrc){
      let path = this.win.Ionic.WebView.convertFileSrc(imageSrc);
      return path;
    }

   public async takePicture(): Promise<void>{
      this.camera.getPicture(this.options).then((imageData) => {
          let base64Image = imageData;
          if(this.images === null || this.images === undefined) {
            this.images = new Array<string>();
          }
          this.images.push(base64Image);
        }, (err) => {
      });
   }

    
  sendEmail() {
    let email = {
      to: this.form.controls.to.value,
      cc: this.form.controls.cc.value,
      bcc: this.form.controls.bcc.value,
      attachments: this.images,
      subject: this.form.controls.subject.value,
      body: this.form.controls.message.value,
      isHtml: false
    };
 
    this.emailComposer.open(email);
  }

  ngOnInit() {}

}

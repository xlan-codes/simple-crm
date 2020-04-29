import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BackgroundGeolocation } from "@ionic-native/background-geolocation/ngx";
import { HTTP } from "@ionic-native/http/ngx";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationService } from './providers/location.service';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { SharedService } from './providers/shared.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AuthInterceptor } from './interceptors/auth.interceptor';


const config: SocketIoConfig = { url: environment.ibx_service, options: {
  query: {token: localStorage.getItem(environment.authtoken)}
} };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocationService,
    SharedService,
    LocalNotifications,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // Socket
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

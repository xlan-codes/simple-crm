import { Component, ViewEncapsulation } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserData } from './providers/user-data';
import { SwUpdate } from '@angular/service-worker';
import { Storage } from '@ionic/storage';
import { LocationService } from './providers/location.service';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from "@ionic-native/background-geolocation/ngx";
import { Socket } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    appPages = [
      {
        title: 'Schedule',
        url: '/schedule',
        icon: 'calendar'
      },
      {
        title: 'Emergency Report',
        url: '/emergency-report',
        icon: 'create'
      },
      {
        title: 'Time Sheet',
        url: '/time-sheet',
        icon: 'time'
      },
      {
        title: 'Chat',
        url: '/chat',
        icon: 'chatbox'
      },
      // {
      //   title: 'Map',
      //   url: '/map',
      //   icon: 'map'
      // },
      {
        title: 'Asset Tracking',
        url: '/asset-tracking',
        icon: 'apps'
      },

    ];

  loggedIn = false;
  dark = false;

  constructor(
    // private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private backgroundGeolocation: BackgroundGeolocation,
    private locationService: LocationService,
    private socket: Socket,
    private localNotifications: LocalNotifications

  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
    this.startBackgroundGeolocation();

    // this.swUpdate.available.subscribe(async (res) => {
    //   const toast = await this.toastCtrl.create({
    //     message: 'Update available!',
    //     position: 'bottom',
    //     buttons: [
    //       {
    //         role: 'cancel',
    //         text: 'Reload'
    //       }
    //     ]
    //   });

    //   await toast.present();

    //   toast
    //     .onDidDismiss()
    //     .then(() => this.swUpdate.activateUpdate())
    //     .then(() => window.location.reload());
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initChat() {
    this.socket.emit('join', localStorage.getItem(environment.authtoken));
    this.socket.fromEvent("message").subscribe((res) => {
      this.localNotifications.schedule({
        id: 1,
        text: 'IXB Task Manager - New Message',
        sound: null,
        // data: { secret: key }
      });
    })
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });


    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/login');
    });
  }

  
  startBackgroundGeolocation() {
    
    if (this.platform.is("android")) {
      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 1,
        distanceFilter: 1,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false // enable this to clear background location settings when the app terminates
      };
  
      this.backgroundGeolocation.configure(config).then(() => {
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
          .subscribe((location: BackgroundGeolocationResponse) => {
            console.log(location);
            this.sendGPS(location);
          });
      });

      
    // start recording location
    this.backgroundGeolocation.start();

    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();
    } else {
      this.sendGPS({
        lat: 45243432,
        lng: 123213213,
        timestamp: 2432534
      });
    }


  }

  sendGPS(location) {
    if (location.speed == undefined) {
      location.speed = 0;
    }
    let timestamp = new Date(location.time).getTime();

    this.locationService.sendLocation(
      {
          lat: location.latitude,
          lng: location.longitude,
          timestamp: timestamp
      } 
    )

  }
}

import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';

import { darkStyle } from './map-dark-style';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: DataService,
    private platform: Platform) {}

  async ngAfterViewInit() {
    this.loadMap();
  }

    loadMap() {

      let map = GoogleMaps.create( 'map' );
    
      map.one( GoogleMapsEvent.MAP_READY ).then( ( data: any ) => {
    
        let coordinates: LatLng = new LatLng( 36.7783, 119.4179 );
    
        let position = {
          target: coordinates,
          zoom: 14
        };
    
        map.animateCamera( position );
    
        let markerOptions: MarkerOptions = {
          position: coordinates,
          icon: "assets/images/marker.png",
          title: 'Hello California'
        };
    
        const marker = map.addMarker( markerOptions )
        .then( ( marker: Marker ) => {
          marker.showInfoWindow();
        });
      })
    }
}



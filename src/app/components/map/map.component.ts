import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control, latLng, Map, Marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  // public locControlForm = new FormControl();
  // public locControl: boolean;
  userlocation: any;
  marker: any;

  constructor() { }
  options = {
      layers: [
          tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 17,
      center: latLng(48.41645121307068,  2.7258886999698015),
      tms: true
  };
  layersProviders = [
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', // TOPO Max zoom 17
    'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
  ];

  public map: Map;
  // public locateOptions = {
  //   flyTo: false,
  //   keepCurrentZoomLevel: true,
  //   locateOptions: {
  //                enableHighAccuracy: true,
  //              },
  //   icon: 'material-icons md-18 target icon',
  //   clickBehavior: {inView: 'stop',
  //                   outOfView: 'setView',
  //                   inViewNotFollowing: 'setView'}
  // };

  ngOnInit(): void {
    // map.locate({setView: true, maxZoom: 16});
  }

  onMapReady(map: Map) {
    this.map = map;
    // map.locate({setView : false}).on('locationfound', console.log);
    map.locate().on('locationfound', (event) => {
      this.userlocation = event.latlng;
      this.marker = [new Marker(this.userlocation)];
    });
    // map.addControl(new Control());
  }

  onClick($event) {
    console.log('$event', $event);
  }

  onNewLocation($event) {}

}

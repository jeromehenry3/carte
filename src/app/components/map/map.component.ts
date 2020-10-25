import { Component, OnInit, ChangeDetectionStrategy, DoCheck, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control, latLng, Map, Marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, DoCheck {
  // public locControlForm = new FormControl();
  // public locControl: boolean;
  userlocation: L.LocationEvent;
  marker: L.CircleMarker[] = [];

  constructor(private zone: NgZone) { }
  options: L.MapOptions = {
    layers: [
        tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 17,
    center: latLng(48.41645121307068,  2.7258886999698015),
    zoomControl: true,
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

  ngDoCheck(): void {
  }

  onMapReady(map: Map) {
    this.map = map;
    // map.locate({setView : false}).on('locationfound', console.log);
    this.map.locate({watch: true, enableHighAccuracy: true}).on('locationfound', (event) => {
      console.log('event', event);
      console.log('map', map);
      this.userlocation = event;
      const distance = this.userlocation.latlng.distanceTo(event.bounds.getNorthEast());
      console.log('distance', distance);
      this.marker = [
        new L.CircleMarker(this.userlocation.latlng, {radius: 1, color: 'red'}),
        new L.Circle(this.userlocation.latlng, {radius: event.accuracy}),
        // new L.CircleMarker(this.userlocation.latlng, {radius: distance}),
        new L.CircleMarker(event.bounds.getNorthEast(), {radius: 1, color: 'red'}),
        new L.CircleMarker(event.bounds.getSouthWest(), {radius: 1, color: 'red'}),
      ];
      // if (this.map.hasLayer(this.marker[1])) {
      //   this.marker[1].remove();
      // }
      // this.marker.map(m => {
      //   m.addTo(this.map);
      // });
    }).on('locationerror', console.error);
    // map.addControl(new Control());
  }

  onZoomEnd($event) {
    console.log('onzoomend', $event);
    // if (this.map.hasLayer(this.marker[1])) {
    //   console.log('marker will be removed')
    //   this.map.removeLayer(this.marker[1])
    // }
    // this.marker = [
    //   new L.CircleMarker(this.userlocation.latlng, {radius: this.userlocation.accuracy / 2}),
    // ]
    // this.map.addLayer(this.marker[0]);
    // this.marker = [
    //   new L.CircleMarker(this.userlocation.latlng, {radius: 1, color: 'red'}),
    //   new L.CircleMarker(this.userlocation.latlng, {radius: this.userlocation.accuracy / 2}),
    //   // new L.CircleMarker(this.userlocation.latlng, {radius: distance}),
    //   new L.CircleMarker(this.userlocation.bounds.getNorthEast(), {radius: 1, color: 'red'}),
    //   new L.CircleMarker(this.userlocation.bounds.getSouthWest(), {radius: 1, color: 'red'}),
    // ];
  }

  onClick($event) {
    console.log('$event', $event);
  }

  onNewLocation($event) {}

}

import { Component, OnInit, ChangeDetectionStrategy, DoCheck, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control, latLng, Map, Marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, DoCheck {

  userlocation: L.LocationEvent;
  marker: L.CircleMarker[] = [];

  constructor() { }
  layersProviders = [
    {link: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', maxZoom: 17}, // TOPO Max zoom 17
    {link: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', maxZoom: 20},
    {link: 'https://tileserver.4umaps.com/{z}/{x}/{y}.png', maxZoom: 15}, // TOPO max 15
    {link: 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=6f309b17204a493a8a95f00d8304f973', maxZoom: 100},
    {link: 'https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=6f309b17204a493a8a95f00d8304f973', maxZoom: 100}
  ];
  options: L.MapOptions = {
    layers: [
        tileLayer(this.layersProviders[4].link, { maxZoom: this.layersProviders[4].maxZoom, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(48.41645121307068,  2.7258886999698015),
    zoomControl: true,
  };


  public map: Map;


  ngOnInit(): void {

    // navigator.mediaDevices.getUserMedia({ audio: true })
    // .then(stream => {
    //   const mediaRecorder = new MediaRecorder(stream);
    //   mediaRecorder.start();
    //   console.log('start')

    //   const audioChunks = [];
    //   mediaRecorder.addEventListener("dataavailable", event => {
    //     audioChunks.push(event.data);
    //   });

    //   mediaRecorder.addEventListener("stop", () => {
    //     const audioBlob = new Blob(audioChunks);
    //     const audioUrl = URL.createObjectURL(audioBlob);
    //     const audio = new Audio(audioUrl);
    //     audio.play();
    //     console.log('play')
    //   });

    //   setTimeout(() => {
    //     mediaRecorder.stop();
    //   }, 3000);
    // });
  }

  ngDoCheck(): void {
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.locate({watch: true, enableHighAccuracy: true}).on('locationfound', (event) => {
      console.log('event', event);
      console.log('map', map);
      this.userlocation = event;
      const distance = this.userlocation.latlng.distanceTo(event.bounds.getNorthEast());
      console.log('distance', distance);
      this.marker = [
        new L.CircleMarker(this.userlocation.latlng, {radius: 1, color: 'red'}),
        new L.Circle(this.userlocation.latlng, {radius: event.accuracy}),
        new L.CircleMarker(event.bounds.getNorthEast(), {radius: 1, color: 'red'}),
        new L.CircleMarker(event.bounds.getSouthWest(), {radius: 1, color: 'red'}),
      ];

    }).on('locationerror', console.error);
  }

  onZoomEnd($event) {
    console.log('onzoomend', $event);

  }

  onClick($event) {
    console.log('$event', $event);
  }

  onNewLocation($event) {}

}

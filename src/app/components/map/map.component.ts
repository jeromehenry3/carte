import { Component, OnInit, ChangeDetectionStrategy, DoCheck, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control, latLng, Map, Marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { LoginService } from 'src/app/services/login.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, DoCheck {

  userlocation: L.LocationEvent;
  marker: L.CircleMarker[] = [];
  places: L.CircleMarker[] = [];

  constructor(
    private loginService: LoginService,
    private placesService: PlacesService
  ) { }
  layersProviders = [
    { link: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', maxZoom: 17 }, // TOPO Max zoom 17
    { link: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', maxZoom: 20 },
    { link: 'https://tileserver.4umaps.com/{z}/{x}/{y}.png', maxZoom: 15 }, // TOPO max 15
    { link: 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=6f309b17204a493a8a95f00d8304f973', maxZoom: 100 },
    { link: 'https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=6f309b17204a493a8a95f00d8304f973', maxZoom: 100 }
  ];
  options: L.MapOptions = {
    layers: [
      tileLayer(this.layersProviders[1].link, { maxZoom: this.layersProviders[1].maxZoom, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(48.41645121307068, 2.7258886999698015),
    zoomControl: true,
  };


  public map: Map;


  ngOnInit(): void {
    this.loginService.check().subscribe();
    this.placesService.getAll().subscribe((data: any) => {
      console.log('data', data);
      this.places = data.map(
        place => {
          return new L.CircleMarker({lat: place.latitude, lng: place.longitude}, { radius: 1, color: 'blue' })
        }
      );
    });
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
    this.map.locate({ watch: true, enableHighAccuracy: true }).on('locationfound', (event) => {
      this.userlocation = event;
      const distance = this.userlocation.latlng.distanceTo(event.bounds.getNorthEast());
      this.marker = [
        new L.CircleMarker(this.userlocation.latlng, { radius: 1, color: 'red' }),
        new L.Circle(this.userlocation.latlng, { radius: event.accuracy }),
        new L.CircleMarker(event.bounds.getNorthEast(), { radius: 1, color: 'red' }),
        new L.CircleMarker(event.bounds.getSouthWest(), { radius: 1, color: 'red' }),
      ];

    }).on('locationerror', console.error);
  }

  getMarkers(): any {
    return [
      ...this.marker,
      ...this.places,
    ];
  }

  onZoomEnd($event) {
    console.log('onzoomend', $event);

  }

  onClick($event) {
    console.log('$event', $event);
    const place = {
      latitude: $event.latlng.lat,
      longitude: $event.latlng.lng,
      type: 'clicked'
    };
    this.placesService.setPlace(place).subscribe((response: any) => {
      console.log('response', response);
    });
  }

  onNewLocation($event) { }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  getArc(): string {
    return 'M60,60 A10 10 0 0 1 ' + this.polarToCartesian(60, 60, 10, 45).x + ' ' + this.polarToCartesian(60, 60, 10, 45).y;
  }

  describeArc(x, y, radius, startAngle, endAngle) {

    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, arcSweep, 0, end.x, end.y,
      // 'L', x, y,
      // 'L', start.x, start.y
    ].join(' ');

    return d;
  }

}

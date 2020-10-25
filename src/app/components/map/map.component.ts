import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

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
  ]

  ngOnInit(): void {
  }

  onClick($event) {
    console.log('$event', $event);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private layersProviders: Array<{urlTemplate: string, maxZoom?: number}> = [
    { urlTemplate: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', maxZoom: 17 }, // TOPO Max zoom 17
    { urlTemplate: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', maxZoom: 20 },
    { urlTemplate: 'https://tileserver.4umaps.com/{z}/{x}/{y}.png', maxZoom: 15 }, // TOPO max 15
    { urlTemplate: 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=6f309b17204a493a8a95f00d8304f973', maxZoom: 100 },
    { urlTemplate: 'https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=6f309b17204a493a8a95f00d8304f973', maxZoom: 100 }
  ];

  layerSubject$: BehaviorSubject<{urlTemplate: string, maxZoom?: number}> = new BehaviorSubject(this.layersProviders[0]);
  userLocationSubject$: BehaviorSubject<L.LocationEvent> = new BehaviorSubject(undefined);

  constructor() {
  }

  setLayer(index: number): void {
    console.log('setLayer', index);
    this.layerSubject$.next(this.layersProviders[index]);
  }

  updateUserLocation(locationEvent: L.LocationEvent): void {
    this.userLocationSubject$.next(locationEvent);
  }

}

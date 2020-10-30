import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-layers-selector',
  templateUrl: './layers-selector.component.html',
  styleUrls: ['./layers-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayersSelectorComponent implements OnInit {

  modalOpened = false;
  constructor(
    private mapService: MapService,
  ) { }

  ngOnInit(): void {
  }

  onButtonClick($event: Event): void {
    $event.stopImmediatePropagation();
    this.modalOpened = !this.modalOpened;
  }

  setLayer(index: number) {
    this.mapService.setLayer(index - 1);
  }

}

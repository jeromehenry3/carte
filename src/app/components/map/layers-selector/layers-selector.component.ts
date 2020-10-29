import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layers-selector',
  templateUrl: './layers-selector.component.html',
  styleUrls: ['./layers-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayersSelectorComponent implements OnInit {

  modalOpened = false;
  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick($event: Event): void {
    $event.stopImmediatePropagation();
    this.modalOpened = !this.modalOpened;
  }

}

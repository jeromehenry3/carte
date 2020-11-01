import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-add-marker-dialog',
  templateUrl: './add-marker-dialog.component.html',
  styleUrls: ['./add-marker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMarkerDialogComponent implements OnInit {
  addMarkerForm: FormGroup;
  userPosition: {latitude: number, longitude: number};

  constructor(
    private dialogRef: MatDialogRef<AddMarkerDialogComponent>,
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private placesService: PlacesService,
  ) { }

  ngOnInit(): void {
    const actualPosition = this.mapService.userLocationSubject$.getValue();
    console.log('actualPosition', actualPosition);
    this.userPosition = {
      latitude: actualPosition.latlng.lat,
      longitude: actualPosition.latlng.lng,
    };
    this.addMarkerForm = this.formBuilder.group({
      title: '',
      description: '',
      latitude: this.userPosition.latitude,
      longitude: this.userPosition.longitude,
      type: '',
      // picture: '',
    });
  }

  onSubmit(value: FormGroup): void {
    console.log(value);
    this.placesService.setPlace(this.addMarkerForm.value).subscribe((response: any) => {
      this.dialogRef.close(true);
    });
  }

  close(): void {
    this.dialogRef.close(null);
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-marker-dialog',
  templateUrl: './add-marker-dialog.component.html',
  styleUrls: ['./add-marker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMarkerDialogComponent implements OnInit {
  addMarkerForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddMarkerDialogComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addMarkerForm = this.formBuilder.group({
      title: '',
      description: '',
      latitude: '',
      longitude: '',
      type: '',
      picture: '',
    });
  }

  onSubmit(value: FormGroup): void {
    console.log(value);
  }

  close(): void {
    this.dialogRef.close(null);
  }

}

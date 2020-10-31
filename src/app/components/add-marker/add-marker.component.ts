import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddMarkerDialogComponent } from 'src/app/dialogs/add-marker-dialog/add-marker-dialog.component';

@Component({
  selector: 'app-add-marker',
  templateUrl: './add-marker.component.html',
  styleUrls: ['./add-marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMarkerComponent implements OnInit {


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal() {
    const config = new MatDialogConfig();
    this.dialog.open(AddMarkerDialogComponent, config);
  }


}

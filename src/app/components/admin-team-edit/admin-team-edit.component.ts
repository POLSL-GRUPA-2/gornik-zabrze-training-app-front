import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Team } from 'src/app/_models/team';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

export interface DialogData {
  team_id: number;
  team_name: string;
  team_coach_id: number;
}

@Component({
  selector: 'app-admin-team-edit',
  templateUrl: './admin-team-edit.component.html',
  styleUrls: ['./admin-team-edit.component.scss']
})
export class AdminTeamEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Team
    ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
/*

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
*/

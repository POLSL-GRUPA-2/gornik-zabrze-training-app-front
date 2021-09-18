import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-coach-new-task-dialog',
  templateUrl: './coach-new-task-dialog.component.html',
  styleUrls: ['./coach-new-task-dialog.component.scss']
})
export class CoachNewTaskDialogComponent implements OnInit {

  optionChecked!: string
  option: string = "notChecked"

  constructor(public dialogRef: MatDialogRef<CoachNewTaskDialogComponent>,) { }

  ngOnInit(): void {
    
  }

  onClickCreate(): void {
    this.dialogRef.close()
  }

}

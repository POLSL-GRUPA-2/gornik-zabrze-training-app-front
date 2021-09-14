import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDialogService } from 'src/app/services/task-dialog/task-dialog.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  //message used by service
  message!: string;
  task!: Task

  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>, private taskDialogData: TaskDialogService, 
    private taskData: TaskService) { 

    }

  ngOnInit(): void {
    this.taskDialogData.currentMessage.subscribe(message => this.message = message)
    //this.taskData.currentTask.subscribe(task => this.task = task)
    //this.taskData.currentTask.subscribe(task => this.task = task.)
  }

}

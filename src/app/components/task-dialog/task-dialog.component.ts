import { Component, Inject, Input, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TaskDialogService } from 'src/app/services/task-dialog/task-dialog.service'
import { TaskService } from 'src/app/services/task/task.service'
//import { Task } from 'src/app/_models/Task'

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  //message used by service
  message!: string
  taskId!: number
  deadline!: string
  task!: Task


  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private taskDialogData: TaskDialogService,
    private taskData: TaskService
  ) {}

  ngOnInit(): void {
    this.taskDialogData.currentTaskDescription.subscribe(
      (message) => (this.message = message)
    )
    this.taskDialogData.currentTaskId.subscribe(
      (taskId) => (this.taskId = taskId)
    )
    this.taskDialogData.currentDeadline.subscribe(
      (deadline) => (this.deadline = deadline)
    )

    //this.taskData.currentTask.subscribe(task => this.task = task)
    //this.taskData.currentTask.subscribe(task => this.task = task.)
  }
}

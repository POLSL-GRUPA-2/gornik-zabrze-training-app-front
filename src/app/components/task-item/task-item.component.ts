import { Component, OnInit, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { TaskDialogService } from 'src/app/services/task-dialog/task-dialog.service'

// import task interface
import { Task } from 'src/app/_models/Task'
import { TaskDialogComponent } from '../task-dialog/task-dialog.component'

// task also contains checkbox
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  //TODO: task undefined
  @Input() task!: Task
  @Input()
  checked!: boolean

  //message used by service
  message!: string
  taskId!: number
  deadline!: string

  //service used in constructor
  constructor(public dialog: MatDialog, private data: TaskDialogService) {}

  ngOnInit(): void {
    //subscribe to the current message observable and set its value to message variable
    this.data.currentMessage.subscribe((message) => (this.message = message))
    this.data.currentTaskId.subscribe((taskId) => (this.taskId = taskId))
    this.data.currentDeadline.subscribe(
      (deadline) => (this.deadline = deadline)
    )
  }

  openDialog(): void {
    //change value of subscribed message, when its executed -
    //new data is automatically broadcast to all components subscribed to it
    this.data.changeMessage(this.task.description!)
    this.data.changeTaskId(this.task.id!)
    this.data.changeDeadline(this.task.task_date!)

    const dialogRef = this.dialog.open(TaskDialogComponent)

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`)
    })
  }
}

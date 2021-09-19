import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { TaskDialogService } from 'src/app/services/task-dialog/task-dialog.service'
import { TaskService } from 'src/app/services/task/task.service'
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
  @Input() task!: Task
  checked!: boolean

  form!: FormGroup
  disabled: boolean

  //message used by service
  message!: string
  taskId!: number
  deadline!: string

  mark!: string

  //service used in constructor
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private data: TaskDialogService,
    private taskData: TaskService
  ) {
    this.disabled = false
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.task)
    if (localStorage.getItem('userRole') === '1') {
      if (this.task.team_id) {
        this.disabled = true
      } else if (this.task.player_id) {
        this.disabled = false
      }
    } else if (localStorage.getItem('userRole') === '2') {
      if (this.task.team_id) {
        this.disabled = false
      } else if (this.task.player_id) {
        this.disabled = true
      }
    }
    if (this.task.done == true) {
      this.mark = 'MARK AS TODO'
    } else {
      this.mark = 'MARK AS DONE'
    }
    this.data.currentTaskDescription.subscribe(
      (message) => (this.message = message)
    )
    // this.data.currentMessage.subscribe((message) => (this.message = message)),
    this.data.currentTaskId.subscribe((taskId) => (this.taskId = taskId)),
      this.data.currentDeadline.subscribe(
        (deadline) => (this.deadline = deadline)
      )
  }

  //mark task as done/not done in DB and refresh the page
  onCheckboxClick(event: { checked: boolean }) {
    this.checked = event.checked
    // this.changedTask.done = this.checked
    if (this.task.done == false) {
      this.task.done = this.checked
    } else {
      this.task.done = !this.checked
    }

    this.form = this.formBuilder.group(this.task)
    this.changeTask()

    //emit to parent date and create function in parent to view all tasks again
  }

  changeTask(): void {
    const val = this.form.getRawValue()
    this.taskData
      .changeTaskDone(localStorage.getItem('playerId'), this.task.id!, val)
      .subscribe((res) => {})
  }

  openDialog(): void {
    //change value of subscribed message, when its executed -
    //new data is automatically broadcast to all components subscribed to it
    this.data.changeTaskDescription(this.task.description!)
    this.data.changeTaskId(this.task.id!)
    this.data.changeDeadline(this.task.task_date!)

    const dialogRef = this.dialog.open(TaskDialogComponent)

    dialogRef.afterClosed().subscribe((result) => {})
  }
}

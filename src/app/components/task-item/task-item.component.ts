
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogService } from 'src/app/services/task-dialog/task-dialog.service';
import { TaskService } from 'src/app/services/task/task.service';


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
   checked!: boolean;

   form!: FormGroup
   checkbox!: FormGroup

  //message used by service
  message!: string
  taskId!: number
  deadline!: string

  //service used in constructor
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder,
     private data: TaskDialogService, private taskData: TaskService) { 
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.task)
    // this.checkbox = this.formBuilder.group({checked: false})

    //subscribe to the current message observable and set its value to message variable

    this.data.currentTaskDescription.subscribe(message => this.message = message)
    // this.data.currentMessage.subscribe((message) => (this.message = message)),
    this.data.currentTaskId.subscribe((taskId) => (this.taskId = taskId)),
    this.data.currentDeadline.subscribe(
      (deadline) => (this.deadline = deadline)

    )
  }

  //mark task as done/not done in DB and refresh the page
  onCheckboxClick(event: { checked: boolean; }){
    console.log('player_id :>> ', localStorage.getItem('playerId'));
    console.log('task.id :>> ', this.task.id);
    this.checked = event.checked
    // this.changedTask.done = this.checked
    this.task.done = this.checked
    this.form = this.formBuilder.group(this.task)
    console.log('this.checked :>> ', this.checked);
    console.log('this.task.done :>> ', this.task.done);
    this.changeTask()

    //emit to parent date and create function in parent to view all tasks again
   }

  changeTask(): void {
    console.log('this.form.getRawValue() :>> ', this.form.getRawValue());
    const val = this.form.getRawValue()
    this.taskData.changeTaskDone(localStorage.getItem('playerId'), this.task.id!, val).subscribe(
      (res) => {
        // this.task = res
        console.log('TASK CHANGE' + res)
        //Emitters.authEmitter.emit(true)
      },
      (err) => {
        //Emitters.authEmitter.emit(false)
      }
    )
  }

  openDialog(): void {
    //change value of subscribed message, when its executed -
    //new data is automatically broadcast to all components subscribed to it
    this.data.changeTaskDescription(this.task.description!)
    this.data.changeTaskId(this.task.id!)
    this.data.changeDeadline(this.task.task_date!)

    const dialogRef = this.dialog.open(TaskDialogComponent)

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`)
    })
  }
}

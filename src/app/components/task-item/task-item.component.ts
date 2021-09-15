import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogService } from 'src/app/services/task-dialog/task-dialog.service';
import { TaskService } from 'src/app/services/task/task.service';

// import task interface
import { Task } from 'src/app/_models/Task';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

// task also contains checkbox
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  //TODO: task undefined
   @Input() task!: Task
   checked!: boolean;

  //message used by service
  message!: string;

  //service used in constructor
  constructor(public dialog: MatDialog, private data: TaskDialogService, private taskData: TaskService) { 
  }

  ngOnInit(): void {

    //subscribe to the current message observable and set its value to message variable
    this.data.currentTaskDescription.subscribe(message => this.message = message)
  }

  //emit checkbox change and id of task
  //mark task as done in DB and refresh the page
  onCheckboxClick(event: { checked: any; }){
    console.log('player_id :>> ', localStorage.getItem('playerId'));
    console.log('task.id :>> ', this.task.id);
    this.checked = event.checked
    console.log('this.checked :>> ', this.checked);
    this.changeTask()
   }

  changeTask(): void {
    this.taskData.changeTaskDone(localStorage.getItem('playerId'), this.task.id!, this.checked).subscribe(
      (res) => {
        // this.tasks = res
        this.task = res
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
    this.data.changeMessage(this.task.description!)

    const dialogRef = this.dialog.open(TaskDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }
  
}

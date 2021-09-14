import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//importing task interface
import { Task } from 'src/app/_models/Task';
//importing service - need to add as a provider into a constructor
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';

import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-tasks-task-list',
  templateUrl: './tasks-task-list.component.html',
  styleUrls: ['./tasks-task-list.component.scss']
})
export class TasksTaskListComponent implements OnInit {
  tasks: Task[] = []
  user!: User;
  disabled = true;

  //service argument needed
  constructor(private taskService: TaskService) { }

  //subscribing to observable - (return value) => do what we want with it
  ngOnInit(): void {
    // this.getUser()
    // this.getTasks()
    //PLACEHOLDER
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks)
  }

  // getUser(): void {
  //   this.taskService.getCurrentUser()
  //     .subscribe(
  //       res => {
  //       this.tasks = res
  //       console.log('user :>> ', res);
  //       //Emitters.authEmitter.emit(true)
  //     },
  //     err=>{
  //       //Emitters.authEmitter.emit(false)
  //     })
  // }

  getTasks(): void {
    this.taskService.getCurrentTask()
      .subscribe(
        res => {
        this.tasks = res
        console.log("task dd" + res)
        //Emitters.authEmitter.emit(true)
      },
      err=>{
        //Emitters.authEmitter.emit(false)
      })
  }

  onClickDoneTasks() {
  }

}

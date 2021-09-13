import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//importing task interface
import { Task } from 'src/app/_models/Task';
//importing service - need to add as a provider into a constructor
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-tasks-task-list',
  templateUrl: './tasks-task-list.component.html',
  styleUrls: ['./tasks-task-list.component.scss']
})
export class TasksTaskListComponent implements OnInit {
  tasks: Task[] = []
  disabled = true;

  //service argument needed
  constructor(private taskService: TaskService) { }

  //subscribing to observable - (return value) => do what we want with it
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks)
  }

  onClickDoneTasks() {
    console.log()
  }

}

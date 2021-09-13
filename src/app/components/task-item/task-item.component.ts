import { Component, OnInit, Input } from '@angular/core';

// import task interface
import { Task } from 'src/app/_models/Task';

// task also contains checkbox
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  //TODO: task undefined
   @Input() task!: Task
   @Input()
  checked!: boolean;

  constructor() { 
  }

  ngOnInit(): void {
  }

}

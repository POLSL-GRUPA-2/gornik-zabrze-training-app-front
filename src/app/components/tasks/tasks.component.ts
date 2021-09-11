import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  
  constructor(

  ) { }

  ngOnInit(): void {
  }

  getCalendar(color: string) {
    console.log("Choose date from calendar")
    console.log(color)
  }
}
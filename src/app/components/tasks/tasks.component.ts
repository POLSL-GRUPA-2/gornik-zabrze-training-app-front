import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  userRole: number
  constructor(
    
  ) { 
    this.userRole = parseInt(localStorage.getItem("userRole")!)
  }

  ngOnInit(): void {
    console.log('this.userRole :>> ', this.userRole);
  }

  getCalendar(color: string) {
    console.log("Choose date from calendar")
    console.log(color)
  }
}
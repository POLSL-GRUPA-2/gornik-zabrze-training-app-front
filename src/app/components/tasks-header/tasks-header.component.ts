import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-tasks-header',
  templateUrl: './tasks-header.component.html',
  styleUrls: ['./tasks-header.component.scss']
})
export class TasksHeaderComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;
  @Output() buttonClick = new EventEmitter<string>()

  constructor() { 
    this.text = "Choose date from calendar"
    this.color = "warm"
  }

  ngOnInit(): void {
    // let date2 = new Date().toLocaleDateString();
    // console.log(date2)
  }

  date = new FormControl(new Date())
  

  onClick(color: string) {
    this.buttonClick.emit(color)
  }
}

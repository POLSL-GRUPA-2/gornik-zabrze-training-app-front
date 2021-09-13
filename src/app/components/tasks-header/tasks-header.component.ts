import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  }

  onClick(color: string) {
    this.buttonClick.emit(color)
  }
}

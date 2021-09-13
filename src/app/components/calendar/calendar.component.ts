import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  date = new FormControl(new Date())
}

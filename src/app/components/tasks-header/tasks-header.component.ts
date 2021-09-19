import { DatePipe } from '@angular/common'
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { CalendarService } from 'src/app/services/calendar/calendar.service'

@Component({
  selector: 'app-tasks-header',
  templateUrl: './tasks-header.component.html',
  styleUrls: ['./tasks-header.component.scss'],
})
export class TasksHeaderComponent implements OnInit {
  @Input() text: string
  @Input() color: string
  @Output() buttonClick = new EventEmitter<string>()

  @Input() range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  })

  dateStart!: string
  dateEnd!: string

  constructor(
    private calendarData: CalendarService,
    public datepipe: DatePipe
  ) {
    this.text = 'Choose date from calendar'
    this.color = 'warm'
  }

  ngOnInit(): void {
    // let date2 = new Date().toLocaleDateString();
    // console.log(date2)
    this.calendarData.currentDataStart.subscribe(
      (dateStart) => (this.dateStart = dateStart)
    )

    this.calendarData.currentDataEnd.subscribe(
      (dateEnd) => (this.dateEnd = dateEnd)
    )
    this.changeDate()
  }

  changeDate() {
    this.range.valueChanges.subscribe((val) => {
      let start = this.datepipe.transform(val.start, 'yyyy-MM-dd')
      let end = this.datepipe.transform(val.end, 'yyyy-MM-dd')
      // console.log('satartSTATSATAST', start)
      this.calendarData.changeDate(start!, end!)
    })
  }

  date = new FormControl(new Date())

  onClick(color: string) {
    this.buttonClick.emit(color)
  }
}

import { DatePipe } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { CalendarService } from 'src/app/services/calendar/calendar.service'
import { MatDialog } from '@angular/material/dialog'
import { CoachNewTaskDialogComponent } from '../coach-new-task-dialog/coach-new-task-dialog/coach-new-task-dialog.component'

@Component({
  selector: 'app-coach-tasks-header',
  templateUrl: './coach-tasks-header.component.html',
  styleUrls: ['./coach-tasks-header.component.scss'],
})
export class CoachTasksHeaderComponent implements OnInit {
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
    public dialog: MatDialog,
    private calendarData: CalendarService,
    public datepipe: DatePipe
  ) {
    this.text = 'Choose date from calendar'
    this.color = 'warm'
  }

  ngOnInit(): void {
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
      this.calendarData.changeDate(start!, end!)
    })
  }

  date = new FormControl(new Date())

  onClick(color: string) {
    this.buttonClick.emit(color)
  }
  openDialog(): void {
    //change value of subscribed message, when its executed -
    //new data is automatically broadcast to all components subscribed to it
    // this.data.changeTaskDescription(this.task.description!)
    // this.data.changeTaskId(this.task.id!)
    // this.data.changeDeadline(this.task.task_date!)

    const dialogRef = this.dialog.open(CoachNewTaskDialogComponent)

    dialogRef.afterClosed().subscribe((result) => {})
  }
}

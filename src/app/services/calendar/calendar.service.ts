import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private dataStart = new BehaviorSubject<string>('')
  currentDataStart = this.dataStart.asObservable()

  private dataEnd = new BehaviorSubject<string>('')
  currentDataEnd = this.dataEnd.asObservable()

  constructor() {}

  changeDate(dataStart: string, dataEnd: string) {
    this.dataStart.next(dataStart)
    this.dataEnd.next(dataEnd)
  }
}

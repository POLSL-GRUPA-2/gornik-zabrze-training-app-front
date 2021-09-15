import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TaskDialogService {
  //behavior subject holding current value of message
  private messageSource = new BehaviorSubject<string>('default')
  private taskIdSource = new BehaviorSubject<number>(1)
  private deadlineSource = new BehaviorSubject<string>('')

  //observable used by components
  currentMessage = this.messageSource.asObservable()
  currentTaskId = this.taskIdSource.asObservable()
  currentDeadline = this.deadlineSource.asObservable()

  constructor() {}

  //function changing current value of behavior subject
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  changeTaskId(taskId: number) {
    this.taskIdSource.next(taskId)
  }
  changeDeadline(deadline: string) {
    this.deadlineSource.next(deadline)
  }
}

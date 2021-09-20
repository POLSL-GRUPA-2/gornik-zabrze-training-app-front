import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TaskDialogService {
  //behavior subject holding current value of message

  private taskDescriptionSource = new BehaviorSubject<string>('default')
  private taskIdSource = new BehaviorSubject<number>(1)
  private deadlineSource = new BehaviorSubject<string>('')
  private taskTeamIdSource = new BehaviorSubject<number>(0)

  //observable used by components
  currentTaskDescription = this.taskDescriptionSource.asObservable()
  currentTaskId = this.taskIdSource.asObservable()
  currentDeadline = this.deadlineSource.asObservable()
  currentTaskTeamId = this.taskTeamIdSource.asObservable()

  constructor() {}

  //function changing current value of behavior subject

  // changeMessage(message: string){
  //   this.taskDescriptionSource.next(message)
  // }

  changeTaskDescription(message: string) {
    this.taskDescriptionSource.next(message)
  }
  changeTaskId(taskId: number) {
    this.taskIdSource.next(taskId)
  }
  changeDeadline(deadline: string) {
    this.deadlineSource.next(deadline)
  }
  changeTaskTeamId(taskTeamId: number) {
    this.taskTeamIdSource.next(taskTeamId)
  }
}

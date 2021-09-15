import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskDialogService {

  //behavior subject holding current value of message
  private taskDescriptionSource = new BehaviorSubject<string>("default")

  //observable used by components
  currentTaskDescription = this.taskDescriptionSource.asObservable();

  constructor() { }

  //function changing current value of behavior subject
  changeMessage(message: string){
    this.taskDescriptionSource.next(message)
  }
}

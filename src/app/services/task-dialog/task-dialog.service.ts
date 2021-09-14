import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskDialogService {

  //behavior subject holding current value of message
  private messageSource = new BehaviorSubject<string>("default")

  //observable used by components
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  //function changing current value of behavior subject
  changeMessage(message: string){
    this.messageSource.next(message)
  }
}

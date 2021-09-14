import { Injectable } from '@angular/core';

//importing observables - design pattern to handle passing messages from server - 
//- don't need 'of' after proper backend requests
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment'
//importing task interface
import { Task } from 'src/app/_models/Task';


//for now, importing fixed array - 
import { TASKS } from 'src/app/task-mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = environment.apiUrl + '/personal_task';
  private currentUserUrl = environment.apiUrl + '/account';
  private playerUrl = environment.apiUrl + '/player';

  userId!: string;
  defaultTask!: Task

  //private http:HttpClient in a constructor argument
  constructor(private http: HttpClient) { }

  //behavior subject holding current value of message
  private taskSource = new BehaviorSubject<Task>(this.defaultTask)
  //observable used by components
  currentTask = this.taskSource.asObservable();
  //function changing current value of behavior subject
  changeTask(message: Task){
    this.taskSource.next(message)
  }

  // getCurrentUserID(): void {
  //   this.http.get(this.currentUserUrl).subscribe(
  //     res => {
  //       this.userId = res.id
  //     });
  // }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.currentUserUrl)
  }
  
  getCurrentTask(): Observable<any> {
    this.getCurrentUser().subscribe(
      res => {
      console.log('user :>> ', res.id);
      this.userId = "?player_id=" + res.id
    });
    return this.http.get(this.tasksUrl + this.userId)
  }

  //PLACEHOLDER
  getTasks(): Observable<Task[]> {
    //placeholder
    const tasks = of(TASKS)
    return tasks
    // return this.http.get<Task[]>(this.apiUrl)
  }
}

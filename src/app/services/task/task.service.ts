import { Injectable } from '@angular/core';

//importing observables - design pattern to handle passing messages from server - 
//- don't need 'of' after proper backend requests
import { Observable, of } from 'rxjs';

//importing task interface
import { Task } from 'src/app/_models/Task';
//for now, importing fixed array - 
import { TASKS } from 'src/app/task-mock';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //private apiUrl = 

  //private http:HttpClient in a constructor argument
  constructor() { }

  getTasks(): Observable<Task[]> {
    //placeholder
    const tasks = of(TASKS)
    return tasks
    
    // return this.http.get<Task[]>(this.apiUrl)
  }
}

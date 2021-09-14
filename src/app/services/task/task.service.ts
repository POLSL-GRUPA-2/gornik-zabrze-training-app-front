import { Injectable } from '@angular/core'

//importing observables - design pattern to handle passing messages from server -
//- don't need 'of' after proper backend requests
import { Observable, of } from 'rxjs'
import { environment } from '../../../environments/environment'
//importing task interface
import { Task } from 'src/app/_models/Task'

//for now, importing fixed array -
import { TASKS } from 'src/app/task-mock'
import { HttpClient } from '@angular/common/http'
import { getSafePropertyAccessString } from '@angular/compiler'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = environment.apiUrl + '/personal_task'
  private currentUserUrl = environment.apiUrl + '/account'
  private playerUrl = environment.apiUrl + '/player'

  userId!: string

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    return this.http.get(this.currentUserUrl)
  }

  getCurrentTask(playerId: string | null): Observable<any> {
    return this.http.get(this.tasksUrl + '?player_id=' + playerId)
  }

  getCurrentTaskDate(
    dateStart: string | null,
    dateEnd: string | null,
    playerId: string | null
  ): Observable<any> {
    return this.http.get(
      // this.tasksUrl + '?player_id=' + playerId + '&task_date=1234-12-12'
      this.tasksUrl +
        '?start_date=' +
        dateStart +
        '&end_date=' +
        dateEnd +
        '&player_id=' +
        playerId
    )
  }
}

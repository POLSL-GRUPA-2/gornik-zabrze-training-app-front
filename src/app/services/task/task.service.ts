import { Injectable } from '@angular/core'

//importing observables - design pattern to handle passing messages from server -
//- don't need 'of' after proper backend requests
import { BehaviorSubject, Observable, of } from 'rxjs'
import { environment } from '../../../environments/environment'
//importing task interface
import { Task } from 'src/app/_models/Task'

//for now, importing fixed array -
import { TASKS } from 'src/app/task-mock'
import { HttpClient } from '@angular/common/http'
import { getSafePropertyAccessString } from '@angular/compiler'
import { FormBuilder } from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = environment.apiUrl + '/personal_task'
  private currentUserUrl = environment.apiUrl + '/account'
  private playerUrl = environment.apiUrl + '/player'
  private coachesUrl = environment.apiUrl + '/coach'
  private teamTasksUrl = environment.apiUrl + '/team_task'

  //behavior subject holding current value of message
  private taskDescriptionSource = new BehaviorSubject<string>('default')
  private taskIDSource = new BehaviorSubject<number>(0)

  //observable used by components
  currentTaskDescription = this.taskDescriptionSource.asObservable()
  currentTaskID = this.taskIDSource.asObservable()

  userId!: string
  defaultTask!: Task

  //private http:HttpClient in a constructor argument
  constructor(private http: HttpClient) {}

  //function changing current value of behavior subject
  changeTaskDescription(message: string) {
    this.taskDescriptionSource.next(message)
  }

  changeTaskID(message: number) {
    this.taskIDSource.next(message)
  }

  //player id, coach_id, date, description
  createPersonalTask(form: FormBuilder): Observable<any> {
    return this.http.post(this.tasksUrl, form)
    // return this.http.get(this.teamTasksCoachIdUrl + '?coach_id=3')
  }

  //team id, date, description
  createTeamTask(form: FormBuilder): Observable<any> {
    return this.http.post(this.teamTasksUrl, form)
  }

  changeTaskDone(
    playerId: string | null,
    taskId: number | null,
    form: FormBuilder
  ): Observable<any> {
    // return this.http.patch(this.tasksUrl + '?player_id=' + playerId + '&task_id=' + taskId, {done: isDone})
    return this.http.patch(
      this.tasksUrl + '?player_id=' + playerId + '&task_id=' + taskId,
      form
    )
  }

  changeTeamTaskDone(
    team_id: number | null,
    taskId: number | null,
    form: FormBuilder
  ): Observable<any> {
    // return this.http.patch(this.tasksUrl + '?player_id=' + playerId + '&task_id=' + taskId, {done: isDone})
    return this.http.patch(
      this.teamTasksUrl + '?team_id=' + team_id + '&task_id=' + taskId,
      form
    )
  }

  getTeamTasksByCoachId(): Observable<any> {
    return this.http.get(
      this.teamTasksUrl + '?coach_id=' + localStorage.getItem('coachId')
    )
  }

  // getTeamTasksByPersonalId(): Observable<any> {
  //   return this.http.get(this.teamTasksUrl + '?player_id=' + localStorage.getItem('playerId'))
  // }
  getTeamTasksByTeamId(teamId: number): Observable<any> {
    return this.http.get(this.teamTasksUrl + '?team_id=' + teamId)
  }

  //TODO
  getCoachOfTask(): Observable<any> {
    return this.http.get(this.coachesUrl)
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.currentUserUrl)
  }

  getCurrentTask(playerId: string | null): Observable<any> {
    return this.http.get(this.tasksUrl + '?player_id=' + playerId)
  }

  getCurrentTaskByCoachId(): Observable<any> {
    return this.http.get(
      this.tasksUrl + '?coach_id=' + localStorage.getItem('coachId')
    )
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
        '-00:00:00' +
        '&end_date=' +
        dateEnd +
        '-23:59:59' +
        '&player_id=' +
        playerId
    )
  }

  getCurrentTeamTaskDate(
    dateStart: string | null,
    dateEnd: string | null,
    team_id: number | null
  ): Observable<any> {
    return this.http.get(
      // this.tasksUrl + '?player_id=' + playerId + '&task_date=1234-12-12'
      this.teamTasksUrl +
        '?start_date=' +
        dateStart +
        '-00:00:00' +
        '&end_date=' +
        dateEnd +
        '-23:59:59' +
        '&team_id=' +
        team_id
    )
  }
}

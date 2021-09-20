import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private currentCoachIdUrl = environment.apiUrl + '/coach'
  private secretUrl = environment.apiUrl + '/secret'

  constructor(private http: HttpClient) { }

  /** GET current user from the server */
  getCurrentCoachId(userId: string | null): Observable<any> {
    return this.http.get(this.currentCoachIdUrl + '?user_id=' + userId)
  }

  getUserIdOfCoaches(): Observable<any> {
  return this.http.get(this.secretUrl)
  }

  createCoach(form: FormBuilder): Observable<any> {
    console.log("POST: " + this.currentCoachIdUrl)
    return this.http.post(this.currentCoachIdUrl, form)
  }

  deleteCoach(deletedCoach: User): Observable<any> {
    console.log("DELETE: " + this.currentCoachIdUrl + '?user_id=' + deletedCoach.id)
    return this.http.delete(this.currentCoachIdUrl + '?user_id=' + deletedCoach.id)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private currentCoachIdUrl = environment.apiUrl + '/coach'

  constructor(private http: HttpClient) { }

  /** GET current user from the server */
  getCurrentCoachId(userId: string | null): Observable<any> {
    return this.http.get(this.currentCoachIdUrl + '?user_id=' + userId)
  }
}
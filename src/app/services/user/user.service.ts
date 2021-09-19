import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserUrl = environment.apiUrl + '/account'
  private usersUrl = environment.apiUrl + '/user'
  private isLogged = false

  constructor(private http: HttpClient) {}

  /** GET current user from the server */
  getCurrentUser(): Observable<any> {
    return this.http.get(this.currentUserUrl)
  }

  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl)
  }

  getUsersFromTeam(teamId: number): Observable<any> {
    return this.http.get(this.usersUrl + '?team_id=' + teamId)
  }
}

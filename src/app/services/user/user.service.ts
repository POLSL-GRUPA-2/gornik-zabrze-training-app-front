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

  getUserFromPlayerId(player_id: number | undefined): Observable<any> {
    return this.http.get(this.usersUrl + '?player_id=' + player_id)
  }

  // async isLoggedIn() {
  //   let isLogged2 = false
  //   await this.http.get(this.currentUserUrl).subscribe((res) => {
  //     if (res) {
  //       isLogged2 = true
  //     }
  //   })
  //   console.log(isLogged2)
  //   return isLogged2
  // }
}

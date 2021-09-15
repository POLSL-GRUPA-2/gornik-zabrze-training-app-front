import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserUrl = environment.apiUrl + '/account'
  private isLogged = false

  constructor(private http: HttpClient) {}

  /** GET current user from the server */
  getCurrentUser(): Observable<any> {
    return this.http.get(this.currentUserUrl)
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

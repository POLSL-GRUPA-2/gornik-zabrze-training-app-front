import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, shareReplay, tap } from 'rxjs/operators'
import { User } from 'src/app/_models'
import { environment } from '../../../environments/environment'

const AUTH_DATA = 'auth_data'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = environment.apiUrl + '/login'
  private logoutUrl = environment.apiUrl + '/logout'
  private subject = new BehaviorSubject<any>(null)

  user$: Observable<User> = this.subject.asObservable()

  isLoggedIn$: Observable<boolean>
  isLoggedOut$: Observable<boolean>

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user))

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn))

    const user = localStorage.getItem(AUTH_DATA)

    if (user) {
      this.subject.next(JSON.parse(user))
    }
  }

  loginUser(form: FormBuilder): Observable<any> {
    return this.http.post(this.loginUrl, form).pipe(
      tap((user) => {
        this.subject.next(user)
        localStorage.setItem(AUTH_DATA, JSON.stringify(user))
      }),
      shareReplay()
    )
  }

  logoutUser(): Observable<any> {
    this.subject.next(null)
    localStorage.removeItem(AUTH_DATA)
    return this.http.get(this.logoutUrl)
  }
}

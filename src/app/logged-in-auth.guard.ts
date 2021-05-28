import { Injectable, OnInit } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { Emitters } from './emitters/emitters'
import { UserService } from './services/user/user.service'
import { first, map, tap } from 'rxjs/operators'
import { LoginService } from './services/login/login.service'

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard implements CanActivate {
  authenticated = false
  authenticated2 = false

  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: LoginService
  ) {}

  isLoggedIn(): boolean {
    this.userService.getCurrentUser().subscribe(
      (res) => {
        if (res) {
          //console.log('gaaaaaaaaaaaaaaaaaaaa')
          this.authenticated2 = true
          console.log(this.authenticated2)
          this.router.navigate(['/notifications'])
          return false
        }
        console.log(this.authenticated2 + ' asadqwe')
        return false
      },
      (err) => {
        console.log(err)
      }
    )

    return this.authenticated2
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Emitters.authEmitter.subscribe((auth: boolean) => {
    //   this.authenticated = auth
    // })

    //return this.userService.getCurrentUser()

    // this.isLoggedIn()

    // console.log(this.authenticated2 + ' zxczxcasadqwe')
    // //console.log(this.authenticated2)

    // if (!this.authenticated2) {
    //   return true
    // }
    // this.router.navigate(['/notifications'])
    // return false

    // console.log(this.authenticated)
    // if (this.authenticated) {
    //   this.router.navigate(['/notifications'])
    //   return false
    // }
    // return true

    return this.loginService.isLoggedOut$.pipe(
      first(),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl('/notifications')
        }
      })
    )
  }
}

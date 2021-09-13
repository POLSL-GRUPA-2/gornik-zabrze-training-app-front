import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router'
import { Observable } from 'rxjs'
import { first, tap } from 'rxjs/operators'
import { Emitters } from './emitters/emitters'
import { LoginService } from './services/login/login.service'
import { UserService } from './services/user/user.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loginService.isLoggedIn$.pipe(
      first(),
      tap((loggedIn) => {
        if (!loggedIn) {
          Emitters.authEmitter.emit(false)
          this.router.navigateByUrl('/login')
        } else {
          Emitters.authEmitter.emit(true)
        }
      })
    )
  }
}

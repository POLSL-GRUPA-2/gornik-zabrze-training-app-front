import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { Emitters } from './emitters/emitters'
import { first, map, tap } from 'rxjs/operators'
import { LoginService } from './services/login/login.service'
import { Location } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loginService.isLoggedOut$.pipe(
      first(),
      tap((loggedIn) => {
        if (!loggedIn) {
          Emitters.authEmitter.emit(true)
          this.location.back()
          //this.router.navigateByUrl('/notifications')
        }
      })
    )
  }
}

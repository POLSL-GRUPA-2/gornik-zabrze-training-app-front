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
import { UserService } from './services/user/user.service'

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard implements CanActivate {
  authenticated = false

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth
    })

    console.log(this.authenticated)
    if (this.authenticated) {
      this.router.navigate(['/notifications'])
      return false
    }
    return true
  }
}

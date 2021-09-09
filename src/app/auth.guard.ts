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

  authenticated = false
  authenticated2 = false

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

    // this.userService.getCurrentUser().subscribe(
    //   (res) => {
    //     if (res) {
    //       this.authenticated2 = true
    //     }
    //   },
    //   (err) => {
    //     console.log(err)
    //   }
    // )

    // if (this.authenticated2) {
    //   return true
    // }
    // this.router.navigate(['/login'])
    // return false

    //console.log(this.authenticated)
    // if (this.authenticated) {
    //   return true
    // }
    // this.router.navigate(['/login'])
    // return false

    // if(this.userService.getCurrentUser()){
    //   return true;
    // }
    // this.router.navigate(['/login'])
    // return false
    // console.log(this.userService.isLoggedIn())
    // if (this.userService.isLoggedIn()) {
    //   console.log('asdasddasdasdasd')
    //   return true
    // }
    // this.router.navigate(['/login'])
    // return false

    // if (this.userService.isLoggedIn()) {
    //   console.log('POIUHYGTFGHJML<')
    //   return true
    // } else {
    //   this.router.navigate(['/login'])
    //   return false
    // }
    // if (localStorage.getItem('isLoggedIn')) {
    //   return true
    // }
    // this.router.navigate(['/login'])
    // return false

    //return this.userService.isLoggedIn()

    return this.loginService.isLoggedIn$.pipe(
      first(),
      tap((loggedIn) => {
        if (!loggedIn) {
          Emitters.authEmitter.emit(false)
          this.router.navigateByUrl('/login')
        }
        Emitters.authEmitter.emit(true)
      })
    )
  }
}

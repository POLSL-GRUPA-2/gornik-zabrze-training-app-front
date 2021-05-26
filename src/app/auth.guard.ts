import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Emitters } from './emitters/emitters';
import { UserService } from './services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, 
    private router: Router) {}


    authenticated=false

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      Emitters.authEmitter.subscribe((auth: boolean) => {
        this.authenticated=auth
      })
      if(this.authenticated){
        return true
      }
      this.router.navigate(['/login'])
      return false
  }
}
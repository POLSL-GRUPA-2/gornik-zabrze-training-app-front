import { animate, state, style, transition, trigger } from '@angular/animations'
import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core'
import { Router } from '@angular/router'
import { fromEvent, Observable } from 'rxjs'
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  pairwise,
  share,
  tap,
  throttleTime,
} from 'rxjs/operators'
import { Emitters } from 'src/app/emitters/emitters'
import { LoginService } from 'src/app/services/login/login.service'
import { LogoutService } from 'src/app/services/logout/logout.service'

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden',
}

enum Direction {
  Up = 'Up',
  Down = 'Down',
}

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in')),
    ]),
  ],
})
export class TabbarComponent implements OnInit, AfterViewInit {
  private isVisible = true
  authenticated!: Observable<boolean>

  constructor(
    private logoutService: LogoutService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Emitters.authEmitter.subscribe((auth: boolean) => {
    //   this.authenticated = auth
    // })
    //console.log('OOOOOO')

    this.authenticated = this.checkAuth()
    console.log(this.authenticated)
  }

  checkAuth() {
    //console.log('LLLLLLLL')
    return this.loginService.isLoggedIn$.pipe(
      first(),
      tap((loggedIn) => {
        //console.log('ZZZZZZZZZZZZZZs')
        if (!loggedIn) {
        }
      })
    )
  }

  logout(): void {
    this.loginService.logoutUser().subscribe((res) => {
      console.log(res)
      //this.authenticated = false
      //localStorage.removeItem('isLoggedIn')
      this.router.navigateByUrl('/login')
    })
  }

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden
  }

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    )

    const goingUp$ = scroll$.pipe(
      filter((direction) => direction === Direction.Up)
    )

    const goingDown$ = scroll$.pipe(
      filter((direction) => direction === Direction.Down)
    )

    goingUp$.subscribe(() => (this.isVisible = true))
    goingDown$.subscribe(() => (this.isVisible = false))
  }
}

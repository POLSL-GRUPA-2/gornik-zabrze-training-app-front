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
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/services/user/user.service';

const AUTH_DATA = 'auth_data'

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
  private isVisible = true;
  sidebarVisible: boolean = true;

  users: User[] = [];
  user!: User;

  // userTeams!: String[];
  userTeams: String[] = ["PLACEHOLDER", "PLACEHOLDER","PLACEHOLDER","PLACEHOLDER","PLACEHOLDER"];

  managedTeams: String[] = ["PLACEHOLDER", "PLACEHOLDER"]; //potrzebny endpoint który zwraca drużyny którymi zarządzamy

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService) {};

  ngOnInit(): void {
    console.log("init of tabbar");
      this.getCurrentUser();
  }

  logout(): void {
    this.loginService.logoutUser().subscribe((res) => {
      console.log(res);
      location.reload();
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

  getCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe(
        res => {
        this.user = res
        console.log(res)
        //Emitters.authEmitter.emit(true)
      },
      err=>{
        //Emitters.authEmitter.emit(false)
      })
  }
  toggleSidebar(): void {
  this.sidebarVisible = !this.sidebarVisible
  }
}

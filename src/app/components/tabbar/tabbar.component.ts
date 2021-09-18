import { animate, state, style, transition, trigger } from '@angular/animations'
import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
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
import { User } from 'src/app/_models/user'
import { Player } from 'src/app/_models/player'
import { UserService } from 'src/app/services/user/user.service'
import { PlayerService } from 'src/app/services/player/player.service'
import { MatSidenavContainer } from '@angular/material/sidenav'
import { CdkScrollable } from '@angular/cdk/scrolling'

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
  private isVisible = true
  sidebarVisible: boolean = false
  user!: User
  player!: Player

  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable

  // userTeams!: String[];
  userTeams: String[] = ['TEAM0', 'TEAM1', 'TEAM2', 'TEAM3']

  managedTeams: String[] = ['MANAGEDTEAM0', 'MANAGEDTEAM1'] //potrzebny endpoint który zwraca drużyny którymi zarządzamy

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private playerService: PlayerService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    //this.getCurrentPlayerId()
  }

  ngOnInit(): void {
    console.log('init of tabbar')
    this.getCurrentUser()
    //this.getCurrentPlayerId()
  }

  ngOnDestroy(): void {
    localStorage.removeItem('userId')
    localStorage.removeItem('playerId')
    localStorage.removeItem('userRole')
  }

  logout(): void {
    this.loginService.logoutUser().subscribe((res) => {
      console.log(res)
      location.reload()
      this.router.navigateByUrl('/login')
    })
  }

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden
  }

  ngAfterViewInit() {
    // console.log('ngOnInit: sidenavContainer', this.sidenavContainer.hasBackdrop)
    // // this.sidenavContainer.scrollable.elementScrolled().subscribe(() => {
    // //   console.log('sidenavContainer is scrolled.');
    // // });
    // this.scrollable.elementScrolled().subscribe(() => {
    //   console.log('scrolled!')
    // })

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
    this.userService.getCurrentUser().subscribe(
      (res) => {
        this.user = res
        localStorage.setItem('userId', this.user.id.toString())
        localStorage.setItem('userRole', this.user.role.toString())
        console.log(res)
        this.getCurrentPlayerId()
        //Emitters.authEmitter.emit(true)
      },
      (err) => {
        //Emitters.authEmitter.emit(false)
      }
    )
  }

  getCurrentPlayerId(): void {
    this.playerService
      .getCurrentPlayerId(localStorage.getItem('userId'))
      .subscribe((res) => {
        this.player = res
        localStorage.setItem('playerId', this.player.id.toString())
      })
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible
  }
  getUserRole(): String {
    //GIVE ME ENDOPINT OR SMTHN TO GET USER ROLE
    return 'KANAPA'
  }
}

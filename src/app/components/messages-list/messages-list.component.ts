import { ViewportScroller } from '@angular/common'
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { MatSelect } from '@angular/material/select'
import { ReplaySubject, Subject } from 'rxjs'
import { take, takeUntil } from 'rxjs/operators'
import { MessagesService } from 'src/app/services/messages/messages.service'
import { TeamService } from 'src/app/services/team/team.service'
import { UserService } from 'src/app/services/user/user.service'
import { User } from 'src/app/_models'
import { Message } from 'src/app/_models/message'
import { Team } from 'src/app/_models/team'
//import * as _ from 'underscore';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {
  // windowScrolled!: boolean
  //isShow?: boolean
  //topPosToStartShowing = 10
  // pageYoffset = 0
  // @HostListener('window:scroll', ['$event']) onScroll(event: any) {
  //   this.pageYoffset = window.pageYOffset
  // }

  selectedUser = ''
  selectedTeam = ''
  form!: FormGroup
  user!: User
  team!: Team
  teams: Team[] = []

  isSelected: boolean = false

  /** list of users */
  protected users: User[] = []

  /** control for the selected user
   * selected user
   */
  public userCtrl: FormControl = new FormControl()

  /** control for the MatSelect filter keyword */
  public userFilterCtrl: FormControl = new FormControl()

  /** list of users filtered by search keyword */
  public filteredUsers: ReplaySubject<User[]> = new ReplaySubject<User[]>(1)

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>()

  messages: Message[] = []

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private formBuilder: FormBuilder,
    private scroll: ViewportScroller,
    private messageService: MessagesService
  ) {}

  // @HostListener('window:scroll')
  // checkScroll() {
  //   // window의 scroll top
  //   // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

  //   const scrollPosition =
  //     window.pageYOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop ||
  //     0

  //   console.log('[scroll]', scrollPosition)

  //   if (scrollPosition >= this.topPosToStartShowing) {
  //     this.isShow = true
  //   } else {
  //     this.isShow = false
  //   }
  // }

  // @HostListener('window:scroll', [])
  ngOnInit(): void {
    //console.log('ZXCV', this.users)
    //this.getTeams()
    this.getUsers()
    this.getLastMessages()
    //this.changeSelectedTeam()
    console.log('this.messages :>> ', this.messages)

    // set initial selection
    //this.userCtrl.setValue(this.users[10])

    // load the initial user list
    //this.filteredUsers.next(this.users.slice())

    // listen for search field value changes
    this.userFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUsers()
      })

    this.messageService.currentSelectedUserToMessage.subscribe(
      (selectedUser) => (this.selectedUser = selectedUser)
    )
  }
  ngAfterViewInit() {
    this.setInitialValue()
  }

  ngOnDestroy() {
    this._onDestroy.next()
    this._onDestroy.complete()
  }

  /**
   * Sets the initial value after the filteredUsers are loaded initially
   */
  protected setInitialValue() {
    this.filteredUsers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredUsers are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: User, b: User) =>
          a && b && a.id === b.id
      })
  }

  protected filterUsers() {
    if (!this.users) {
      return
    }
    // get the search keyword
    let search = this.userFilterCtrl.value
    if (!search) {
      this.filteredUsers.next(this.users.slice())
      return
    } else {
      search = search.toLowerCase()
    }
    // filter the users
    this.filteredUsers.next(
      this.users.filter((user) => {
        let userCombined = user.first_name + ' ' + user.last_name
        return userCombined.toLowerCase().indexOf(search) > -1
      })
    )
  }

  getTeams() {
    this.teamService.getTeams().subscribe((res) => {
      this.teams = res
      this.getUsersFromTeam()
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res
    })
  }

  getUsersFromTeam() {
    this.userService
      .getUsersFromTeam(parseInt(this.selectedTeam))
      .subscribe((res) => {
        //this.users = res
        //console.log('QWERT', this.users)
      })
  }

  onChangeSelectedUser() {
    this.isSelected = true
  }

  isUserSelected(): boolean {
    return this.isSelected
  }

  startConversation() {
    this.messageService.changeSelectedUser(this.userCtrl.value.id)
    console.log('this.userCtrl :>> ', this.userCtrl.value.id)
    localStorage.setItem('selectedUserId', this.userCtrl.value.id)
    localStorage.setItem('isPerson', 'true')
  }

  getLastMessages() {
    this.messageService
      .getLastMessages(localStorage.getItem('userId'))
      .subscribe((res) => {
        console.log('res :>> ', res)
        this.messages = res
      })
  }

  openConversation(receiver_id: any) {
    localStorage.setItem('selectedUserId', receiver_id)
    localStorage.setItem('isPerson', 'true')
  }

  // onWindowScroll() {
  //   if (
  //     window.pageYOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop > 100
  //   ) {
  //     this.windowScrolled = true
  //   } else if (
  //     (this.windowScrolled && window.pageYOffset) ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop < 10
  //   ) {
  //     this.windowScrolled = false
  //   }
  // }

  // scrollToTop() {
  //   ;(function smoothscroll() {
  //     var currentScroll =
  //       document.documentElement.scrollTop || document.body.scrollTop

  //     if (currentScroll > 0) {
  //       window.requestAnimationFrame(smoothscroll)
  //       window.scrollTo(0, currentScroll - currentScroll / 8)
  //     }
  //   })()
  // }

  // TODO: Cross browsing
  // scrollToTop() {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth',
  //   })
  // }
  // scrollToTop() {
  //   //this.scroll.scrollToPosition([0, 0])
  //   window.scrollTo(0, 0)
  // }
}

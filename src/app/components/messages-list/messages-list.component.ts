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
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.getUsers()
    this.getLastMessages()

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
      .subscribe((res) => {})
  }

  onChangeSelectedUser() {
    this.isSelected = true
  }

  isUserSelected(): boolean {
    return this.isSelected
  }

  startConversation() {
    this.messageService.changeSelectedUser(this.userCtrl.value.id)
    localStorage.setItem('selectedUserId', this.userCtrl.value.id)
    localStorage.setItem('isPerson', 'true')
  }

  getLastMessages() {
    this.messageService
      .getLastMessages(localStorage.getItem('userId'))
      .subscribe((res) => {
        this.messages = res
      })
  }

  openConversation(receiver_id: any) {
    localStorage.setItem('selectedUserId', receiver_id)
    localStorage.setItem('isPerson', 'true')
  }
}

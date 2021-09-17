import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSelect } from '@angular/material/select'
import { throwToolbarMixedModesError } from '@angular/material/toolbar'
import { Observable, ReplaySubject, Subject } from 'rxjs'
import { map, startWith, switchMap, take, takeUntil } from 'rxjs/operators'
import { TeamService } from 'src/app/services/team/team.service'
import { UserService } from 'src/app/services/user/user.service'
import { User } from 'src/app/_models'
import { Message } from 'src/app/_models/message'
import { Team } from 'src/app/_models/team'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  selectedUser = ''
  selectedTeam = ''
  user!: User
  team!: Team
  teams: Team[] = []

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

  messages: Message[] = [
    {
      id: 1,
      team_id: 2,
      sender_id: '2',
      receiver_id: '3',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time_stamp: '',
    },
  ]

  form!: FormGroup

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    //console.log('ZXCV', this.users)
    //this.getTeams()
    this.getUsers()
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

  onChangeSelectedTeam() {
    this.getUsersFromTeam()
  }

  sendMessage() {
    console.log('this.selectedUser :>> ', this.selectedUser)
    console.log('this.selectedTeam :>> ', this.selectedTeam)
    console.log('this.userCtrl :>> ', this.userCtrl.value.id)
  }
}

import { DatePipe } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { MatSelect } from '@angular/material/select'
import { ReplaySubject, Subject } from 'rxjs'
import { take, takeUntil } from 'rxjs/operators'
import { TeamService } from 'src/app/services/team/team.service'
import { UserService } from 'src/app/services/user/user.service'
import { User } from 'src/app/_models'
import { Team } from 'src/app/_models/team'

@Component({
  selector: 'app-coach-new-task-dialog',
  templateUrl: './coach-new-task-dialog.component.html',
  styleUrls: ['./coach-new-task-dialog.component.scss'],
})
export class CoachNewTaskDialogComponent implements OnInit {
  optionChecked: string = '1'
  option: string = 'notChecked'

  selectedUser = ''
  selectedTeam = ''
  form!: FormGroup
  user!: User
  team!: Team
  //teams: Team[] = []

  isSelected: boolean = false
  isSelectedTeam: boolean = false

  selectedDate = new Date()

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

  /** list of users */
  protected teams: Team[] = []

  /** control for the selected user
   * selected user
   */
  public teamCtrl: FormControl = new FormControl()

  /** control for the MatSelect filter keyword */
  public teamFilterCtrl: FormControl = new FormControl()

  /** list of users filtered by search keyword */
  public filteredTeams: ReplaySubject<Team[]> = new ReplaySubject<Team[]>(1)

  constructor(
    public dialogRef: MatDialogRef<CoachNewTaskDialogComponent>,
    private userService: UserService,
    private teamService: TeamService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getUsers()
    this.getTeams()
    //this.changeSelectedTeam()

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

    this.teamFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTeams()
      })
  }

  onClickCreate(): void {
    this.dialogRef.close()

    let pickedDate = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd')

    console.log(
      'TO JEST ZMIENNA PRZECHOWUJACA WYBRANEGO USER KURWA :>',
      this.userCtrl.value //tutej
    )
    console.log(
      'TO JEST ZMIENNA PRZECHOWUJACA WYBRANY TEAM JEBAĆ :>',
      this.teamCtrl.value //tutej
    )

    console.log(
      'TO JEST ZMIENNA PRZECHOWUJACA WYBRANA DATE CHUJ :>',
      pickedDate //tutej
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

    this.filteredTeams
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredUsers are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Team, b: Team) =>
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

  protected filterTeams() {
    if (!this.teams) {
      return
    }
    // get the search keyword
    let search = this.teamFilterCtrl.value
    if (!search) {
      this.filteredTeams.next(this.teams.slice())
      return
    } else {
      search = search.toLowerCase()
    }
    // filter the users
    this.filteredTeams.next(
      this.teams.filter((team) => {
        let teamCombined = team.team_name
        return teamCombined.toLowerCase().indexOf(search) > -1
      })
    )
  }

  getTeams() {
    this.teamService.getTeams().subscribe((res) => {
      this.teams = res
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res
    })
  }

  onChangeSelectedUser() {
    this.isSelected = true
  }

  isUserSelected(): boolean {
    return this.isSelected
  }

  onChangeSelectedTeam() {
    this.isSelectedTeam = true
  }

  isTeamSelected(): boolean {
    return this.isSelectedTeam
  }
}

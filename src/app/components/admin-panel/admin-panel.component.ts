import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';

import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators'
import { PlayerService } from 'src/app/services/player/player.service';

import { TeamService } from 'src/app/services/team/team.service';
import { UserService } from 'src/app/services/user/user.service';

import { User } from 'src/app/_models';
import { Team } from 'src/app/_models/team';
import { AdminTeamAddPlayerComponent } from '../admin-team-add-player/admin-team-add-player.component';
import { AdminTeamEditComponent } from '../admin-team-edit/admin-team-edit.component';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})

export class AdminPanelComponent implements OnInit {

  users: User[]=[]
  teams: Team[]=[]
  form!: FormGroup
  formCreatePlayer!: FormGroup
  playerId!: number
  public filteredUsers: ReplaySubject<User[]> = new ReplaySubject<User[]>(1)

    /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>()

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.getTeams()
  }

  /**
   * method responsible for getting list of users in DB - used on init
   */
  getUsers(): void {
  this.userService.getUsers().subscribe(
    (res) => {
      this.users = res
      console.log("Got users from DB")
    },
    (err) => {
      console.log("Error when getting users from DB")
    }
  )
  }

  /**
   * method responsible for getting list of teams in DB - used on init
   */
  getTeams(): void {
    this.teamService.getTeams().subscribe(
      (res) => {
        this.teams = res
        console.log("Got teams from DB")
      },
      (err) => {
        console.log("Error when getting teams from DB")
      }
    )
  }

  translateToRole(role: number): String {
    if(role==1)
    {
      return "Zawodnik"
    }
    if(role==2)
    {
      return "Trener"
    }
    if(role==3)
    {
      return "Administrator"
    }
    return "error"
  }
  printToConsole(arg: any): void {
    console.log("printToConsole")
    console.log(arg)
  }

  deleteUser(user: User): void {
    console.log("Deleting user with id: " + user.id)
    this.userService.deleteUserById(user.id).subscribe(
      (res) => {
        console.log("DELETE RESPONSE: ", res)
      },
      (err) => {
        console.log("Error when deleting user with id " + user.id)
      }
    )
  }

  deleteTeam(team: Team): void {
  console.log("Deleting team with id: " + team.id)
  this.teamService.deleteTeamById(team.id).subscribe(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log("Error when deleting team with id " + team.id)
    }
  )
  }

  openDialogAddPlayer(team: Team): void {
    const dialogRef = this.dialog.open(AdminTeamAddPlayerComponent, {
      width: '500px',
      data: this.users
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.addPlayerToTeam(team, result)
    });
  }

  addPlayerToTeam(team: Team, addedUser: User) {
    console.log("add to team: " + team.id + "user with id: "+ addedUser.id)

    this.formCreatePlayer = this.formBuilder.group({
      user_id: addedUser.id,
    })
    console.log(this.formCreatePlayer.getRawValue())

    this.playerService.createPlayerWithUserId(this.formCreatePlayer.getRawValue()).subscribe((res)=>{
      this.playerService.getCurrentPlayerId(addedUser.id).subscribe((res)=>{

        console.log("GET PLAYER IF BY USER ID:", res)
        this.playerId = res.id;

        this.form = this.formBuilder.group({
          team_id: team.id,
          player_id: this.playerId
        })

        console.log("Created form",this.form.getRawValue())

        this.teamService.addPlayerToTeam(this.form.getRawValue())
        .subscribe((res) => {
        console.log(res)
        })
      })
    })


  }

  openDialogTeam(team: Team): void {
    const dialogRef = this.dialog.open(AdminTeamEditComponent, {
      width: '250px',
      data: {
        id: team.id,
        team_name: team.team_name,
      coach_id: team.coach_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The team edit dialog was closed');
    });
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


}

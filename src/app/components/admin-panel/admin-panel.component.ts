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
import { Player } from 'src/app/_models/player';
import { Team } from 'src/app/_models/team';
import { AdminTeamAddPlayerComponent } from '../admin-team-add-player/admin-team-add-player.component';
import { AdminTeamEditComponent } from '../admin-team-edit/admin-team-edit.component';
import { AdminTeamRemovePlayerComponent } from '../admin-team-remove-player/admin-team-remove-player.component';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})

export class AdminPanelComponent implements OnInit {

  usersList: User[]=[]
  teamPlayersList: Player[]=[]
  teamsList: Team[]=[]
  form!: FormGroup
  formCreatePlayer!: FormGroup
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
      this.usersList = res
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
        this.teamsList = res
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
      data: this.usersList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.addPlayerToTeam(team, result)
    });
  }
  openDialogRemovePlayer(team: Team): void {
    this.userService.getUsersFromTeam(team.id).subscribe((res)=>{
      console.log("Getting players from team")
      console.log(res)
      this.teamPlayersList = res
      const dialogRef = this.dialog.open(AdminTeamRemovePlayerComponent,
        {width: '500px',
        data: this.teamPlayersList
      });
      dialogRef.afterClosed().subscribe(result =>{
        console.log("Remove player dialog was closed");
        console.log(result)
        this.removePlayerFromTeam(team, result)
      })
    })

  }
  openDialogEditTeam(team: Team): void {
    const dialogRef = this.dialog.open(AdminTeamEditComponent, {
      width: '500px',
      data: {
        id: team.id,
        team_name: team.team_name,
        coach_id: team.coach_id
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Team edit dialog was closed');
    });
  }

  getTeamPlayers(): void {

  }
  addPlayerToTeam(team: Team, addedUser: User) {
    console.log("add to team: " + team.id + "user with id: "+ addedUser.id)

    this.formCreatePlayer = this.formBuilder.group({
      user_id: addedUser.id,
    })
    console.log(this.formCreatePlayer.getRawValue())

    this.playerService.createPlayerWithUserId(this.formCreatePlayer.getRawValue()).subscribe((res)=>{
      this.playerService.getPlayerByUserId(addedUser.id).subscribe((res)=>{

        console.log("GET PLAYER IF BY USER ID:", res)
        this.form = this.formBuilder.group({
          team_id: team.id,
          player_id: res.id
        })

        console.log("Created form",this.form.getRawValue())

        this.teamService.addPlayerToTeam(this.form.getRawValue())
        .subscribe((res) => {
        console.log(res)
        })
      })
    })
  }
  removePlayerFromTeam(team: Team, removedUser: User): void{
    console.log("Removing player with user id: " + removedUser.id + "from team with id: " + team.id)
    this.playerService.getPlayerByUserId(removedUser.id).subscribe((res)=>{
          console.log("Received playerId: " + res);
          this.teamService.removePlayerFromTeam(team, res).subscribe((res)=>{
            console.log("Removed player: " + res + " from team with id: "+ team.id);
          })
      })
  }
}

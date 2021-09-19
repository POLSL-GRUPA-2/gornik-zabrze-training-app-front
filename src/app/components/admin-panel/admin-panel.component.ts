import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team/team.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/_models';
import { Team } from 'src/app/_models/team';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  users: User[]=[]
  teams: Team[]=[]

  constructor(
    private userService: UserService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.getTeams()
  }

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

  /*
  ngOnInit(): void {
    // this.getUser()

    this.calendarData.currentDataStart.subscribe((dateStart) => {
      this.dateStart = dateStart
    })

    this.calendarData.currentDataEnd.subscribe((dateEnd) => {
      this.dateEnd = dateEnd
      this.getTasksDate()
    })

    //this.getCurrentUserId()
    this.getTasks()
    //this.getCurrentPlayerId()
    // this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks)

  }
  */
  /*
  getTasks(): void {
    this.taskService.getCurrentTask(localStorage.getItem('playerId')).subscribe(
      (res) => {
        this.tasks = res
        console.log('task dd' + res)
        //Emitters.authEmitter.emit(true)
      },
      (err) => {
        //Emitters.authEmitter.emit(false)
      }
    )
  }
  */

}

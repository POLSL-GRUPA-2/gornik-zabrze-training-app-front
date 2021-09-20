import { Component, OnInit } from '@angular/core'
import { MessagesService } from 'src/app/services/messages/messages.service'
import { TeamService } from 'src/app/services/team/team.service'
import { Team } from 'src/app/_models/team'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  /** list of users */
  teams: Team[] = []

  constructor(
    private teamService: TeamService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.getTeamsFromUser()
  }

  getTeamsFromUser() {
    if (localStorage.getItem('coachId') === null) {
      this.teamService
        .getTeamTasksPlayerId(localStorage.getItem('playerId'))
        .subscribe((res) => {
          this.teams = res
        })
    } else {
      this.teamService
        .getTeamTasksCoachId(localStorage.getItem('coachId'))
        .subscribe((res) => {
          this.teams = res
        })
    }
  }

  openConversation(teamId: number) {
    localStorage.setItem('selectedUserId', teamId.toString())
    localStorage.setItem('isPerson', 'false')
    //this.messageService.getTeamMessages(teamId, localStorage.getItem('userId'))
  }
}

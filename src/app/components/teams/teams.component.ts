import { Component, OnInit } from '@angular/core'
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

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.getTeamsFromUser()
  }

  getTeamsFromUser() {
    this.teamService
      .getTeamTasksCoachId(localStorage.getItem('coachId'))
      .subscribe((res) => {
        this.teams = res
      })
  }

  openConversation(teamId: number) {}
}

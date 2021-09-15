import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
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
  users: User[] = []
  team!: Team
  teams: Team[] = []

  messages: Message[] = [
    {
      id: 1,
      from_id: '2',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      id: 1,
      from_id: '2',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      id: 1,
      from_id: '2',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      id: 1,
      from_id: '2',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
  ]

  form!: FormGroup

  constructor(
    private userService: UserService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    //console.log('ZXCV', this.users)
    this.getTeams()
    //this.getUsers()
    //this.changeSelectedTeam()
    console.log('this.messages :>> ', this.messages)
  }

  getTeams() {
    this.teamService.getTeams().subscribe((res) => {
      this.teams = res
      this.getUsersFromTeam()
    })
  }

  // getUsers() {
  //   this.userService.getUsers().subscribe((res) => {
  //     this.users = res
  //   })
  // }

  getUsersFromTeam() {
    this.userService
      .getUsersFromTeam(parseInt(this.selectedTeam))
      .subscribe((res) => {
        this.users = res
        //console.log('QWERT', this.users)
      })
  }

  onChangeSelectedTeam() {
    this.getUsersFromTeam()
  }

  sendMessage() {
    console.log('this.selectedUser :>> ', this.selectedUser)
    console.log('this.selectedTeam :>> ', this.selectedTeam)
  }
}

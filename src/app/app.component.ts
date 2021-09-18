import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user/user.service'
import { NotificationsService } from 'src/app/services/notifications/notifications.service'
import { User } from 'src/app/_models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gornikFront'

  sidebar: boolean = true

  users: User[] = []
  user!: User

  // userTeams!: String[];
  userTeams: String[] = ['dupa', 'TEMP', 'PLACEHOLDER', 'KUPSZTAL', 'GDUPA2']
  constructor(
    private notificationsService: NotificationsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getUsers(): void {
    this.notificationsService.getUsers().subscribe((users) => {
      //this.users = users
      console.log(users)
    })
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      (res) => {
        this.user = res
        console.log(res)
        //Emitters.authEmitter.emit(true)
      },
      (err) => {
        //Emitters.authEmitter.emit(false)
      }
    )
  }
}

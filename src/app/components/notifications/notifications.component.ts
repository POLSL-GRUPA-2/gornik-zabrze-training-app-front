import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/_models/user'
import { NotificationsService } from 'src/app/services/notifications/notifications.service'
import { UserService } from 'src/app/services/user/user.service'
import { Emitters } from 'src/app/emitters/emitters'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  users: User[] = []
  user!: User

  constructor(
    private notificationsService: NotificationsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getUsers(): void {
    this.notificationsService.getUsers().subscribe((users) => {})
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((res) => {
      this.user = res
    })
  }
}

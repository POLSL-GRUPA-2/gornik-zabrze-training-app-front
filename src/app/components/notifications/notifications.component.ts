import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  users: User[] = [];
  user!: User;

  constructor(private notificationsService: NotificationsService, 
    private userService: UserService) { }

  ngOnInit():void {
    //this.getUsers();
    this.getCurrentUser();
  }

  getUsers(): void {
    this.notificationsService.getUsers()
        .subscribe(users => {
          //this.users = users
          console.log(users)
        });

  }

  getCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe(res => {
        this.user = res
        console.log(res)
      })
  }

}

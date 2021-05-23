import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  users: User[] = [];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit():void {
    this.getUsers();
  }

  getUsers(): void {
    this.notificationsService.getUsers()
        .subscribe(users => this.users = users);
  }

}

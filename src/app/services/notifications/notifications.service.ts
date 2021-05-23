import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private usersUrl = 'api/users';  // URL to web api


  constructor(private http: HttpClient) { }


  /** GET heroes from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private userUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.userUrl)
  }
}
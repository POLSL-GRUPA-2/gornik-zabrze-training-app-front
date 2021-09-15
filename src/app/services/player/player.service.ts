import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private currentPlayerIdUrl = environment.apiUrl + '/player'

  constructor(private http: HttpClient) {}

  /** GET current user from the server */
  getCurrentPlayerId(userId: string | null): Observable<any> {
    return this.http.get(this.currentPlayerIdUrl + '?user_id=' + userId)
  }
}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { Team } from 'src/app/_models/team'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playerUrl = environment.apiUrl + '/player'

  constructor(private http: HttpClient) {}

  /** GET current user from the server */
  getPlayerByUserId(userId: string | null): Observable<any> {
    return this.http.get(this.playerUrl + '?user_id=' + userId)
  }

  getPlayersInTeam(team: Team): Observable<any> {
    console.log(this.playerUrl + '?team_id=' + team.id)
    return this.http.get(this.playerUrl + '?team_id=' + team.id)
  }

  createPlayerWithUserId(form: FormBuilder): Observable<any> {
    return this.http.post(this.playerUrl, form)
  }

  getCurrentPlayerId(userId: string | null): Observable<any> {
    return this.http.get(this.playerUrl + '?user_id=' + userId)
  }
}

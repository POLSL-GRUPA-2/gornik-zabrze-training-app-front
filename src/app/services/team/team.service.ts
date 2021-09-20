import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from 'src/app/_models/player';
import { Team } from 'src/app/_models/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsUrl = environment.apiUrl + '/team';
  private teamsAssignUrl = this.teamsUrl + '_assignment';

  constructor(private http: HttpClient) {}

  //GET
  getTeams(): Observable<any> {
    return this.http.get(this.teamsUrl);
  }

  getTeamTasksCoachId(coachId: string | null): Observable<any> {
    return this.http.get(this.teamsUrl + '?coach_id=' + coachId);
  }

  getTeamTasksPlayerId(playerId: string | null): Observable<any> {
    return this.http.get(this.teamsUrl + '?player_id=' + playerId);
  }

  //POST
  addPlayerToTeam(form: FormBuilder): Observable<any> {
    return this.http.post(this.teamsAssignUrl, form);
  }
  createTeam(form: FormBuilder): Observable<any> {
    console.log("POST: " + this.teamsUrl)
    return this.http.post(this.teamsUrl, form);
  }

  //PATCH
  editTeam(form: FormBuilder): Observable<any> {
    console.log("PATCH: " + this.teamsUrl)
  return this.http.patch(this.teamsUrl, form)
  }

  //DELETE
  deleteTeamById(teamId: number): Observable<any> {
    return this.http.delete(this.teamsUrl + '?team_id=' + teamId);
  }

  removePlayerFromTeam(team: Team, player: Player): Observable<any> {
    return this.http.delete(
      this.teamsAssignUrl + '?team_id=' + team.id + '&player_id=' + player.id
    );
  }

  getTeamsByPlayerId(playerId: number | null): Observable<any> {
    return this.http.get(this.teamsUrl + '?player_id=' + playerId)
  }
  
}

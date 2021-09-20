import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/_models';
import { Team } from 'src/app/_models/team';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

export interface TeamEditDialogData {
  id: number,
  team_name: string,
  current_coach: User,
  coaches: User[]
}

@Component({
  selector: 'app-admin-team-edit',
  templateUrl: './admin-team-edit.component.html',
  styleUrls: ['./admin-team-edit.component.scss']
})
export class AdminTeamEditComponent implements OnInit {

  formTeamEdit!: FormGroup
  resultForm!: FormGroup
  isSelected: Boolean = false;
  coachesList: User[]=[]
   /**
   * control for the selected coach
   * selected coach
   */
  public coachCtrl: FormControl = new FormControl('')

  /** control for the MatSelect filter keyword */
  public coachFilterCtrl: FormControl = new FormControl('')

  /** list of users filtered by search keyword */
  public filteredCoaches: ReplaySubject<User[]> = new ReplaySubject<User[]>(1)

    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>()

  constructor(
    public dialogRef: MatDialogRef<AdminPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamEditDialogData,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.coachesList = this.data.coaches
    console.log("CoachesList: ")
    console.log(this.data.coaches)
    this.coachFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(()=>{
      this.filterCoaches()
    })
    /*
    this.userFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterUsers()
    })
    */
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  protected filterCoaches() {
    if (!this.coachesList) {
      return
    }
    // get the search keyword
    let search = this.coachFilterCtrl.value
    if (!search) {
      this.filteredCoaches.next(this.coachesList.slice())
      return
    } else {
      search = search.toLowerCase()
    }
    // filter the users
    this.filteredCoaches.next(
      this.coachesList.filter((user) => {
        let userCombined = user.first_name + ' ' + user.last_name
        return userCombined.toLowerCase().indexOf(search) > -1
      })
    )
  }

  onChangeSelectedCoach() {
    this.isSelected = true
  }
  getSelectedCoach(): TeamEditDialogData  {
    // console.log('this.userCtrl :>> ', this.userCtrl.value)
    this.resultForm = this.formBuilder.group({
      id: this.data.id,
      team_name: this.data.team_name,
      current_coach: this.coachCtrl.value
    })
    return this.resultForm.getRawValue()
    // return this.coachCtrl.value;
  }
}

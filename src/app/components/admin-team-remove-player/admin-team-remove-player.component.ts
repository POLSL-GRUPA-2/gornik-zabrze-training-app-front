import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-admin-team-remove-player',
  templateUrl: './admin-team-remove-player.component.html',
  styleUrls: ['./admin-team-remove-player.component.scss']
})
export class AdminTeamRemovePlayerComponent implements OnInit {


  isSelected: boolean = false
  form!: FormGroup

  /** list of users */
  protected usersList: User[] = []

  /**
   * control for the selected user
   * selected user
   */
  public userCtrl: FormControl = new FormControl('')

  /** control for the MatSelect filter keyword */
  public userFilterCtrl: FormControl = new FormControl('')

  /** list of users filtered by search keyword */
  public filteredUsers: ReplaySubject<User[]> = new ReplaySubject<User[]>(1)

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>()

  constructor(
    public dialogRef: MatDialogRef<AdminTeamRemovePlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[]
  ) { }

  ngOnInit(): void {
    this.usersList = this.data
    this.userFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterUsers()
    })
  }

  onChangeSelectedUser() {
    this.isSelected = true
  }

  protected filterUsers() {
    if (!this.usersList) {
      return
    }
    // get the search keyword
    let search = this.userFilterCtrl.value
    if (!search) {
      this.filteredUsers.next(this.usersList.slice())
      return
    } else {
      search = search.toLowerCase()
    }
    // filter the users
    this.filteredUsers.next(
      this.usersList.filter((user) => {
        let userCombined = user.first_name + ' ' + user.last_name
        return userCombined.toLowerCase().indexOf(search) > -1
      })
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSelectedUser(): User  {
    // console.log('this.userCtrl :>> ', this.userCtrl.value)
    return this.userCtrl.value;
  }

}

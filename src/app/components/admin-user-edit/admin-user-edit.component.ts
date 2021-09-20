import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoachService } from 'src/app/services/coach/coach.service';
import { User } from 'src/app/_models';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss']
})
export class AdminUserEditComponent implements OnInit {
  user!: User
  formMakeCoach!: FormGroup
  displayPromoteToCoach: Boolean = true;
  constructor(
    public dialogRef: MatDialogRef<AdminPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private coachService: CoachService,
    private formBuilder: FormBuilder
    ) {
      if(data.role==2){
        this.displayPromoteToCoach = false
      }
      this.user=data
     }

  ngOnInit(): void {
    console.log(this.data)
    console.log(this.user)
  }

  confirmEdit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  makeCoach(): void {
    console.log("Promotion to coach")
    this.formMakeCoach = this.formBuilder.group({
      user_id: this.user.id
    })
    console.log(this.formMakeCoach.getRawValue())
    this.coachService.createCoach(this.formMakeCoach.getRawValue()).subscribe((result)=>{
      console.log(result)
    })
  }

  makeNotCoach(): void {
    this.coachService.deleteCoach(this.user).subscribe((response)=>{
      console.log(response)
    })
  }
}

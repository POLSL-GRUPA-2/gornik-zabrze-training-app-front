import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/_models/team';

@Component({
  selector: 'app-admin-team-create',
  templateUrl: './admin-team-create.component.html',
  styleUrls: ['./admin-team-create.component.scss']
})
export class AdminTeamCreateComponent implements OnInit {

  createTeamForm!: FormGroup
  teamName = new FormControl('', [Validators.required])
  teamCoachId = new FormControl('', [Validators.required])
  createdTeam!: Team

  constructor(
    public dialogRef: MatDialogRef<AdminTeamCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Team) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTeam(): void {

  }
}

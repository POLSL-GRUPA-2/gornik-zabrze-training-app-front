import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from 'src/app/interfaces/user'
import { RegisterService } from 'src/app/services/register/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    })
  }

  submit(): void {
    console.log(this.form.getRawValue())
    this.registerService
      .registerUser(this.form.getRawValue())
      .subscribe((res) => {
        console.log(res)
        this.router.navigate(['/login'])
      })
  }
}

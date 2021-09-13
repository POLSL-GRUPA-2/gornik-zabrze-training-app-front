import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
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

  firstName = new FormControl('', [Validators.required])
  lastName = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),
  ])

  hide = true

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
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

  getEmail() {
    if (this.email?.hasError('required')) {
      return 'Wprowadź wartość'
    } else if (this.email?.hasError('email')) {
      return 'Niepoprawny email'
    }
    return ''
  }

  getFirstName() {
    if (this.firstName?.hasError('required')) {
      return 'Wprowadź wartość'
    }
    return ''
  }

  getLastName() {
    if (this.lastName?.hasError('required')) {
      return 'Wprowadź wartość'
    }
    return ''
  }

  getPassword() {
    if (this.password?.hasError('required')) {
      return 'Wprowadź wartość'
    }
    return ''
  }

  getPasswordPattern() {
    return 'Hasło musi zawierać min 8 znaków, 1 literę, 1 cyfrę'
  }
}

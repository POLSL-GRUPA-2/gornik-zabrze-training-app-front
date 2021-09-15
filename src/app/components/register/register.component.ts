import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
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
    Validators.pattern(
      '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'
    ),
  ])

  hide = true

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar
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
        this.snackBar.open('Rejestracja powiodła się', '', {
          duration: 1000,
          panelClass: 'snackbar',
          verticalPosition: 'top',
        })
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
    } else if (this.password?.hasError('pattern')) {
      return 'Hasło min 8 znaków, 1 wielka litera, 1 mała litera, 1 cyfra'
    }
    return ''
  }
}

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { Emitters } from 'src/app/emitters/emitters'
import { LoginService } from 'src/app/services/login/login.service'
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  authenticated = false

  email = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])

  hide = true

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: this.email,
      password: this.password,
    })

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth
    })
  }

  login(): void {
    const val = this.form.getRawValue()

    this.loginService.loginUser(val).subscribe(
      (res) => {
        Emitters.authEmitter.emit(true)
        this.snackBar.open('Logowanie powiodło się', '', {
          duration: 1000,
          panelClass: 'snackbar',
          verticalPosition: 'top',
        })
        this.router.navigateByUrl('/messages-list')
      },
      (err) => {
        Emitters.authEmitter.emit(false)
      }
    )
  }

  getEmail() {
    if (this.email?.hasError('required')) {
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

  isEmailValid() {
    if (this.email?.hasError('required')) {
      return false
    }
    return true
  }

  isPasswordValid() {
    if (this.password?.hasError('required')) {
      return false
    }
    return true
  }
}

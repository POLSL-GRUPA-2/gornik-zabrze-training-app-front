import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Emitters } from 'src/app/emitters/emitters'
import { LoginService } from 'src/app/services/login/login.service'

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
    private router: Router
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
    console.log(this.form.getRawValue())

    const val = this.form.getRawValue()

    this.loginService.loginUser(val).subscribe(
      (res) => {
        console.log(res)
        Emitters.authEmitter.emit(true)
        this.router.navigateByUrl('/notifications')
      },
      (err) => {
        console.log(err)
        Emitters.authEmitter.emit(false)
        //alert('Login failed')
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
}

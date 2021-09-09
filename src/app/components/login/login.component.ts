import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Emitters } from 'src/app/emitters/emitters'
import { LoginService } from 'src/app/services/login/login.service'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  authenticated = false
  authenticated2 = false

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    })

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth
    })

    this.authenticated2 = this.getCurrentUser()

    if (this.authenticated2) {
      this.router.navigate(['/notifications'])
    }
  }

  getCurrentUser(): boolean {
    this.userService.getCurrentUser().subscribe(
      (res) => {
        //console.log(res)
        if (res) {
          return true
        }
        return false
      },
      (err) => {
        //console.log(err)
        return false
      }
    )
    return false
  }

  login(): void {
    console.log(this.form.getRawValue())

    //localStorage.setItem('isLoggedIn', 'true')

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
        alert('Login failed')
      }
    )
  }
}

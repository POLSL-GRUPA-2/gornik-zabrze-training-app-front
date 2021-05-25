import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private loginService: LoginService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      email: '',
      password: ''
    })
  }


  getCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe(
        res => {
        console.log(res)
        Emitters.authEmitter.emit(true)
      },
        err => {
          console.log(err)
          Emitters.authEmitter.emit(false)
        }
      )
  }

  submit(): void{
    console.log(this.form.getRawValue());
    this.loginService.loginUser(this.form.getRawValue())
    .subscribe(res=>{
      console.log(res);
      this.router.navigate(['/notifications']);
    })
    }

  

}

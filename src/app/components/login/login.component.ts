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
  authenticated = false;

  constructor(private formBuilder: FormBuilder, 
    private loginService: LoginService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      email: '',
      password: ''
    })

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated=auth
    })
    if(this.authenticated){
      this.router.navigate(['/notifications'])
    }
  }


  getCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe(
        res => {
        console.log(res)
        //Emitters.authEmitter.emit(true)
      },
        err => {
          console.log(err)
          //Emitters.authEmitter.emit(false)
        }
      )
  }

  submit(): void{
    console.log(this.form.getRawValue());
    this.loginService.loginUser(this.form.getRawValue())
    .subscribe(res=>
      {
      console.log(res);
      //localStorage.setItem('userId', 'yes')
      Emitters.authEmitter.emit(true)
      this.router.navigate(['/notifications'])
    },
    err=>{
      Emitters.authEmitter.emit(false)
    })
    }

  

}

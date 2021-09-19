import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/services/user/user.service';
import { UserSettingsService } from 'src/app/services/userSettings/user-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form!: FormGroup;
  user!: User;

  firstName!: FormControl;
  lastName!: FormControl;
  email!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.form = this.formBuilder.group({
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
    });
  }

  initStuff(): void {
    this.firstName = new FormControl(this.user.first_name, [
      Validators.required,
    ]);
    this.lastName = new FormControl(this.user.last_name, [Validators.required]);
    this.email = new FormControl(this.user.email, [
      Validators.required,
      Validators.email,
    ]);
  }

  submit(): void {
    this.form = this.formBuilder.group({
      id: this.user.id,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
    });
    this.userService
      .changeUserData(this.form.getRawValue())
      .subscribe((res) => {});
  }

  getEmail() {
    if (this.email?.hasError('required')) {
      return 'Wprowadź wartość';
    } else if (this.email?.hasError('email')) {
      return 'Niepoprawny email';
    }
    return '';
  }

  isEmailValid() {
    if (this.email?.hasError('required')) {
      return false;
    } else if (this.email?.hasError('email')) {
      return false;
    }
    return true;
  }

  checkIfFirstNameChanged() {
    if (this.firstName?.hasError('required')) {
      return 'Wprowadź wartość';
    }
    if (this.firstName.value == this.user.first_name) {
      return false;
    } else return true;
  }
  isFirstNameValid() {
    if (this.firstName?.hasError('required')) {
      return false;
    }
    return true;
  }

  getLastName() {
    if (this.lastName?.hasError('required')) {
      return 'Wprowadź wartość';
    }
    return '';
  }
  isLastNameValid() {
    if (this.lastName?.hasError('required')) {
      return false;
    }
    return true;
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((res) => {
      this.user = res;
      this.initStuff();
    });
  }
}

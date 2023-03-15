import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isSubmitted = false;
  // validUser = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar
  ) {}

  loginpage = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    userType: ['', Validators.required],
  });

  ngOnInit() {
    // window.location.reload();
  }

  get username() {
    return this.loginpage.get('username');
  }
  get password() {
    return this.loginpage.get('password');
  }
  get userType() {
    return this.loginpage.get('userType');
  }

  durationInSeconds = 5;

  onSubmit() {
    const formData = {
      username: this.username?.value,
      password: this.password?.value,
      userType: this.userType?.value,
    };
    const options = {
      withCredentials: true,
    };

    this.http
      .post('http://localhost:3000/api/login', formData, options)
      .subscribe((response) => {
        const myObject: { [key: string]: any } = response;

        const auth = myObject['auth'];
        const message = myObject['message'];

        if (auth == true) {
          this.loginpage.reset();
          this._snackBar.open('Login successful', 'OK', {
            duration: this.durationInSeconds * 1000,
          });
          this.router.navigate(['/dashboard']);
        } else {
          this._snackBar.open(message, 'Cancel', {
            duration: this.durationInSeconds * 1000,
          });
          // this.loginpage.reset();
        }
      });
  }
}

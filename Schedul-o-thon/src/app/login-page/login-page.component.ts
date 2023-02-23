import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit{

  username: string = '';
  password: string = '';
  userType: string = '';

  ngOnInit() {
    // window.location.reload();
  }
  constructor(private http: HttpClient) {}
  onSubmit() {
    const formData = {
      username: this.username,
      password: this.password,
      userType: this.userType,
    };
    console.log(formData);
    this.http
      .post('http://localhost:3000/api/login', formData)
      .subscribe((response) => {
        console.log(response);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  // Declare properties for form fields
  fullname: string = '';
  username: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  userType: string = '';
  // responseData: any;
  myMessage: string = '';

  // constructor(private apiService: ApiService) {}
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Add a method to handle form submission
  onSubmit() {
    const formData = {
      fullname: this.fullname,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      confirmPassword: this.confirmPassword,
      userType: this.userType,
    };
    // console.log(formData);

    this.http
      .post('http://localhost:3000/api/register', formData)
      .subscribe((response) => {
        console.log(response);
        const myObject: { [key: string]: any } = response;
        this.myMessage = myObject['message'] as string;
      });
  }
}

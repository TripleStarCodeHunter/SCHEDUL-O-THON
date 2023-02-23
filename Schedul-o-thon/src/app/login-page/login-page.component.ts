import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit{

  isSubmitted = false;

  constructor(private http: HttpClient, 
    private fb: FormBuilder) {}

  loginpage= this.fb.group({
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


  onSubmit() {

    this.isSubmitted = true;
  if (!this.loginpage.valid){
    false;
    alert("Form is Invalid")
  }
  else{
    console.log(JSON.stringify(this.loginpage.value));
    alert("Form Submitted");
    this.loginpage.reset();
  }

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

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registration: FormGroup = new FormGroup({});
  fullname: string = '';
  username: string = '';
  email: string = '';
  mobile: string = '';
  password: string = '';
  conf_password: string = '';
  userType: string = '';
  responseData: any;
  myMessage: string = '';

  constructor(private http: HttpClient) {
    this.registration = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      conf_password: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {}
  registerSubmitted() {
    if (this.registration.invalid) {
      return;
    }
    console.log(this.registration);
    const formData = {
      fullname: this.registration.value.fullname,
      username: this.registration.value.username,
      email: this.registration.value.email,
      mobile: this.registration.value.mobile,
      password: this.registration.value.password,
      conf_password: this.registration.value.conf_password,
      userType: this.registration.value.userType,
    };
    this.http
      .post('http://localhost:3000/api/register', formData)
      .subscribe((response) => {
        console.log(response);
        const myObject: { [key: string]: any } = response;
        this.myMessage = myObject['message'] as string;
        if (this.myMessage == 'done') {
          alert('Registeration successful');
        }
      });
  }
  Compare() {
    if (
      this.registration.get('password') ==
      this.registration.get('conf_password')
    ) {
      return true;
    } else {
      return false;
    }
  }
  get FullName(): FormControl {
    return this.registration.get('fullname') as FormControl;
  }

  get UserName(): FormControl {
    return this.registration.get('username') as FormControl;
  }

  get Email(): FormControl {
    return this.registration.get('email') as FormControl;
  }

  get Mobile(): FormControl {
    return this.registration.get('mobile') as FormControl;
  }

  get Password(): FormControl {
    return this.registration.get('password') as FormControl;
  }

  get ConfirmPassword(): FormControl {
    return this.registration.get('conf_password') as FormControl;
  }
  get UserType(): FormControl {
    return this.registration.get('userType') as FormControl;
  }
}
function ConfirmedValidator(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}

import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
    constructor(){ }
    ngOnInit():void{
    }
    registration=new FormGroup({
      fullname: new FormControl("",[Validators.required]),
      username: new FormGroup("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      mobile:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required]),
      conf_password: new FormControl("",[Validators.required]) 
    });

    registerSubmitted(){
        console.log(this.registration.get("fullname"));
    }

    get FullName():FormControl{
        return this.registration.get("fullname") as FormControl;
    }

    get UserName():FormControl{
      return this.registration.get("username") as FormControl;
    }

    get Email():FormControl{
      return this.registration.get("email") as FormControl;
    }

    get Mobile():FormControl{
      return this.registration.get("mobile") as FormControl;
    }
    
    get Password():FormControl{
      return this.registration.get("password") as FormControl;
    }

    get ConfirmPassword():FormControl{
      return this.registration.get("conf_password") as FormControl;
  }
}

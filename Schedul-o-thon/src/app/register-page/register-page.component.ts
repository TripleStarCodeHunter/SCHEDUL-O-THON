import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
    registration: FormGroup=new FormGroup({});
    constructor(){ 
        this.registration=new FormGroup({
        fullname: new FormControl("",[Validators.required]),
        username: new FormControl("",[Validators.required]),
        email: new FormControl("",[Validators.required]),
        mobile:new FormControl("",[Validators.required]),
        password:new FormControl("",[Validators.required]),
        conf_password: new FormControl("",[Validators.required])})
      }
    ngOnInit():void{
    }

    registerSubmitted(){
        
        if(this.registration.invalid){
            return;
        }
        console.log(this.registration);
        alert("Registeration successful");
    }
    Compare(){
      return this.registration.get('password')!=this.registration.get('conf_password') && this.registration.touched;
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
function ConfirmedValidator(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}


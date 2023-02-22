import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss',
  './assets/src/plugins/jquery-steps/jquery.steps.css',
  './assets/vendors/styles/core.css',
  './assets/vendors/styles/icon-font.min.css',
  './assets/vendors/styles/style.css'
  ],
  encapsulation: ViewEncapsulation.None,
  
})


export class BatchComponent {



  isSubmitted = false;

  Location: any = ['Mysore' , 'Bengaluru' , 'Online'];

  TypeOfBatch : any = ['Engineering CS' , 'Non Engineering CS', 'Special', 'Diploma'] ;

  numberRegEx = /[1-100]/ ;
  
  constructor(private fb: FormBuilder) { }
  
  

  batch = this.fb.group({
    batchname: ['', Validators.required],
    location: ['', Validators.required],
    batchType : ['', Validators.required],
    noOfSubBatch : ['', Validators.required],
    batchSize: ['', Validators.required],
    start : ['', Validators.required],
  });

  changeLocation(e: any) {
    this.location?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  
  changeBatchType(e: any) {
    this.batchType?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get batchname() {
    return this.batch.get('batchname');
  }

  get location() {
    return this.batch.get('location');
  }

  get batchType() {
    return this.batch.get('batchType');
  }

  get noOfSubBatch() {
    return this.batch.get('noOfSubBatch');
  }

  get batchSize() {
    return this.batch.get('batchSize');
  }
  
  get start() {
    return this.batch.get('start');
  }
  
  
// batchname: FormControl<any>;
onSubmit(){
  this.isSubmitted = true;
  if (!this.batch.valid){
    false;
    alert("Form is Invalid")
  }
  else{
    console.log(JSON.stringify(this.batch.value));
    alert("Form Submitted");
    this.batch.reset();
  }
  // console.warn(this.batch.value);
}
}

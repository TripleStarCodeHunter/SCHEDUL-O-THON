
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: [
    './batch.component.scss',
    // '/src/assets/assets/src/plugins/jquery-steps/jquery.steps.css',
    // '/src/assets/assets/vendors/styles/core.css',
    // '/src/assets/assets/vendors/styles/icon-font.min.css',
    // '/src/assets/assets/vendors/styles/style.css'
  ],
  encapsulation: ViewEncapsulation.None,
})



export class BatchComponent {



  isSubmitted = false;

  Location: any = ['Mysore' , 'Bengaluru' , 'Online'];

  TypeOfBatch : any = ['Engineering CS' , 'Non Engineering CS', 'Special', 'Diploma'] ;

  // numberRegEx = /[1-100]/ ;
  numberPattern = "^[0-9]{1,4}$";
  constructor(private fb: FormBuilder , private _snackBar:MatSnackBar) { }
  // constructor(private _snackbar:MatSnackBar) {}
  

  batch = this.fb.group({
    batchname: ['', Validators.required],
    location: ['', Validators.required],
    batchType : ['', Validators.required],
    noOfSubBatch : ['', Validators.required],
    batchSize: ['', Validators.required],
    start : ['', Validators.required],
  });

export class BatchComponent implements OnInit {
  ngOnInit(): void {}

  batch: FormGroup = new FormGroup({});
  Location: any = ['Mysore', 'Bengaluru', 'Online'];
  TypeOfBatch: any = [
    'Engineering CS',
    'Non Engineering CS',
    'Special',
    'Diploma',
  ];
  numberRegEx = /[1-100]/;

  b_batchname: string = '';
  // batch_name: string = '';
  // stream_name: string = '';
  location_batch: string = '';
  batch_type: string = '';
  num_sub_batches: string = '';
  size_batch: string = '';
  start_batch: string = '';

  constructor(private http: HttpClient) {
    this.batch = new FormGroup({
      batchname: new FormControl('', [Validators.required]),
      location: new FormControl(['', Validators.required]),
      batchType: new FormControl(['', Validators.required]),
      noOfSubBatch: new FormControl(['', Validators.required]),
      batchSize: new FormControl(['', Validators.required]),
      start: new FormControl(['', Validators.required]),
    });
  }

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

  
  durationInSeconds = 5;
// batchname: FormControl<any>;
onSubmit(){
  this.isSubmitted = true;
  if (!this.batch.valid){
    false;
    // alert("Form is Invalid")
    this._snackBar.open("Form Invalid", "OK");
  }
  else{
    console.log(JSON.stringify(this.batch.value));
    // alert("Form Submitted");
    this._snackBar.open("Batch Created", "OK",{
      duration: this.durationInSeconds * 1000,
    });
    this.batch.reset();


  // batchname: FormControl<any>;
  onSubmit() {
    if (this.batch.invalid) {
      return;
    }
    const formData = {
      b_batchname: this.batch.value.batchname,
      location_batch: this.batch.value.location,
      batch_type: this.batch.value.batchType,
      num_sub_batches: this.batch.value.noOfSubBatch,
      size_batch: this.batch.value.batchSize,
      start_batch: this.batch.value.start,
    };

    console.log(formData);

    this.http
      .post('http://localhost:3000/api/batch', formData)
      .subscribe((response) => {
        console.log(response);
        if (response) {
          alert('batch created successfully!');
          this.batch.reset();
        }
      });

  }
}

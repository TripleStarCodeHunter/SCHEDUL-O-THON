import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss',],
  encapsulation: ViewEncapsulation.None,
})
export class BatchComponent implements OnInit {
  ngOnInit(): void { }
  isSubmitted = false;
  Location: any = ['Mysore', 'Bengaluru', 'Online'];
  TypeOfBatch: any = ['Engineering CS', 'Non Engineering CS', 'Special', 'Diploma'];
  numberPattern = "^[0-9]{1,4}$";
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private http: HttpClient) { }
  batch = this.fb.group({
    batchname: ['', Validators.required],
    location: ['', Validators.required],
    batchType: ['', Validators.required],
    noOfSubBatch: ['', Validators.required],
    batchSize: ['', Validators.required],
    start: ['', Validators.required],
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
  durationInSeconds = 5;
  onSubmit() {
    this.isSubmitted = true;
    if (!this.batch.valid) {
      false;
      // alert("Form is Invalid")
      this._snackBar.open("Form Invalid", "OK");
    }
    else {
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
            // alert('batch created successfully!');
            // this.batch.reset();
            this._snackBar.open("Batch Created", "OK", {
              duration: this.durationInSeconds * 1000,
            });
            this.batch.reset();
          }
        });
      // console.log(JSON.stringify(this.batch.value));
      // this._snackBar.open("Batch Created", "OK", {
      //   duration: this.durationInSeconds * 1000,
      // });
      // this.batch.reset();
    }
  }
}
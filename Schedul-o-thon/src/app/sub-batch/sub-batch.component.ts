import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-batch',
  templateUrl: './sub-batch.component.html',
  styleUrls: ['./sub-batch.component.scss']
  // encapsulation: ViewEncapsulation.None,
})
export class SubBatchComponent {

  isSubmitted = false;

  Location: any = ['Mysore', 'Bengaluru', 'Online'];

  BatchName: any = ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4'];

  Stream: any = ['Java', 'Python', 'Big Data', 'C/C++'];

  constructor(private fb: FormBuilder) { }

  subBatch = this.fb.group({
    subBatchName: ['', Validators.required],
    batch: ['', Validators.required],
    stream: ['', Validators.required],
    size: ['', Validators.required],
    location: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
    adminName: ['', Validators.required],
  });
  
  // sub batch name
  get subBatchName() {
    return this.subBatch.get('subBatchName');
  }
  
  // batchname
  changeBatchName(e: any) {
    this.batch?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get batch() {
    return this.subBatch.get('batch');
  }
  
  changeStream(e: any) {
    this.stream?.setValue(e.target.value), {
      onlySelf: true
    }
  }
  
  // stream
  get stream() {
    return this.subBatch.get('stream');
  }
  
  // size
  get size() {
    return this.subBatch.get('size');
  }
  
  // location
  changeLocation(e: any) {
    this.location?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get location() {
    return this.subBatch.get('location');
  }

  // start date
  get start() {
    return this.subBatch.get('start');
  }

  // end date
  get end() {
    return this.subBatch.get('end');
  }

  // admin name
  get adminName() {
    return this.subBatch.get('adminName');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.subBatch.valid) {
      false;
      alert("Form is Invalid")
    }
    else {
      console.log(JSON.stringify(this.subBatch.value));
      alert("Form Submitted");
      this.subBatch.reset();
    }
  }
}

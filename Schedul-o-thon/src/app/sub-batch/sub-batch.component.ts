import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sub-batch',
  templateUrl: './sub-batch.component.html',
  styleUrls: ['./sub-batch.component.scss'],
})
export class SubBatchComponent implements OnInit {
  subBatch: FormGroup = new FormGroup({});
  Location: any = ['Mysore', 'Bengaluru', 'Online'];
  BatchName: any = ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4'];
  Stream: any = ['Java', 'Python', 'Big Data', 'C/C++'];
  s_batchname: string = '';
  batch_name: string = '';
  stream_name: string = '';
  size_batch: string = '';
  location_batch: string = '';
  start_batch: string = '';
  end_batch: string = '';
  admin_batch: any;

  constructor(private http: HttpClient) {
    this.subBatch = new FormGroup({
      subBatchName: new FormControl('', [Validators.required]),
      batch: new FormControl(['', Validators.required]),
      stream: new FormControl(['', Validators.required]),
      size: new FormControl(['', Validators.required]),
      location: new FormControl(['', Validators.required]),
      start: new FormControl(['', Validators.required]),
      end: new FormControl(['', Validators.required]),
      adminName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  // sub batch name
  get subBatchName(): FormControl {
    return this.subBatch.get('subBatchName') as FormControl;
  }

  // batchname
  changeBatchName(e: any) {
    this.batch?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get batch(): FormControl {
    return this.subBatch.get('batch') as FormControl;
  }

  changeStream(e: any) {
    this.stream?.setValue(e.target.value),
      {
        onlySelf: true,
      };
  }

  // stream
  get stream(): FormControl {
    return this.subBatch.get('stream') as FormControl;
  }

  // size
  get size(): FormControl {
    return this.subBatch.get('size') as FormControl;
  }

  // location
  changeLocation(e: any) {
    this.location?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get location(): FormControl {
    return this.subBatch.get('location') as FormControl;
  }

  // start date
  get start(): FormControl {
    return this.subBatch.get('start') as FormControl;
  }

  // end date
  get end(): FormControl {
    return this.subBatch.get('end') as FormControl;
  }

  // admin name
  get adminName(): FormControl {
    return this.subBatch.get('adminName') as FormControl;
  }

  onSubmit() {
    if (this.subBatch.invalid) {
      return;
    }
    const formData = {
      s_batchname: this.subBatch.value.subBatchName,
      batch_name: this.subBatch.value.batch,
      stream_name: this.subBatch.value.stream,
      size_batch: this.subBatch.value.size,
      location_batch: this.subBatch.value.location,
      start_batch: this.subBatch.value.start,
      end_batch: this.subBatch.value.end,
      admin_batch: this.subBatch.value.adminName,
    };

    this.http
      .post('http://localhost:3000/api/sub_batch', formData)
      .subscribe((response) => {
        console.log(response);
        if (response) {
          alert('sub_batch created successfully!');
          this.subBatch.reset();
        }
      });

    console.log(formData);
  }
}

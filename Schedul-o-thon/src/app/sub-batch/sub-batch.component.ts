import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../shared/services/data-service.service';
@Component({
  selector: 'app-sub-batch',
  templateUrl: './sub-batch.component.html',
  styleUrls: ['./sub-batch.component.scss'],
})
export class SubBatchComponent implements OnInit {
  isSubmitted = false;
  Location: any = ['Mysore', 'Bengaluru', 'Online'];
  numberPattern = '^[0-9]{1,4}$';
  BatchName: any = ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4'];
  Stream: any = ['Java', 'Python', 'Big Data', 'C/C++'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}
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

  data!: any[];

  ngOnInit() {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    });
  }
  get subBatchName() {
    return this.subBatch.get('subBatchName');
  }
  changeBatchName(e: any) {
    this.batch?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get batch() {
    return this.subBatch.get('batch');
  }
  changeStream(e: any) {
    this.stream?.setValue(e.target.value),
      {
        onlySelf: true,
      };
  }
  get stream() {
    return this.subBatch.get('stream');
  }
  get size() {
    return this.subBatch.get('size');
  }
  changeLocation(e: any) {
    this.location?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get location() {
    return this.subBatch.get('location');
  }
  get start() {
    return this.subBatch.get('start');
  }
  get end() {
    return this.subBatch.get('end');
  }
  get adminName() {
    return this.subBatch.get('adminName');
  }
  durationInSeconds = 5;
  onSubmit() {
    this.isSubmitted = true;
    if (this.subBatch.invalid) {
      false;
      this._snackBar.open('Form Invalid', 'OK');
      return;
    } else {
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

      this.http.get('http://localhost:3000/api/login').subscribe((response) => {
        console.log(response);
      });

      this.http
        .post('http://localhost:3000/api/sub_batch', formData)
        .subscribe((response) => {
          console.log(response);
          const myObject: { [key: string]: any } = response;
          const check = myObject['add'];
          if (check == true) {
            this._snackBar.open('Sub batch Created', 'OK', {
              duration: this.durationInSeconds * 1000,
            });
            this.subBatch.reset();
          } else if (check == false) {
            this._snackBar.open('Sub batch already exists', 'Cancel', {
              duration: this.durationInSeconds * 1000,
            });
            this.subBatch.reset();
          }
        });
      console.log(formData);
    }
  }
}

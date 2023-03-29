import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-batch-form',
  templateUrl: './update-batch-form.component.html',
  styleUrls: ['./update-batch-form.component.scss'],
})
export class UpdateBatchFormComponent implements OnInit {
  data!:any;
  

  isSubmitted = false;
  Location: any = ['Mysore', 'Bengaluru', 'Online'];
  TypeOfBatch: any = [
    'Engineering CS',
    'Non Engineering CS',
    'Special',
    'Diploma',
  ];
  numberPattern = '^[0-9]{1,4}$';
  constructor(
    private fb: FormBuilder,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    let batch_id = this.route.snapshot.paramMap.get('batch_id');
    const url = `api/batch-display-form/${batch_id}`;

    this.http.get(url).subscribe((response) => {
      this.data = response;
      console.log(this.data)

    });
  }
  update_batch = this.fb.group({
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
    return this.update_batch.get('batchname');
  }
  get location() {
    return this.update_batch.get('location');
  }
  get batchType() {
    return this.update_batch.get('batchType');
  }
  get noOfSubBatch() {
    return this.update_batch.get('noOfSubBatch');
  }
  get batchSize() {
    return this.update_batch.get('batchSize');
  }
  get start() {
    return this.update_batch.get('start');
  }
  durationInSeconds = 5;
  onSubmit() {
    this.isSubmitted = true;
    if (!this.update_batch.valid) {
      false;
      // alert("Form is Invalid")
      this._snackBar.open('Form Invalid', 'OK');
    } else {
      const formData = {
        b_batchname: this.update_batch.value.batchname,
        location_batch: this.update_batch.value.location,
        batch_type: this.update_batch.value.batchType,
        num_sub_batches: this.update_batch.value.noOfSubBatch,
        size_batch: this.update_batch.value.batchSize,
        start_batch: this.update_batch.value.start,
      };
      // console.log(formData);

      const id = this.route.snapshot.paramMap.get('batch_id');

      this.http
        .post(`http://localhost:3000/api/update_batch/${id}`, formData)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }
}

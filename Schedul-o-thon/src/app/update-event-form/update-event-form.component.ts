import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-update-event-form',
  templateUrl: './update-event-form.component.html',
  styleUrls: ['./update-event-form.component.scss']
})
export class UpdateEventFormComponent implements OnInit {

  ngOnInit(): void { }
  isSubmitted = false;
  BatchName: any = ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4'];
  SubBatchName: any = ['Sub Batch 1', 'Sub Batch 2', 'Sub Batch 3', 'Sub Batch 4'];
  SectionName: any = ['Section 1', 'Section 2', 'Section 3', 'Section 4'];
  constructor(
    private fb: FormBuilder,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    private http: HttpClient
  ) { }
  update_eventsform = this.fb.group({
    eventname: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
    instructor: ['', Validators.required],
    additionalInfo: ['', Validators.required],
    scheduleName: ['', Validators.required],
    batch: ['', Validators.required],
    sub_batch: ['', Validators.required],
    section: ['', Validators.required],
    description: ['', Validators.required],
  });
  data!: any[];

  get eventname() {
    return this.update_eventsform.get('eventname');
  }
  get start() {
    return this.update_eventsform.get('start');
  }
  get end() {
    return this.update_eventsform.get('end');
  }
  get instructor() {
    return this.update_eventsform.get('instructor');
  }
  get additionalInfo() {
    return this.update_eventsform.get('additionalInfo');
  }
  get scheduleName() {
    return this.update_eventsform.get('scheduleName');
  }
  changeBatchName(e: any) {
    this.update_eventsform?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get batch() {
    return this.update_eventsform.get('batch');
  }
  changeSubBatchName(e: any) {
    this.update_eventsform?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get sub_batch() {
    return this.update_eventsform.get('sub_batch');
  }
  changeSectionName(e: any) {
    this.update_eventsform?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get section() {
    return this.update_eventsform.get('section');
  }
  get description() {
    return this.update_eventsform.get('description');
  }

  durationInSeconds = 5;
  onSubmit() {
    this.isSubmitted = true;
    if (!this.update_eventsform.valid) {
      false;
      // alert("Form is Invalid")
      this._snackBar.open('Form Invalid', 'OK');
    } else {
      // const formData = {
      // b_batchname: this.eventsform.value.batchname,
      // location_batch: this.eventsform.value.location,
      // batch_type: this.eventsform.value.batchType,
      // num_sub_batches: this.eventsform.value.noOfSubBatch,
      // size_batch: this.eventsform.value.batchSize,
      // start_batch: this.eventsform.value.start,
      // };
      // console.log(formData);
      // this.http
      // .post('http://localhost:3000/api/batch', formData)
      // .subscribe((response) => {
      // console.log(response);
      //   const myObject: { [key: string]: any } = response;
      //   const check = myObject['add'];
      //   if (check == true) {
      //     this._snackBar.open('Batch Created', 'OK', {
      //       duration: this.durationInSeconds * 1000,
      //     });
      //     this.eventsform.reset();
      //   } else if (check == false) {
      //     this._snackBar.open('Batch already exists', 'Cancel', {
      //       duration: this.durationInSeconds * 1000,
      //     });
      //     this.eventsform.reset();
      //   }
      // });
    }
  }

}

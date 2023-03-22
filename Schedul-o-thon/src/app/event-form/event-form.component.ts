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
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

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
  eventsform = this.fb.group({
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
    return this.eventsform.get('eventname');
  }
  get start() {
    return this.eventsform.get('start');
  }
  get end() {
    return this.eventsform.get('end');
  }
  get instructor() {
    return this.eventsform.get('instructor');
  }
  get additionalInfo() {
    return this.eventsform.get('additionalInfo');
  }
  get scheduleName() {
    return this.eventsform.get('scheduleName');
  }
  changeBatchName(e: any) {
    this.eventsform?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get batch() {
    return this.eventsform.get('batch');
  }
  changeSubBatchName(e: any) {
    this.eventsform?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get sub_batch() {
    return this.eventsform.get('sub_batch');
  }
  changeSectionName(e: any) {
    this.eventsform?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get section() {
    return this.eventsform.get('section');
  }
  get description() {
    return this.eventsform.get('description');
  }

  durationInSeconds = 5;
  onSubmit() {
    this.isSubmitted = true;
    if (!this.eventsform.valid) {
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

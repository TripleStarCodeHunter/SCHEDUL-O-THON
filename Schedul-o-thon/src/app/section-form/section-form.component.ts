import { Component,ViewEncapsulation, OnInit, Inject  } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit{
  ngOnInit(): void {}
  isSubmitted = false;
  SectionOwner: any = ['Owner1', 'Owner2', 'Owner3'];
  Track: any = [
    'Java',
    'Big Data',
    'Python'
  ];
  numberPattern = '^[0-9]{1,4}$';
  constructor(
    private fb: FormBuilder,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
  section = this.fb.group({
    sectionName: ['', Validators.required],
    strength: ['', Validators.required],
    track: ['', Validators.required],
    section_owner: ['', Validators.required],
    section_dl: ['', Validators.required],
    classroom: ['', Validators.required],
    schedule: ['', Validators.required],
    trainee_list: ['', Validators.required],
  });
  
  
  get sectionName() {
    return this.section.get('sectionName');
  }
  get strength() {
    return this.section.get('strength');
  }
  changeTrack(e: any) {
    this.track?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get track() {
    return this.section.get('track');
  }
  changeSectionOwner(e: any) {
    this.section_owner?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get section_owner() {
    return this.section.get('section_owner');
  }
  get section_dl() {
    return this.section.get('section_dl');
  }
  get classroom() {
    return this.section.get('classroom');
  }
  get schedule() {
    return this.section.get('schedule');
  }
  get trainee_list() {
    return this.section.get('trainee_list');
  }
  durationInSeconds = 5;
  onSubmit() {
    this.isSubmitted = true;
    if (!this.section.valid) {
      false;
      // alert("Form is Invalid")
      this._snackBar.open('Form Invalid', 'OK');
    } else {
      const formData = {
        // sectionName: this.section.value.sectionName,
        // strength: this.section.value.strength,
        // track: this.section.value.track,
        // num_sub_batches: this.section.value.noOfSubBatch,
        // size_batch: this.section.value.batchSize,
        // start_batch: this.section.value.start,
      };
      // console.log(formData);
      this.http
        .post('http://localhost:3000/api/batch', formData)
        .subscribe((response) => {
          // console.log(response);
          const myObject: { [key: string]: any } = response;
          const check = myObject['add'];
          if (check == true) {
            this._snackBar.open('Batch Created', 'OK', {
              duration: this.durationInSeconds * 1000,
            });
            this.section.reset();
          } else if (check == false) {
            this._snackBar.open('Batch already exists', 'Cancel', {
              duration: this.durationInSeconds * 1000,
            });
            this.section.reset();
          }
        });
    }
  }
}

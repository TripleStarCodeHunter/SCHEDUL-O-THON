import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { GetSectionService } from '../shared/services/get-section.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-section-form',
  templateUrl: './update-section-form.component.html',
  styleUrls: ['./update-section-form.component.scss']
})
export class UpdateSectionFormComponent implements OnInit {
  // ngOnInit(): void {}
  isSubmitted = false;
  SectionOwner: any = ['Owner1', 'Owner2', 'Owner3'];
  Track: any = [
    'Java',
    'Big Data',
    'Python'
  ];
  Subbatch: any = ['S1', 'S2', 'S3'];

  numberPattern = '^[0-9]{1,4}$';
  constructor(
    private fb: FormBuilder,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    private http: HttpClient,
    private GetSectionService: GetSectionService,
    private route:ActivatedRoute
  ) { }
  update_section = this.fb.group({
    sectionName: ['', Validators.required],
    strength: ['', Validators.required],
    track: ['', Validators.required],
    section_owner: ['', Validators.required],
    section_dl: ['', Validators.required],
    classroom: ['', Validators.required],
    // schedule: ['', Validators.required],
    trainee_list: ['', Validators.required],
    subb: ['', Validators.required]
  });
  data!: any;
  ngOnInit() {
    let section_id = this.route.snapshot.paramMap.get('section_id');
    const url = `api/update-section-form/${section_id}`;
    this.http.get(url).subscribe((response) => {
      this.data = response;
    });
    // this.GetSectionService.getData().subscribe((data) => {
    //   this.data = data;
    //   console.log(this.data)
    // });
  }
  changeSubbatch(e: any) {
    this.Subbatch?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get sectionName() {
    return this.update_section.get('sectionName');
  }
  get strength() {
    return this.update_section.get('strength');
  }
  changeTrack(e: any) {
    this.track?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get track() {
    return this.update_section.get('track');
  }
  changeSectionOwner(e: any) {
    this.section_owner?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get section_owner() {
    return this.update_section.get('section_owner');
  }
  get section_dl() {
    return this.update_section.get('section_dl');
  }
  get classroom() {
    return this.update_section.get('classroom');
  }
  get schedule() {
    return this.update_section.get('schedule');
  }
  get trainee_list() {
    return this.update_section.get('trainee_list');
  }
  get subb() {
    return this.update_section.get('subb');
  }
  durationInSeconds = 5;
  onSubmit() {
    this.isSubmitted = true;
    if (!this.update_section.valid) {
      false;
      // alert("Form is Invalid")
      this._snackBar.open('Form Invalid', 'OK');
    } else {
      const formData = {
        sectionName: this.update_section.value.sectionName,
        strength: this.update_section.value.strength,
        track: this.update_section.value.track,
        section_owner: this.update_section.value.section_owner,
        section_dl: this.update_section.value.section_dl,
        classroom: this.update_section.value.classroom,
        trainee_list: this.update_section.value.trainee_list,
        subb: this.update_section.value.subb

      };
      this.http.get('http://localhost:3000/api/login').subscribe((response) => {
        console.log(response);
      });
      console.log(formData);
      this.http
        .post('http://localhost:3000/api/section', formData)
        .subscribe((response) => {
          // console.log(response);
          const myObject: { [key: string]: any } = response;
          const check = myObject['add'];
          if (check == true) {
            this._snackBar.open('section created', 'OK', {
              duration: this.durationInSeconds * 1000,
            });
            this.update_section.reset();
          } else if (check == false) {
            this._snackBar.open('section already exists', 'Cancel', {
              duration: this.durationInSeconds * 1000,
            });
            this.update_section.reset();
          }
        });
    }
  }
}
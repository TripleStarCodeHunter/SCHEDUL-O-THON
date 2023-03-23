import { Component, ViewEncapsulation, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { GetSectionService } from '../shared/services/get-section.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {
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

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['Trainee1@gmail.com', 'trainee@gmail.com', 'trainee3@edu.in', 'traineeeeee@yahoo.com', 'ok@okay.com'];

  @ViewChild('fruitInput') fruitInput:ElementRef<HTMLInputElement>;
  
  constructor(
    private fb: FormBuilder,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    private http: HttpClient,
    private GetSectionService: GetSectionService,
  ) { this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    startWith(null),
    map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
  ); }
  section = this.fb.group({
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


  data!: any[];

  ngOnInit() {
    this.GetSectionService.getData().subscribe((data) => {
      this.data = data;
      console.log(this.data)
    });
  }


  changeSubbatch(e: any) {
    this.Subbatch?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

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

  get subb() {
    return this.section.get('subb');
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
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
        sectionName: this.section.value.sectionName,
        strength: this.section.value.strength,
        track: this.section.value.track,
        section_owner: this.section.value.section_owner,
        section_dl: this.section.value.section_dl,
        classroom: this.section.value.classroom,
        trainee_list: this.section.value.trainee_list,
        subb: this.section.value.subb

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
            this.section.reset();
          } else if (check == false) {
            this._snackBar.open('section already exists', 'Cancel', {
              duration: this.durationInSeconds * 1000,
            });
            this.section.reset();
          }
        });
    }
  }
}

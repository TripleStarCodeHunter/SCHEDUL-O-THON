import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSectionFormComponent } from './update-section-form.component';

describe('UpdateSectionFormComponent', () => {
  let component: UpdateSectionFormComponent;
  let fixture: ComponentFixture<UpdateSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSectionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

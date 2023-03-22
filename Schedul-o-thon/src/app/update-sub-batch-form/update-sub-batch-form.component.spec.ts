import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubBatchFormComponent } from './update-sub-batch-form.component';

describe('UpdateSubBatchFormComponent', () => {
  let component: UpdateSubBatchFormComponent;
  let fixture: ComponentFixture<UpdateSubBatchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubBatchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubBatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

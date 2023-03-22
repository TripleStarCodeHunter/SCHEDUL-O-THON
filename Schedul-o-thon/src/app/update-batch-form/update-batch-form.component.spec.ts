import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBatchFormComponent } from './update-batch-form.component';

describe('UpdateBatchFormComponent', () => {
  let component: UpdateBatchFormComponent;
  let fixture: ComponentFixture<UpdateBatchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBatchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

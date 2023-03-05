import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubbatchCardComponent } from './subbatch-card.component';

describe('SubbatchCardComponent', () => {
  let component: SubbatchCardComponent;
  let fixture: ComponentFixture<SubbatchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubbatchCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubbatchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

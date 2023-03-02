import { TestBed } from '@angular/core/testing';

import { SubbatchService } from './subbatch.service';

describe('SubbatchService', () => {
  let service: SubbatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubbatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

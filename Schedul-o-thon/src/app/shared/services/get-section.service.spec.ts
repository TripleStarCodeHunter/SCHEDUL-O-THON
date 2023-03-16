import { TestBed } from '@angular/core/testing';

import { GetSectionService } from './get-section.service';

describe('GetSectionService', () => {
  let service: GetSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

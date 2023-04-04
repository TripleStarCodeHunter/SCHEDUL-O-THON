import { TestBed } from '@angular/core/testing';

import { GetSectionNameService } from './get-section-name.service';

describe('GetSectionNameService', () => {
  let service: GetSectionNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSectionNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

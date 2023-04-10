import { TestBed } from '@angular/core/testing';

import { GetRegisterInfoService } from './get-register-info.service';

describe('GetRegisterInfoService', () => {
  let service: GetRegisterInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRegisterInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

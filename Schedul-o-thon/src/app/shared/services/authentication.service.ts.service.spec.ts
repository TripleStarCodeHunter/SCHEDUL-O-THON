import { TestBed } from '@angular/core/testing';

import { AuthenticationServiceTsService } from './authentication.service.ts.service';

describe('AuthenticationServiceTsService', () => {
  let service: AuthenticationServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

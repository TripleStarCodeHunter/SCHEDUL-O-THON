import { TestBed } from '@angular/core/testing';

import { GetUpcomingEventService } from './get-upcoming-event.service';

describe('GetUpcomingEventService', () => {
  let service: GetUpcomingEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUpcomingEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

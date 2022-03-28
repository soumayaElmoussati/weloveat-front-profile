import { TestBed } from '@angular/core/testing';

import { ReservationAdminService } from './reservation-admin.service';

describe('ReservationAdminService', () => {
  let service: ReservationAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

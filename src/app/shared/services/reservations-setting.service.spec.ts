import { TestBed } from '@angular/core/testing';

import { ReservationsSettingService } from './reservations-setting.service';

describe('ReservationsSettingService', () => {
  let service: ReservationsSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationsSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

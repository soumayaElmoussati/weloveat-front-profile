import { TestBed } from '@angular/core/testing';

import { AdminEstablishmentService } from './admin-establishment.service';

describe('AdminEstablishmentService', () => {
  let service: AdminEstablishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEstablishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

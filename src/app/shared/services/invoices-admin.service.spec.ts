import { TestBed } from '@angular/core/testing';

import { InvoicesAdminService } from './invoices-admin.service';

describe('InvoicesAdminService', () => {
  let service: InvoicesAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicesAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

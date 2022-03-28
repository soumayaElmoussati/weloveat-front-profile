import { TestBed } from '@angular/core/testing';

import { EvaluationsAdminService } from './evaluations-admin.service';

describe('EvaluationsAdminService', () => {
  let service: EvaluationsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

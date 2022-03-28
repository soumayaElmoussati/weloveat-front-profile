import { TestBed } from '@angular/core/testing';

import { AdditionalErrandsService } from './additional-errands.service';

describe('AdditionalErrandsService', () => {
  let service: AdditionalErrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalErrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

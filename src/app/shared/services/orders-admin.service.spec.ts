import { TestBed } from '@angular/core/testing';

import { OrdersAdminService } from './orders-admin.service';

describe('OrdersAdminService', () => {
  let service: OrdersAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

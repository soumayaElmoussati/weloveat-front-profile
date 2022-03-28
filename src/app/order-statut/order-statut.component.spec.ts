import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatutComponent } from './order-statut.component';

describe('OrderStatutComponent', () => {
  let component: OrderStatutComponent;
  let fixture: ComponentFixture<OrderStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

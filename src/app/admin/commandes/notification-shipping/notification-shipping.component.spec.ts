import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationShippingComponent } from './notification-shipping.component';

describe('NotificationShippingComponent', () => {
  let component: NotificationShippingComponent;
  let fixture: ComponentFixture<NotificationShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

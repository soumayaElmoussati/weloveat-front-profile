import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeliveryComponent } from './confirmation-delivery.component';

describe('ConfirmationDeliveryComponent', () => {
  let component: ConfirmationDeliveryComponent;
  let fixture: ComponentFixture<ConfirmationDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

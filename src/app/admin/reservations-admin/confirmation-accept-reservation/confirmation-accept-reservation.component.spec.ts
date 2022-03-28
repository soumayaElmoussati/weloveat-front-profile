import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationAcceptReservationComponent } from './confirmation-accept-reservation.component';

describe('ConfirmationAcceptReservationComponent', () => {
  let component: ConfirmationAcceptReservationComponent;
  let fixture: ComponentFixture<ConfirmationAcceptReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationAcceptReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationAcceptReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

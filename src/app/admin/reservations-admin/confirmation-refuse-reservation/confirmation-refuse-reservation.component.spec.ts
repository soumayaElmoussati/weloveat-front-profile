import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationRefuseReservationComponent } from './confirmation-refuse-reservation.component';

describe('ConfirmationRefuseReservationComponent', () => {
  let component: ConfirmationRefuseReservationComponent;
  let fixture: ComponentFixture<ConfirmationRefuseReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationRefuseReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationRefuseReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

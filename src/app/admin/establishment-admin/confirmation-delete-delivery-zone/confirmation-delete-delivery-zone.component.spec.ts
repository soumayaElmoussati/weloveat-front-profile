import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteDeliveryZoneComponent } from './confirmation-delete-delivery-zone.component';

describe('ConfirmationDeleteDeliveryZoneComponent', () => {
  let component: ConfirmationDeleteDeliveryZoneComponent;
  let fixture: ComponentFixture<ConfirmationDeleteDeliveryZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteDeliveryZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeleteDeliveryZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

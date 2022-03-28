import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsSettingsComponent } from './reservations-settings.component';

describe('ReservationsSettingsComponent', () => {
  let component: ReservationsSettingsComponent;
  let fixture: ComponentFixture<ReservationsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

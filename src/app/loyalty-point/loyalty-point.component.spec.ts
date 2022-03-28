import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyPointComponent } from './loyalty-point.component';

describe('LoyaltyPointComponent', () => {
  let component: LoyaltyPointComponent;
  let fixture: ComponentFixture<LoyaltyPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

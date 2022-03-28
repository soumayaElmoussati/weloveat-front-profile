import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoyaltyPointComponent } from './user-loyalty-point.component';

describe('UserLoyaltyPointComponent', () => {
  let component: UserLoyaltyPointComponent;
  let fixture: ComponentFixture<UserLoyaltyPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoyaltyPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoyaltyPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

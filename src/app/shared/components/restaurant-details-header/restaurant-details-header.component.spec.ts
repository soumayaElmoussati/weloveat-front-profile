import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDetailsHeaderComponent } from './restaurant-details-header.component';

describe('RestaurantDetailsHeaderComponent', () => {
  let component: RestaurantDetailsHeaderComponent;
  let fixture: ComponentFixture<RestaurantDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantDetailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

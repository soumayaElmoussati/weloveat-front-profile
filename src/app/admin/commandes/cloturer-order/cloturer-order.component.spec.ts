import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloturerOrderComponent } from './cloturer-order.component';

describe('CloturerOrderComponent', () => {
  let component: CloturerOrderComponent;
  let fixture: ComponentFixture<CloturerOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloturerOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloturerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

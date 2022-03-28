import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpElementComponent } from './pop-up-element.component';

describe('PopUpElementComponent', () => {
  let component: PopUpElementComponent;
  let fixture: ComponentFixture<PopUpElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

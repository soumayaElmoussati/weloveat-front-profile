import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalErrandsComponent } from './additional-errands.component';

describe('AdditionalErrandsComponent', () => {
  let component: AdditionalErrandsComponent;
  let fixture: ComponentFixture<AdditionalErrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalErrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalErrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

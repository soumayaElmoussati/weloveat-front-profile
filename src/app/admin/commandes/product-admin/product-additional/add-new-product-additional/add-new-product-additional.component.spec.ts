import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProductAdditionalComponent } from './add-new-product-additional.component';

describe('AddNewProductAdditionalComponent', () => {
  let component: AddNewProductAdditionalComponent;
  let fixture: ComponentFixture<AddNewProductAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewProductAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProductAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

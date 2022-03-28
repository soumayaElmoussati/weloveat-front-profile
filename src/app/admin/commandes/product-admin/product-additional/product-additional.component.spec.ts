import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdditionalComponent } from './product-additional.component';

describe('ProductAdditionalComponent', () => {
  let component: ProductAdditionalComponent;
  let fixture: ComponentFixture<ProductAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

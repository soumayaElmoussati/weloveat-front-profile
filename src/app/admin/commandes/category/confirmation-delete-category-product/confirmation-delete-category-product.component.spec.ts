import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteCategoryProductComponent } from './confirmation-delete-category-product.component';

describe('ConfirmationDeleteCategoryProductComponent', () => {
  let component: ConfirmationDeleteCategoryProductComponent;
  let fixture: ComponentFixture<ConfirmationDeleteCategoryProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteCategoryProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeleteCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

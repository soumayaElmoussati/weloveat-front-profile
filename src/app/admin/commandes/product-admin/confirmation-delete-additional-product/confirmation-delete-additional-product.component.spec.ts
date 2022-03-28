import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteAdditionalProductComponent } from './confirmation-delete-additional-product.component';

describe('ConfirmationDeleteAdditionalProductComponent', () => {
  let component: ConfirmationDeleteAdditionalProductComponent;
  let fixture: ComponentFixture<ConfirmationDeleteAdditionalProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteAdditionalProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeleteAdditionalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

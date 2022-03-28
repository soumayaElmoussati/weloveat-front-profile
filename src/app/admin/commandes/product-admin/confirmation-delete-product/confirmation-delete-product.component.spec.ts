import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteProductComponent } from './confirmation-delete-product.component';

describe('ConfirmationDeleteProductComponent', () => {
  let component: ConfirmationDeleteProductComponent;
  let fixture: ComponentFixture<ConfirmationDeleteProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

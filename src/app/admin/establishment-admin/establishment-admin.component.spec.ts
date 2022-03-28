import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentAdminComponent } from './establishment-admin.component';

describe('EstablishmentAdminComponent', () => {
  let component: EstablishmentAdminComponent;
  let fixture: ComponentFixture<EstablishmentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZoneGeographiqueComponent } from './add-zone-geographique.component';

describe('AddZoneGeographiqueComponent', () => {
  let component: AddZoneGeographiqueComponent;
  let fixture: ComponentFixture<AddZoneGeographiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddZoneGeographiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddZoneGeographiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdresseComponent } from './dialog-adresse.component';

describe('DialogAdresseComponent', () => {
  let component: DialogAdresseComponent;
  let fixture: ComponentFixture<DialogAdresseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdresseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

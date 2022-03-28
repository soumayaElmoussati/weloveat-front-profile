import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTakeawayComponent } from './search-takeaway.component';

describe('SearchTakeawayComponent', () => {
  let component: SearchTakeawayComponent;
  let fixture: ComponentFixture<SearchTakeawayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTakeawayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTakeawayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

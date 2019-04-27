import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPopupComponent } from './list-popup.component';

describe('ListPopupComponent', () => {
  let component: ListPopupComponent;
  let fixture: ComponentFixture<ListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

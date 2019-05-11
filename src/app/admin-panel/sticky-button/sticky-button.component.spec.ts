import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyButtonComponent } from './sticky-button.component';

describe('StickyButtonComponent', () => {
  let component: StickyButtonComponent;
  let fixture: ComponentFixture<StickyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

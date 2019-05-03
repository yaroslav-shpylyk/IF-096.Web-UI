import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFooterMenuComponent } from './footer-menu.component';

describe('StudentFooterMenuComponent', () => {
  let component: StudentFooterMenuComponent;
  let fixture: ComponentFixture<StudentFooterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFooterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFooterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

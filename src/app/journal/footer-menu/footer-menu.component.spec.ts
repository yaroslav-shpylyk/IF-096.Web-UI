import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFooterMenuComponent } from './footer-menu.component';

describe('TeacherFooterMenuComponent', () => {
  let component: TeacherFooterMenuComponent;
  let fixture: ComponentFixture<TeacherFooterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFooterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFooterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

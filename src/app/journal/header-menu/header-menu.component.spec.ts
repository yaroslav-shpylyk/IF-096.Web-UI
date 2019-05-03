import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHeaderMenuComponent } from './header-menu.component';

describe('StudentHeaderMenuComponent', () => {
  let component: TeacherHeaderMenuComponent;
  let fixture: ComponentFixture<TeacherHeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHeaderMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

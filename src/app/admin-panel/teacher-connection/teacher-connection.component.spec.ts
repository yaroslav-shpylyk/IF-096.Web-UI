import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherConnectionComponent } from './teacher-connection.component';

describe('TeacherConnectionComponent', () => {
  let component: TeacherConnectionComponent;
  let fixture: ComponentFixture<TeacherConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBookComponent } from './student-book.component';

describe('StudentBookComponent', () => {
  let component: StudentBookComponent;
  let fixture: ComponentFixture<StudentBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

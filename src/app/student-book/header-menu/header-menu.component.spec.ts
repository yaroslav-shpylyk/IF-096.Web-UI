import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHeaderMenuComponent } from './header-menu.component';

describe('StudentHeaderMenuComponent', () => {
  let component: StudentHeaderMenuComponent;
  let fixture: ComponentFixture<StudentHeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHeaderMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

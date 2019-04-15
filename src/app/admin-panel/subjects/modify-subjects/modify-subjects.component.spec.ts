import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySubjectsComponent } from './modify-subjects.component';

describe('ModifySubjectsComponent', () => {
  let component: ModifySubjectsComponent;
  let fixture: ComponentFixture<ModifySubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifySubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

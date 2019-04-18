import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassJournalComponent } from './class-journal.component';

describe('ClassJournalComponent', () => {
  let component: ClassJournalComponent;
  let fixture: ComponentFixture<ClassJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

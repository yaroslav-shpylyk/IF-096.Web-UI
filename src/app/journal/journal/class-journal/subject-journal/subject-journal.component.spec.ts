import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectJournalComponent } from './subject-journal.component';

describe('SubjectJournalComponent', () => {
  let component: SubjectJournalComponent;
  let fixture: ComponentFixture<SubjectJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

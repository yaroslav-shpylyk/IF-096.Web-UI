import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToJournalDialogComponent } from './connect-to-journal-dialog.component';

describe('ConnectToJournalDialogComponent', () => {
  let component: ConnectToJournalDialogComponent;
  let fixture: ComponentFixture<ConnectToJournalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectToJournalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectToJournalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

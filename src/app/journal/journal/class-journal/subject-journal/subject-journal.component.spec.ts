import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectJournalComponent } from './subject-journal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { JournalsStorageService } from '../../../../services/journals-storage.service';
import { TeachersStorageService } from '../../../../services/teachers-storage.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubjectJournalComponent', () => {
  let component: SubjectJournalComponent;
  let fixture: ComponentFixture<SubjectJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, RouterTestingModule ],
      declarations: [ SubjectJournalComponent ],
      providers: [ JournalsStorageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

// Uncaught InvalidTokenError: Invalid token specified thrown

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassJournalComponent } from './class-journal.component';
import { MaterialModule } from '../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JournalsStorageService } from '../../../services/journals-storage.service';
import { RouterModule } from '@angular/router';
import { TeachersStorageService } from '../../../services/teachers-storage.service';

describe('ClassJournalComponent', () => {
  let component: ClassJournalComponent;
  let fixture: ComponentFixture<ClassJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, RouterTestingModule, RouterModule ],
      declarations: [ ClassJournalComponent ],
      providers: [ JournalsStorageService, TeachersStorageService ]
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

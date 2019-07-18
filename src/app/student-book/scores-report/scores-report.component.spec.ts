import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoresReportComponent } from './scores-report.component';
import { SubjectMarksComponent } from './subject-marks/subject-marks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ScoresReportComponent', () => {
  let component: ScoresReportComponent;
  let fixture: ComponentFixture<ScoresReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule ],
      declarations: [ ScoresReportComponent, SubjectMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

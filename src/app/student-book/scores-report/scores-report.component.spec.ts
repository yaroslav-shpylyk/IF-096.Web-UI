import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresReportComponent } from './scores-report.component';

describe('ScoresReportComponent', () => {
  let component: ScoresReportComponent;
  let fixture: ComponentFixture<ScoresReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoresReportComponent ]
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

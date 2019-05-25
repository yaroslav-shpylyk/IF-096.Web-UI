import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { streamData } from './mocks/stream-data';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        ChartsModule
      ],
      declarations: [DashboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update bar chart', () => {
    (component as any).updateChart(streamData);
    expect(component.studentsOfStream).toBe(23);
    expect(component.classesStream).toBe(3);
    expect(component.chartLabels.length).toBe(0);
    for (let i = 0; i < streamData.studentsData.length; i++) {
      expect(component.chartData[i].data[0]).toBe(streamData.studentsData[i].numOfStudents);
      expect(component.chartData[i].label).toBe(streamData.studentsData[i].className);
    }
  });
});

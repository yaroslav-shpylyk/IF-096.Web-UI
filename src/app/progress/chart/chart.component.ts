import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { Label} from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ProgressService } from '../services/progress.service';
import { AvgMarkResponse } from '../../models/avg-mark-response';
import { StudentChartMarks } from '../../models/student-chart-marks';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  public chartWidth: string;
  private windowWidth: number;
  private onDestroy$ = new Subject();
  public chartLabels: Label[] = [''];
  public chartType: ChartType = 'bar';
  public chartLegend = true;
  public chartData: ChartDataSets[] = [{
    data: [],
    label: ''
  }];
  public chartOptions: ChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 12,
          maxTicksLimit: 24
        }
      }]
    }
  };
  constructor(private progressService: ProgressService) { }

  ngOnInit() {
    this.progressService.getSubjectChartData()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => this.createSubjectChart(result));
    this.progressService.getStudentChartData()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => this.createStudentChart(result));
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Method binds to window resize event to control chart size on different resolutions
   */
  @HostListener('window:resize') onResize() {
    this.windowWidth = window.innerWidth;
    this.chartWidth = this.chartLabels.length * 100 > this.windowWidth ?
      `${this.chartLabels.length * 100}px` :
      'auto';
  }

  /**
   * Method forms data for subject based chart
   * @param data - New chart data
   */
  private createSubjectChart(data: StudentChartMarks[]): void {
    this.chartLabels = [];
    this.chartData = [];
    const newData = [];
    data.forEach(student => {
      const marks = student.marks.map(markInfo => markInfo.mark);
      const marksInfo = {
        data: marks,
        label: `${student.studentInfo.firstname} ${student.studentInfo.lastname}`
      };
      newData.push(marksInfo);
    });
    this.chartLabels = data[0].marks.map(item => item.date);
    this.chartData = newData;
    this.onResize();
  }

  /**
   * Method forms data for student based chart
   * @param data - New chart data
   */
  private createStudentChart(data: AvgMarkResponse[]): void {
    this.chartLabels = [''];
    this.chartData = [];
    const newData = [];
    data.forEach(item => {
      const markInfo = {
        data: [item.avgMark],
        label: item.subjectName
      };
      newData.push(markInfo);
    });
    this.chartData = newData;
    this.onResize();
  }
}

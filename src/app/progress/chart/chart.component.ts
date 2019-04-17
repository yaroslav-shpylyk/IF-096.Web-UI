import { Component, OnInit, Input } from '@angular/core';
import { Label} from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
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
    this.progressService.getChartData().subscribe(result => {
      switch (result.markType) {
        case 'allOfSubject':
        case 'avgOfSubject': {
          this.createSubjectChart(result.data);
          break;
        }
        case 'avgOfStudent': {
          this.createStudentChart(result.data);
          break;
        }
      }
    });
  }

  /**
   * Method forms data for subject based chart
   * @param data - New chart data
   */
  private createSubjectChart(data: any): void {
    this.chartLabels = [];
    this.chartData = [];
    const newData = [];
    data.forEach(item => {
      const marks = item.marks.map(item => item.mark);
      const marksInfo = {
        data: marks,
        label: `${item.studentInfo.firstname} ${item.studentInfo.lastname}`
      };
      newData.push(marksInfo);
    });
    this.chartLabels = data[0].marks.map(item => item.date);
    this.chartData = newData;
  }

  /**
   * Method forms data for student based chart
   * @param data - New chart data
   */
  private createStudentChart(data: any): void {
    console.log(data);
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
  }
}

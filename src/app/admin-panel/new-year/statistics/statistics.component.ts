import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {MAT_DIALOG_DATA, MatTabChangeEvent} from '@angular/material';
import { ChartDataSets } from 'chart.js';
import { ClassData } from '../../../models/class-data';

export interface YearTotalCount {
  year: number;
  total: number;
  trend: number;
}

export interface TransitionData {
  year?: {
    enroll: number,
    graduated: number
    total: number,
    trend: number
  };
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any ) { }

  public transititionStatistic: any; //
  public activeTabIndex = 0;
  public displayedColumns: string[] = ['name', 'weight', 'trend']; //
  public tableData: YearTotalCount[] = [];

  public maxYNumber = 0;
  public minYNumber = 0;
  public lineChartData: ChartDataSets[] = [];
  public chartLabels: Array<string> = [];
  public lineChartType = 'bar';

  @ViewChild('content') content: ElementRef;
  @ViewChild('chart') chart: ElementRef;
  @ViewChild('totalCountTable') totalCountTable: ElementRef;

  public deltaChartOpt = {
    data: [],
    label: 'Дельта',
    type: 'line',
    fill: false,
    lineTension: 0,
    pointBackgroundColor: 'red',
    pointHitRadius: 6
  };

  public enrollChartOpt = {
    data: [],
    label: 'Поступило',
    backgroundColor: 'rgba(0, 255, 0, 0.8)'
  };

  public graduatedChartOpt = {
    data: [],
    label: 'Випуск',
    backgroundColor: 'rgba(255, 0, 0, 0.8)'
  };

  public lineChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
        ticks: { max : this.maxYNumber, min : this.minYNumber }
      }],
      xAxes: [
        {
          stacked: true,
          id: 'bar-x-axis1',
          categoryPercentage: 0.5,
        }
      ],
    },
  };



  ngOnInit() {
    this.transititionStatistic = this.getStatistic(this.data.allClasses);
    console.log(this.transititionStatistic);
    this.agregateStatisticData(this.transititionStatistic);
  }

  onTabClick(event: MatTabChangeEvent) {
    this.activeTabIndex = event.index;
  }

  getStatistic(allClasses: ClassData[]): TransitionData {
    const statistic: TransitionData = {};
    const curDate = new Date();
    const curYear = (curDate.getMonth() < 12 && curDate.getMonth() > 7) ? curDate.getFullYear() : curDate.getFullYear() - 1;
    allClasses.forEach(
      curClass => {
        if ( curYear - curClass.classYear < 6 && curYear > curClass.classYear) {
          const curClassYear = curClass.classYear;
          if (!(curClassYear in statistic)) {
            statistic[curClassYear] = { enroll: 0, graduated: 0, total: 0, trend: 0};
          }
          const classNameParts = curClass.className.split(/[-(]/);
          const curClassNumber = classNameParts.length > 2 ? curClass.className.split(/[-(]/)[1] : curClass.className.split(/[-(]/)[0];
          if ( +curClassNumber === 1 ) { statistic[curClassYear].enroll += curClass.numOfStudents; }
          if ( +curClassNumber === 11 ) { statistic[curClassYear].graduated += curClass.numOfStudents; }
          statistic[curClassYear].total += curClass.numOfStudents;
          if ( (curClassYear - 1) in statistic ) {
            statistic[curClassYear].trend = statistic[curClassYear].total - statistic[curClassYear - 1].total;
          } else {
            statistic[curClassYear].trend = statistic[curClassYear].total;
          }
          if ( (curClassYear + 1) in statistic ) {
            statistic[curClassYear + 1].trend = statistic[curClassYear + 1].total - statistic[curClassYear].total;
          }
        }
        }
    );
    return statistic;
  }

  agregateStatisticData(transititionStatistic: TransitionData): void {
    const enrollData = [];
    const graduatedData = [];
    const deltaData = [];

    for (const key in transititionStatistic) {
      if (transititionStatistic.hasOwnProperty(key)) {
        this.chartLabels.push(key);
        this.maxYNumber = Math.max (this.maxYNumber, transititionStatistic[key].enroll, transititionStatistic[key].graduated);
        this.minYNumber = Math.min (this.minYNumber, transititionStatistic[key].enroll - transititionStatistic[key].graduated);
        enrollData.push(transititionStatistic[key].enroll);
        graduatedData.push(transititionStatistic[key].graduated);
        deltaData.push(transititionStatistic[key].enroll - transititionStatistic[key].graduated);
        const curYearStats = transititionStatistic[key];
        this.tableData.push({year: +key, total: curYearStats.total, trend: curYearStats.trend});
      }
    }

    this.deltaChartOpt.data = deltaData;
    this.enrollChartOpt.data = enrollData;
    this.graduatedChartOpt.data = graduatedData;

    this.lineChartOptions.scales.yAxes[0].ticks.max = this.maxYNumber + 1;
    this.lineChartOptions.scales.yAxes[0].ticks.min = this.minYNumber - 1;

    this.lineChartData.push(this.deltaChartOpt);
    this.lineChartData.push(this.enrollChartOpt);
    this.lineChartData.push(this.graduatedChartOpt);
  }

}

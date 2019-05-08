import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatTabChangeEvent} from '@angular/material';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { ClassData } from '../../../models/class-data';

export interface YearTotalCount {
  year: number;
  total: number;
  trend: number;
}

export interface TransitionStatisticData {
  year?: {
    enroll: number,
    graduated: number
    total: number,
    trend?: number
  };
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any ) { }

  public transititionStatistic: TransitionStatisticData;
  public displayedColumns: string[] = ['year', 'total', 'trend'];
  public tableData: YearTotalCount[] = [];
  public chartData: ChartDataSets[] = [];
  public chartLabels: string[] = [];
  public chartType: ChartType = 'bar';
  public maxYNumber = 0;
  public minYNumber = 0;

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

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
    this.agregateStatisticData(this.transititionStatistic);
  }

  /**
   * Method return statistc data of pupils count grouped by the years
   * @param allClasses ClassData[] - Array of objects with data about classes
   * @returns TransitionStatisticData - object that contains data grouped by the years (enroll, graduated, total counts and trend)
   */
  getStatistic(allClasses: ClassData[]): TransitionStatisticData {
    const statistic: TransitionStatisticData = {};
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
          }
          if ( (curClassYear + 1) in statistic ) {
            statistic[curClassYear + 1].trend = statistic[curClassYear + 1].total - statistic[curClassYear].total;
          }
        }
        }
    );
    return statistic;
  }

  /**
   * Method agregate statistic data into charts data and summary table data
   * @param transititionStatistic - object that contains data grouped by the years (enroll, graduated, total counts and trend)
   */
  agregateStatisticData(transititionStatistic: TransitionStatisticData): void {
    const enrollData = [];
    const graduatedData = [];
    const deltaData = [];

    for (const year in transititionStatistic) {
      if (transititionStatistic.hasOwnProperty(year)) {
        this.chartLabels.push(year);
        this.maxYNumber = Math.max (this.maxYNumber, transititionStatistic[year].enroll, transititionStatistic[year].graduated);
        this.minYNumber = Math.min (this.minYNumber, transititionStatistic[year].enroll - transititionStatistic[year].graduated);
        enrollData.push(transititionStatistic[year].enroll);
        graduatedData.push(transititionStatistic[year].graduated);
        deltaData.push(transititionStatistic[year].enroll - transititionStatistic[year].graduated);
        const curYearStats = transititionStatistic[year];
        this.tableData.push({year: +year, total: curYearStats.total, trend: curYearStats.trend});
      }
    }

    this.deltaChartOpt.data = deltaData;
    this.enrollChartOpt.data = enrollData;
    this.graduatedChartOpt.data = graduatedData;

    this.chartOptions.scales.yAxes[0].ticks.max = this.maxYNumber + 1;
    this.chartOptions.scales.yAxes[0].ticks.min = this.minYNumber - 1;

    this.chartData.push(this.deltaChartOpt);
    this.chartData.push(this.enrollChartOpt);
    this.chartData.push(this.graduatedChartOpt);
  }

}

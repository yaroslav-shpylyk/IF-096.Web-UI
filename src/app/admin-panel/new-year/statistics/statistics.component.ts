import { Component, OnInit, Inject, ElementRef, ViewChild, Renderer2  } from '@angular/core';
import {MAT_DIALOG_DATA, MatTabChangeEvent, MatDialogRef} from '@angular/material';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { ClassData } from '../../../models/class-data';
import {PdfGeneratorService} from '../../../services/pdf-generator.service';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StatisticsComponent>,
    private pdfGenerator: PdfGeneratorService,
    private renderer: Renderer2
  ) { }

  public transititionStatistic: TransitionStatisticData;
  public displayedColumns: string[] = ['year', 'total', 'trend'];
  public tableData: YearTotalCount[] = [];
  public chartData: ChartDataSets[] = [];
  public chartLabels: string[] = [];
  public chartType: ChartType = 'bar';
  public maxYNumber = 0;
  public minYNumber = 0;
  public activeTab = 0;
  public showPdfTip = false;
  @ViewChild('chartWrap') chartWrap: ElementRef;
  @ViewChild('chart') chart: ElementRef;
  @ViewChild('tableWrap', {read: ElementRef}) tableWrap: ElementRef;
  @ViewChild('totalCountTable', {read: ElementRef}) totalCountTable: ElementRef;

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

  onTabClick(event: MatTabChangeEvent) {
    this.activeTab = event.index;
  }

  /**
   * Method that start pdf creating procces based on content of active tab
   */
  public downloadPDF(): void {
    const pdfTableData = [];
    this.tableData.forEach( row => {
      const rowData = [];
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          rowData.push(row[key]);
        }
      }
      pdfTableData.push(rowData);
    });
    let htmlWrap: ElementRef;
    let htmlContent: ElementRef;
    this.showPreloader();
    if (this.activeTab === 0) {
      htmlContent = this.chart;
      htmlWrap = this.chartWrap;
      this.reziseWrap(htmlWrap, 'l');
      this.generatePdf(htmlContent, htmlWrap, 'l', 'Рух учнів');
    } else {
      this.pdfGenerator.pdfFromTable(['Рік', 'Кількість', 'Тенденція'], pdfTableData, 'p', 'Наповнюваність', 20);
    }
  }

  /**
   * Method resizes container with html content for increasing quality of image in pdf
   * @param contentWrap - element that contain html, that will be included to pdf
   * @param orientation - page orientation
   */
  public reziseWrap(contentWrap: ElementRef, orientation: 'p'|'l'): void {
    switch (orientation) {
      case 'l':
        this.renderer.setStyle(contentWrap.nativeElement, 'width', `800px`);
        this.renderer.setStyle(contentWrap.nativeElement, 'height', `500px`);
        break;
      case 'p':
      default:
        this.renderer.setStyle(contentWrap.nativeElement, 'width', '500px');
        this.renderer.setStyle(contentWrap.nativeElement, 'height', '800px');
        break;
    }
  }

  /**
   * Shows overlay window during wrapper resizing
   */
  public showPreloader(): void {
    this.dialogRef.addPanelClass('hidden');
    this.showPdfTip = true;
    setTimeout( () => {
      this.showPdfTip = false;
      this.dialogRef.removePanelClass('hidden');
    }, 1000);
  }

  /**
   * Start generating pdf document and hide overlay window
   * @param contentElem - element that contain html, that will be included to pdf
   * @param wrap - container thaht wrap contentElem
   * @param orientation - page orientation
   * @param width - current width of contentWrap
   * @param height - current height of contentWrap
   * @param title - title of document
   */
  public generatePdf(contentElem: ElementRef, wrap: ElementRef, orientation: 'p'|'l', title: string): void {
    const normalWidth = contentElem.nativeElement.offsetWidth;
    const normalHeight = wrap.nativeElement.offsetHeight;
    let newWidth: number;
    let newHeight: number;
    if (orientation === 'l') {
      newWidth = 800;
      newHeight = 500;
    } else {
      newWidth = 500;
      newHeight = 800;
    }
    setTimeout(() => {
      this.pdfGenerator.pdfFromCanvas(contentElem, orientation, title, newWidth, newHeight);
      wrap.nativeElement.style.width = `${normalWidth}px`;
      wrap.nativeElement.style.height = `${normalHeight}px`;
    }, 1000);
  }
}

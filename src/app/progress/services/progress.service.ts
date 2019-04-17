import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private chartData: BehaviorSubject<{data: any, markType: string}> = new BehaviorSubject({data: [], markType: ''});
  constructor() { }
  public getChartData(): any {
    return this.chartData;
  }
  public updateChartData(data): any {
    this.chartData.next(data);
  }
}

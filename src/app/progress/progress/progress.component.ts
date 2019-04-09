import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { SubjectData } from '../../models/subject-data';
import { ClassService } from '../../services/class.service';
import { ClassData } from '../../models/class-data';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { MarkService } from '../../services/mark.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  public chartOptions: FormGroup;
  public subjects: SubjectData[];
  public classes: ClassData[];
  public students: Student[];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  constructor(private subjectService: SubjectService, private classService: ClassService,
              private studentService: StudentsService, private markService: MarkService) { }

  ngOnInit() {
    this.createForm();
    this.subjectService.getSubjects().subscribe(result => this.subjects = result);
    this.classService.getClasses('active').subscribe(result => this.classes = result);
    this.markService.getMarks().subscribe(result => console.log(result));
    this.chartOptions.statusChanges.subscribe(result => {
      if (result === 'VALID') {
        const {subjectId, classId, studentId, periodStart, periodEnd} = this.chartOptions.value;
        const options = {
          subject_id: subjectId,
          student_id: studentId,
          class_id: classId,
          period_start: this.formatDate(periodStart),
          period_end: this.formatDate(periodEnd)
        };
        this.markService.getProgressMarks(options)
          .subscribe(result => console.log(result));
      }
    });
  }
  private createForm(): void {
    this.chartOptions = new FormGroup({
      subjectId: new FormControl('', [
        Validators.required
      ]),
      classId: new FormControl('', [
        Validators.required
      ]),
      studentId: new FormControl(''),
      periodStart: new FormControl('', [
        Validators.required
      ]),
      periodEnd: new FormControl('', [
        Validators.required
      ]),
    });
  }
  public chartOptionChange(fieldName: string, event) {
    switch (fieldName) {
      case 'subjects': {
        this.classService.getClasses('active', event.value).subscribe(result => this.classes = result);
        break;
      }
      case 'classes': {
        this.subjectService.getSubjects(event.value).subscribe(result => this.subjects = result);
        this.studentService.getStudents(event.value).subscribe(result => this.students = result);
        break;
      }
      case 'startDate': {
        const formatedDate = this.formatDate(event.value);
        console.log(formatedDate);
        break;
      }
      case 'endDate': {
        const formatedDate = this.formatDate(event.value);
        console.log(formatedDate);
        break;
      }
    }
  }
  private formatDate(date: any): any {
    return date.toISOString().slice(0, 10);
  }
}

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
import { MarkData } from '../../models/mark-data';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  public chartOptionsForm: FormGroup;
  public subjects: SubjectData[];
  public classes: ClassData[];
  public students: Student[];
  public chartOptions: ChartOptions = {
    responsive: true,
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
  public chartLabels: Label[] = [''];
  public chartType: ChartType = 'bar';
  public chartLegend = true;
  public chartData: ChartDataSets[] = [{
    data: [],
    label: ''
  }];
  constructor(private subjectService: SubjectService, private classService: ClassService,
              private studentService: StudentsService, private progressService: ProgressService) { }

  ngOnInit() {
    this.createForm();
    this.subjectService.getSubjects().subscribe(result => this.subjects = result);
    this.classService.getClasses('active').subscribe(result => this.classes = result);
    this.chartOptionsForm.statusChanges.subscribe(result => {
      if (result === 'VALID' && this.chartOptionsForm.touched) {
        console.log('works');
        const {subjectId, classId, studentId, periodStart, periodEnd} = this.chartOptionsForm.value;
        const options = {
          subject_id: subjectId,
          student_id: studentId.length ? studentId : this.students.map(item => item.id),
          class_id: classId,
          period_start: this.formatDate(periodStart),
          period_end: this.formatDate(periodEnd)
        };
        const studentsInfo = this.formStudentsInfo(studentId, this.students);
        if (!studentsInfo.length) {
          return;
        }
        this.progressService.getProgressMarks(options, studentsInfo).subscribe(result => {
          this.updateChart(result);
        });
      }
    });
  }
  private createForm(): void {
    this.chartOptionsForm = new FormGroup({
      subjectId: new FormControl('', [
        Validators.required
      ]),
      classId: new FormControl('', [
        Validators.required
      ]),
      studentId: new FormControl([]),
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
        this.students = [];
        this.subjectService.getSubjects(event.value).subscribe(result => this.subjects = result);
        this.studentService.getStudents(event.value).subscribe(result => this.students = result);
        break;
      }
    }
  }
  private formatDate(date: any): string {
    return date.toISOString().slice(0, 10);
  }
  private updateChart(data: any): void {
    this.chartLabels = [];
    this.chartData = [];
    const newData = [];
    console.log(data);
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
  private formStudentsInfo(studentsId: number[], allStudents: Student[]): Student[] {
    let studentsInfo = [];
    if (studentsId.length > 0) {
      studentsId.forEach(id => {
        allStudents.forEach(student => {
          if (student.id === id) {
            studentsInfo.push(student);
          }
        });
      });
    } else {
      studentsInfo = allStudents;
    }
    return studentsInfo;
  }
}

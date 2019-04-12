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
  public streams = new Array(12);
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
    this.chartOptionsForm.statusChanges.subscribe(result => {
      if (result === 'VALID' && this.chartOptionsForm.touched) {
        const {subjectId, classId, studentId, periodStart, periodEnd} = this.chartOptionsForm.value;
        const options = {
          subject_id: subjectId,
          student_id: studentId.length ? studentId : this.students.map(item => item.id),
          class_id: classId,
          period_start: this.formatDate(periodStart),
          period_end: this.formatDate(periodEnd)
        };
        const studentsInfo = this.formStudentsInfo(studentId, this.students);
        this.progressService.getProgressMarks(options, studentsInfo).subscribe(result => {
          this.updateChart(result);
        });
      }
    });
  }

  /**
   * Method creates form for chart options
   */
  private createForm(): void {
    this.chartOptionsForm = new FormGroup({
      streamId: new FormControl('', [
        Validators.required
      ]),
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
  public checkFieldValue(field: string): boolean {
    return Boolean(this.chartOptionsForm.controls[field].value);
  }

  /**
   * Method fires then something in form changes
   * @param fieldName - Name of form input
   * @param event - Variable of event
   */
  public chartOptionChange(fieldName: string, event) {
    console.log(this.chartOptionsForm.value.streamId > 0);
    switch (fieldName) {
      case 'stream': {
        console.log(this.chartOptionsForm.controls.streamId.value);
        this.progressService.getClassesByStream(7).subscribe(result => {
          console.log(result);
          this.classes = result;
        });
        break;
      }
      case 'classes': {
        this.subjects = [];
        this.students = [];
        this.subjectService.getSubjects(event.value).subscribe(result => this.subjects = result);
        this.studentService.getStudents(event.value).subscribe(result => this.students = result);
        break;
      }
    }
  }

  /**
   * Method format date to yyyy-mm-dd
   * @param date - Date in common form
   * @returns - String with formatted date
   */
  private formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  /**
   * Method updates data in chart
   * @param data - New chart data
   */
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

  /**
   * Method gets students info about requested students
   * @param studentsId - Request id's of students
   * @param allStudents - Student info per each student
   * @returns - Info of filtered students
   */
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

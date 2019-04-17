import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { SubjectData } from '../../models/subject-data';
import { ClassService } from '../../services/class.service';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student';
import { ClassesFromStream } from '../../models/classes-from-stream';
import { MarkService } from '../../services/mark.service';
import { MarkRequestOptions } from '../../models/mark-request-options';
import { ProgressService } from '../services/progress.service';
import { DateValidator } from '../validators/date.validator';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  public chartOptionsForm: FormGroup;
  public stream = new Array(12);
  public subjects: SubjectData[] = [];
  public classes: ClassesFromStream[] = [];
  public students: Student[] = [];
  public markTypes = {
    allOfSubject: 'По предмету',
    avgOfSubject: 'Середня по предмету',
    avgOfStudent: 'Всі середні учня'
  };
  private markType = '';
  public periodError = false;
  constructor(private subjectService: SubjectService, private classService: ClassService,
              private studentService: StudentsService, private markService: MarkService,
              private progressService: ProgressService) { }

  ngOnInit() {
    this.createChartOptions();
    this.chartOptionsForm.valueChanges.subscribe(result => {
      this.periodError = this.chartOptionsForm.hasError('periodError');
      }
    );
  }

  /**
   * Method creates form for chart options
   */
  private createChartOptions(): void {
    this.chartOptionsForm = new FormGroup({
      streamId: new FormControl(null, Validators.required),
      classId: new FormControl(null, Validators.required),
      subjectId: new FormControl(null, Validators.required),
      markType: new FormControl('allOfSubject', Validators.required),
      studentId: new FormControl([]),
      periodStart: new FormControl(null, Validators.required),
      periodEnd: new FormControl(null, Validators.required)
    },
      DateValidator
    );
  }

  /**
   * Method changes stream in chart settings
   * @param event - Variable of change event
   */
  public streamChange(event): void {
    this.subjects = [];
    this.students = [];
    this.classService.getClassesByStream(event.value).subscribe(result => this.classes = result.studentsData);
  }

  /**
   * Method changes stream in chart settings
   * @param event - Variable of change event
   */
  public classesChange(event): void {
    this.students = [];
    this.subjectService.getSubjects(event.value).subscribe(result => this.subjects = result);
    this.studentService.getStudents(event.value).subscribe(result => this.students = result);
  }

  /**
   * Method changes stream in chart settings
   * @param event - Variable of change event
   * @param type - Type of mark
   */
  public markTypeChange(event, type: string): void {
    this.chartOptionsForm.patchValue({
      studentId: [],
      subjectId: []
    });
    this.markType = type;
    switch (type) {
      case 'allOfSubject':
      case 'avgOfSubject': {
        this.chartOptionsForm.controls.subjectId.setValidators([Validators.required]);
        this.chartOptionsForm.controls.studentId.clearValidators();
        break;
      }
      case 'avgOfStudent': {
        this.chartOptionsForm.controls.subjectId.clearValidators();
        this.chartOptionsForm.controls.studentId.setValidators([Validators.required]);
        break;
      }
    }
    this.chartOptionsForm.controls.subjectId.markAsUntouched();
    this.chartOptionsForm.controls.subjectId.markAsUntouched();
    this.chartOptionsForm.controls.subjectId.updateValueAndValidity();
    this.chartOptionsForm.controls.studentId.updateValueAndValidity();
    this.chartOptionsForm.markAsUntouched();
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

  /**
   * Method gets data for chart
   */
  public getDataForChart(): void {
    if (!this.chartOptionsForm.valid) {
      const controlsKeys = Object.keys(this.chartOptionsForm.controls);
      controlsKeys.forEach(item => this.chartOptionsForm.controls[`${item}`].markAsTouched());
      return;
    }
    const {subjectId, classId, studentId, markType, periodStart, periodEnd} = this.chartOptionsForm.value;
    const options: MarkRequestOptions = {
      student_id: studentId.length ? studentId : this.students.map(item => item.id),
      period_start: this.formatDate(periodStart),
      period_end: this.formatDate(periodEnd)
    };
    const studentsInfo = this.formStudentsInfo(studentId, this.students);
    switch (markType) {
      case 'allOfSubject': {
        options.subject_id = subjectId;
        options.class_id = classId;
        this.markService.getProgressMarks(options, studentsInfo).subscribe(result => {
          this.progressService.updateChartData({
            data: result,
            markType: this.chartOptionsForm.controls.markType.value
          });
        });
        break;
      }
      case 'avgOfSubject': {
        const subjectName: SubjectData[] = this.subjects.filter(item => item.subjectId === subjectId);
        this.markService.getAvgProgressMarks(options, subjectName, studentsInfo).subscribe(result => {
          this.progressService.updateChartData({
            data: result,
            markType: this.chartOptionsForm.controls.markType.value
          });
        });
        break;
      }
      case 'avgOfStudent': {
        this.markService.getAvgStudentProgressMarks(options).subscribe(result => {
          this.progressService.updateChartData({
            data: result,
            markType: this.chartOptionsForm.controls.markType.value
          });
        });
        break;
      }
    }
  }

  /**
   * Method resets form
   */
  public resetChartOptions(): void {
    const controlKeys = Object.keys(this.chartOptionsForm.controls);
    controlKeys.forEach(item => {
      if (item !== 'markType') {
        this.chartOptionsForm.controls[item].reset();
      }
    });
    this.subjects = [];
    this.classes = [];
    this.students = [];
  }
}

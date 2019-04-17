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
  constructor(private subjectService: SubjectService, private classService: ClassService,
              private studentService: StudentsService, private markService: MarkService,
              private progressService: ProgressService) { }

  ngOnInit() {
    this.createChartOptions();
    const controls = this.chartOptionsForm.controls;
    this.chartOptionsForm.valueChanges.subscribe(() => {
        if (this.chartOptionsForm.hasError('periodError')) {
          controls.periodStart.setErrors({
            period: true
          });
          console.log(controls.periodStart.errors);
        } else {
          if (controls.periodStart.hasError('period')) {
            let errors = controls.periodStart.errors;
            delete errors.period;
            errors = Object.keys.length ? errors : null;
            controls.periodStart.setErrors(errors);
            controls.periodStart.updateValueAndValidity();
          }
        }
      }
    );
    controls.streamId.valueChanges.subscribe( result => {
      if (result !== null) {
        controls.classId.enable();
      } else {
        controls.classId.disable();
      }
    });
    controls.classId.valueChanges.subscribe( result => {
      if (result !== null) {
        controls.subjectId.enable();
        controls.studentId.enable();
      } else {
        controls.subjectId.disable();
        controls.studentId.disable();
      }
    });
    controls.markType.valueChanges.subscribe(result => {
      if (result === 'avgOfStudent') {
        controls.subjectId.disable();
      } else {
        controls.subjectId.enable();
      }
    });
  }

  /**
   * Method creates form for chart options
   */
  private createChartOptions(): void {
    this.chartOptionsForm = new FormGroup({
      streamId: new FormControl(null, Validators.required),
      classId: new FormControl({ value: null, disabled: true }, Validators.required),
      subjectId: new FormControl({ value: null, disabled: true }, Validators.required),
      markType: new FormControl('allOfSubject', Validators.required),
      studentId: new FormControl({ value: [], disabled: true }),
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
    switch (type) {
      case 'allOfSubject':
      case 'avgOfSubject': {
        this.chartOptionsForm.controls.subjectId.setValidators([Validators.required]);
        this.chartOptionsForm.controls.studentId.clearValidators();
        break;
      }
      case 'avgOfStudent': {
        this.chartOptionsForm.controls.studentId.setValidators([Validators.required]);
        this.chartOptionsForm.controls.subjectId.clearValidators();
        break;
      }
    }
    this.chartOptionsForm.controls.subjectId.markAsUntouched();
    this.chartOptionsForm.controls.studentId.markAsUntouched();
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
   * Method calls data for chart
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
          this.progressService.updateSubjectChartData(result);
        });
        break;
      }
      case 'avgOfSubject': {
        const subjectName: SubjectData[] = this.subjects.filter(item => item.subjectId === subjectId);
        this.markService.getAvgProgressMarks(options, subjectName, studentsInfo).subscribe(result => {
          this.progressService.updateSubjectChartData(result);
        });
        break;
      }
      case 'avgOfStudent': {
        this.markService.getAvgMarks(options).subscribe(result => {
          this.progressService.updateStudentChartData(result);
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

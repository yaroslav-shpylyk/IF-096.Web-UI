import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { SubjectData } from '../../models/subject-data';
import { ClassService } from '../../services/class.service';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student';
import { MarkService } from '../../services/mark.service';
import { MarkRequestOptions } from '../../models/mark-request-options';
import { ProgressService } from '../services/progress.service';
import { DateValidator } from '../validators/date.validator';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { ClassFromStream } from '../../models/class-from-stream';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})

export class ProgressComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();
  public chartOptionsForm: FormGroup;
  public stream = new Array(12);
  public subjects: SubjectData[] = [];
  public classes: ClassFromStream[] = [];
  public students: Student[] = [];
  public markTypes = {
    allOfSubject: 'По предмету',
    avgOfSubject: 'Середня по предмету',
    avgOfStudent: 'Всі середні учня'
  };
  public multipleSelect = false;
  private studentPhrase$ = new BehaviorSubject<string>('');
  private subjectPhrase$ = new BehaviorSubject<string>('');
  public sortedSubjects$: Observable<SubjectData[]> = this.subjectPhrase$
    .pipe(
      debounceTime(500),
      map(result => {
        return this.subjects.filter(subject => subject.subjectName.includes(result));
      })
    );
  public sortedStudents$: Observable<Student[]> = this.studentPhrase$
    .pipe(
      debounceTime(500),
      map(result => {
        return this.students.filter(student => `${student.firstname} ${student.lastname}`.includes(result));
      })
    );
  constructor(private subjectService: SubjectService, private classService: ClassService,
              private studentService: StudentsService, private markService: MarkService,
              private progressService: ProgressService) { }

  ngOnInit() {
    this.createChartOptions();
    const controls = this.chartOptionsForm.controls;
    this.chartOptionsForm.valueChanges
      .pipe( takeUntil(this.onDestroy$) )
      .subscribe(() => this.formChange(controls));
    controls.streamId.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( result => this.streamChange(result, controls));
    controls.classId.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( result => this.classChange(result, controls));
    controls.markType.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => this.markTypeChange(result, controls));
    controls.subjectId.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => this.subjectChange(result, controls));
    controls.studentId.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => this.studentChange(result, controls));
    controls.subjectAutoComplete.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => this.subjectAutoCompleteChange(result, controls));
    controls.studentAutoComplete.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => this.studentAutoCompleteChange(result, controls));
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Method creates form for chart options
   */
  private createChartOptions(): void {
    this.chartOptionsForm = new FormGroup({
      streamId: new FormControl(null, Validators.required),
      classId: new FormControl({ value: null, disabled: true }, Validators.required),
      subjectId: new FormControl({ value: null, disabled: true }, Validators.required),
      markType: new FormControl({ value: 'allOfSubject', disabled: true }, Validators.required),
      studentId: new FormControl({ value: [], disabled: true }),
      periodStart: new FormControl(null, Validators.required),
      periodEnd: new FormControl(null, Validators.required),
      subjectAutoComplete: new FormControl(''),
      studentAutoComplete: new FormControl(''),
    },
      DateValidator
    );
  }

  /**
   * Method checks if form changed
   * @param controls - Object with controls
   */
  private formChange(controls): void {
    if (this.chartOptionsForm.hasError('periodError')) {
      controls.periodStart.setErrors({
        periodError: true
      });
    } else {
      if (controls.periodStart.hasError('periodError')) {
        let errors = controls.periodStart.errors;
        delete errors.period;
        errors = Object.keys.length ? errors : null;
        controls.periodStart.setErrors(errors);
        controls.periodStart.updateValueAndValidity();
      }
    }
  }

  /**
   * Method checks if stream changed
   * @param result - Value of form control
   * @param controls - Object with controls
   */
  private streamChange(result, controls): void {
    if (result !== null) {
      this.subjects = [];
      this.students = [];
      this.classService.getClassesByStream(result).subscribe(response => {
        this.classes = response.studentsData;
      });
      controls.classId.enable();
      controls.classId.markAsUntouched();
      controls.classId.setValidators([Validators.required]);
      controls.classId.updateValueAndValidity();
      controls.subjectId.disable();
      controls.studentId.disable();
      controls.markType.disable();
    } else {
      controls.classId.disable();
    }
  }

  /**
   * Method checks if class changed
   * @param result - Value of form control
   * @param controls - Object with controls
   */
  private classChange(result, controls): void {
    if (result !== null) {
      this.students = [];
      this.subjectService.getSubjects(result).subscribe(response => {
        this.subjects = response;
        this.subjectPhrase$.next('');
      });
      this.studentService.getStudents(result).subscribe(response => {
        this.students = response;
        this.studentPhrase$.next('');
      });
      controls.subjectId.enable();
      controls.studentId.enable();
      controls.markType.enable();
    } else {
      controls.subjectId.disable();
      controls.studentId.disable();
      controls.markType.disable();
    }
  }

  /**
   * Method checks if mark type changed
   * @param result - Value of form control
   * @param controls - Object with controls
   */
  public markTypeChange(result, controls): void {
    this.chartOptionsForm.patchValue({
      studentId: [],
      subjectId: []
    });
    switch (result) {
      case 'allOfSubject':
      case 'avgOfSubject': {
        if (!controls.markType.disabled) {
          controls.subjectId.setValidators([Validators.required]);
          controls.studentId.clearValidators();
          controls.subjectId.enable();
          this.multipleSelect = false;
        }
        break;
      }
      case 'avgOfStudent': {
        controls.studentId.setValidators([Validators.required]);
        controls.subjectId.clearValidators();
        this.multipleSelect = true;
        controls.subjectId.disable();
        break;
      }
    }
    controls.subjectId.markAsUntouched();
    controls.studentId.markAsUntouched();
    controls.subjectId.updateValueAndValidity();
    controls.studentId.updateValueAndValidity();
    this.chartOptionsForm.markAsUntouched();
  }

  /**
   * Method checks if subject changed
   * @param result - Value of form control
   * @param controls - Object with controls
   */
  private subjectChange(result, controls): void {
    if (result !== null) {
      controls.subjectAutoComplete.setValue('');
      this.subjectPhrase$.next('');
    }
  }

  /**
   * Method checks if student changed
   * @param result - Value of form control
   * @param controls - Object with controls
   */
  private studentChange(result, controls): void {
    if (result !== null) {
    }
  }

  /**
   * Method checks if subject auto complete changed
   * @param result - Value of form control
   * @param controls - Object with controls
   */
  private subjectAutoCompleteChange(result, controls): void {
    this.subjectPhrase$.next(result);
  }

  /**
   * Method checks if student auto complete changed
   * @param result - Value of form control
   * @param controls - Object with controls
   */
  private studentAutoCompleteChange(result, controls): void {
    this.studentPhrase$.next(result);
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
        options.student_id = studentId;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { JournalsStorageService } from '../../../../services/journals-storage.service';
import { Journal } from '../../../../models/journal-data';
import { ActivatedRoute, Params } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { BottomSheetOverviewSheetComponent } from './bottom-sheet-overview.components';
import { HomeworkBottomSheetOverviewSheetComponent } from './homework-bottom-sheet-overview.components';
import * as _ from 'lodash';
import { ClassService } from '../../../../services/class.service';
import { ClassData } from '../../../../models/class-data';
import { SubjectData } from '../../../../models/subject-data';
import { SubjectService } from '../../../../services/subject.service';

@Component({
  selector: 'app-subject-journal',
  templateUrl: './subject-journal.component.html',
  styleUrls: ['./subject-journal.component.scss']
})
export class SubjectJournalComponent implements OnInit, OnDestroy {
  journal: Journal[];
  dataSource: any[];
  thRow: string[];
  idSubject: number;
  idClass: number;
  displayedColumns: string[];
  studentIds: number[];
  elData: any[];
  private loadingSub: Subscription;
  isLoading = false;
  homeworks: { [k: string]: any } = {};
  lessonsIds: string[];
  currentClass$: Observable<ClassData>;
  currentSubject$: Observable<SubjectData>;

  constructor(
    private journalsStorageService: JournalsStorageService,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private classService: ClassService,
    private subjectService: SubjectService
  ) {}

  /**
   * Method fetches from route params subject and class ids,
   * initialize table rendering and starts spinner while it's loading.
   */
  ngOnInit() {
    this.loadingSub = this.journalsStorageService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );

    this.route.params.subscribe((params: Params) => {
      this.idSubject = +params.subId;
      this.idClass = +params.classId;
      this.initialiseState();
      this.currentClass$ = this.classService.getClass(this.idClass);
      this.currentSubject$ = this.subjectService.getSubject(this.idSubject);
      this.renderTable();
    });
  }

  /**
   * Method fetches a journal by available subject id and class id,
   * makes manipulations with received data in order to fit the table
   * and creates the journal table itself.
   */
  renderTable() {
    this.journalsStorageService
      .getJournalsAndHomeworks(this.idSubject, this.idClass)
      .subscribe(journal => {
        if (!journal.journals.length) {
          this.journalsStorageService.loadingStateChanged.next(false);
          return;
        }
        this.homeworks = journal.homeworks;
        for (const lesson of journal.journals[0].marks) {
          this.lessonsIds.push(lesson.idLesson + '');
        }
        this.lessonsIds.unshift('studentFullName');
        this.lessonsIds.push('star');
        let studentData = new Object() as any;
        for (const student of journal.journals) {
          studentData.studentFullName = student.studentFullName;
          this.studentIds.push(student.idStudent);
          for (const mark of student.marks) {
            studentData[mark.idLesson] = mark.mark;
            if (this.thRow.length <= student.marks.length) {
              this.thRow.push(
                `${mark.typeMark}\n` +
                  mark.dateMark
                    .split('.')
                    .slice(1)
                    .reverse()
                    .join('.')
              );
            }
          }
          this.elData.push(studentData);
          studentData = {};
        }
        this.dataSource = this.elData;
        this.displayedColumns = this.lessonsIds;
        this.journal = journal.journals;
        this.journalsStorageService.loadingStateChanged.next(false);
      });
  }

  /**
   * Method receives from the table all needed values for assigning a
   * homework, changes clicked header cell style and passes to the
   * homework bottom sheet component needed data.
   * Om closing bottom sheet the table's cell style is changed backed to default.
   * @param idLesson - id number of the lesson;
   * @param event - object representing a click event;
   * @param i - index of column in a row;
   */
  onHeadClc(
    idLesson: number,
    event: {
      target: { innerText: string; style: any };
      path: { style: any }[];
      srcElement: { innerText: { split: (arg0: string) => any[] } };
    },
    i: number
  ) {
    if (!i || i === this.thRow.length) {
      return;
    }
    let styleRef: { boxShadow: string };
    if (event.target.innerText === 'attach_file') {
      styleRef = event.path[1].style;
    } else {
      styleRef = event.target.style;
    }
    styleRef.boxShadow = 'inset 0px 0px 0px 3px rgb(21, 101, 192)';
    const bottomSheetRef = this.bottomSheet.open(
      HomeworkBottomSheetOverviewSheetComponent,
      {
        data: {
          lessonId: idLesson,
          homeworks: this.homeworks,
          markType: event.srcElement.innerText.split('\n')[0]
        },
        panelClass: 'sbj-jrnl-cmp-bottom-container'
      }
    );

    bottomSheetRef.afterDismissed().subscribe(() => {
      styleRef.boxShadow = '';
    });
  }

  /**
   * Method receives from the table all needed values for assigning a mark,
   * appropriately transforms them, changes clicked cell and row color
   * and passes to the bottom sheet component needed data.
   * Om closing bottom sheet the table's cell and row colors are changed to the ddfault.
   * @param idLesson - id number of the lesson;
   * @param studentEl - object representing student;
   * @param event - object representing a click event;
   * @param i - index of column in a row;
   */
  onClc(
    idLesson: string | number,
    studentEl: any,
    event: {
      target: { style: { backgroundColor: string } };
      path: { style: { backgroundColor: string } }[];
    },
    i: any
  ) {
    if (!Number.isInteger(+idLesson)) {
      return;
    }
    event.target.style.backgroundColor = 'rgba(24, 236, 119, 0.432)';
    event.path[1].style.backgroundColor = 'rgba(24, 151, 236, 0.432)';
    const bottomSheetRef = this.bottomSheet.open(
      BottomSheetOverviewSheetComponent,
      {
        data: {
          lessonId: +idLesson,
          student: studentEl,
          elData: this.elData,
          id: i,
          journal: this.journal
        },
        panelClass: 'sbj-jrnl-cmp-bottom-container'
      }
    );

    bottomSheetRef.afterDismissed().subscribe(() => {
      event.target.style.backgroundColor = '';
      event.path[1].style.backgroundColor = '';
    });
  }

  /**
   * Method receives an array of all student marks and calculates the avarage.
   * @returns - avarage mark;
   */
  average(marks: number[]) {
    let res = 0;
    let counter = 0;
    for (const key in marks) {
      if (Number.isInteger(marks[key])) {
        res += marks[key];
        counter++;
      }
    }
    return res ? Math.round((res / counter) * 10) / 10 : '';
  }

  /**
   * Method initialize default values for table
   * data source beforethe journal can be created.
   */
  initialiseState() {
    this.thRow = ['Учень'];
    this.displayedColumns = [];
    this.studentIds = [];
    this.elData = [];
    this.dataSource = [];
    this.lessonsIds = [];
  }

  /**
   * Method turns off the spinner.
   */
  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}

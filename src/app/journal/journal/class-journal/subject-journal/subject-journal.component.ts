import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { JournalsStorageService } from 'src/app/services/journals-storage.service';
import { Journal } from 'src/app/models/journal-data';
import { ActivatedRoute, Params } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Subscription } from 'rxjs';
import { BottomSheetOverviewSheetComponent } from './bottom-sheet-overview.components';
import { HomeworkBottomSheetOverviewSheetComponent } from './homework-bottom-sheet-overview.components';
import * as _ from 'lodash';

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
  homeworks = {};

  constructor(
    private journalsStorageService: JournalsStorageService,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet
  ) {}

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

      this.renderTable();
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
   * Method fetches a journal by available subject id and class id,
   * makes manipulations with received data in order to fit the table
   * and creates the journal table itself.
   */
  renderTable() {
    this.journalsStorageService
      .getJournalsAndHomeworks(this.idSubject, this.idClass)
      .subscribe(journal => {
        this.homeworks = journal.homeworks;
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
        if (!this.elData.length) {
          this.journalsStorageService.loadingStateChanged.next(false);
          return;
        }
        this.dataSource = this.elData;
        const temp = Object.keys(this.elData[0]);
        temp.unshift(...temp.splice(temp.length - 1, 1));
        temp.push('star');

        this.displayedColumns = temp;
        this.journal = journal.journals;
        this.journalsStorageService.loadingStateChanged.next(false);
      });
  }

  onHeadClc(idLesson, event, i) {
    if (!i || i === this.thRow.length) {
      return;
    }
    let styleRef;
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

  onClc(idLesson, studentEl, event, i) {
    if (!Number.isInteger(+idLesson)) {
      return;
    }
    event.target.style.backgroundColor = 'rgba(24, 236, 119, 0.432)';
    event.path[1].style.backgroundColor = 'rgba(24, 151, 236, 0.432)';
    const bottomSheetRef = this.bottomSheet.open(
      BottomSheetOverviewSheetComponent,
      {
        data: {
          lessonId: idLesson,
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
   * Method initialize default values for table
   * data source beforethe journal can be created.
   */
  initialiseState() {
    this.thRow = ['Учень'];
    this.displayedColumns = [];
    this.studentIds = [];
    this.elData = [];
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}

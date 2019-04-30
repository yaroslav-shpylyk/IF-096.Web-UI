import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { JournalsStorageService } from '../../../../services/journals-storage.service';
import { Journal } from '../../../../models/journal-data';
import { ActivatedRoute, Params } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Subscription } from 'rxjs';
import { BottomSheetOverviewSheetComponent } from './bottom-sheet-overview.components';

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
      .getJournaL(this.idSubject, this.idClass)
      .subscribe(journal => {
        let studentData = new Object() as any;
        for (const student of journal) {
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
        this.journal = journal;

        this.journalsStorageService.loadingStateChanged.next(false);
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

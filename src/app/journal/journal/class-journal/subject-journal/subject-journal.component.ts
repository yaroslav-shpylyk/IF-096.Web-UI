import { Component, OnInit, Inject } from '@angular/core';
import { JournalsStorageService } from 'src/app/services/journals-storage.service';
import { Journal } from 'src/app/models/journal-data';
import { ActivatedRoute, Params } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material';

@Component({
  selector: 'app-subject-journal',
  templateUrl: './subject-journal.component.html',
  styleUrls: ['./subject-journal.component.scss']
})
export class SubjectJournalComponent implements OnInit {
  journal: Journal[];
  dataSource;
  thRow = ['Учень'];
  idSubject: number;
  idClass: number;
  displayedColumns = [];
  studentIds = [];
  elData = [];

  constructor(
    private journalsStorageService: JournalsStorageService,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idSubject = +params.subId;
      this.idClass = +params.classId;
      this.initialiseState();
      console.log(this.idSubject);
      console.log(this.idClass);

      this.renderTable();
    });
  }

  average(marks) {
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

  renderTable() {
    this.journalsStorageService
      .getJournaL(this.idSubject, this.idClass)
      .subscribe(journal => {
        // let studentData = { studentFullName: '' };
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
          console.log(studentData);
          // studentData = {};
          studentData = {};
        }
        if (!this.elData.length) {
          return;
        }
        this.dataSource = this.elData;

        console.log('this.thRow');
        console.log(this.thRow);

        console.log('this.elData');
        console.log(this.elData);

        const temp = Object.keys(this.elData[0]);
        temp.unshift(...temp.splice(temp.length - 1, 1));
        temp.push('star');

        this.displayedColumns = temp;
        this.journal = journal;

        console.log('this.journal');
        console.log(this.journal);
      });
  }

  onClc(idLesson, studentEl, event) {
    if (!Number.isInteger(+idLesson)) {
      return;
    }
    event.target.style.backgroundColor = 'rgba(24, 236, 119, 0.432)';
    event.path[1].style.backgroundColor = 'rgba(24, 151, 236, 0.432)';
    console.log(studentEl);
    const bottomSheetRef = this.bottomSheet.open(
      BottomSheetOverviewExampleSheetComponent,
      {
        data: { lessonId: idLesson, student: studentEl },
        panelClass: 'bottom-container'
      }
    );

    bottomSheetRef.afterDismissed().subscribe(() => {
      event.target.style.backgroundColor = '';
      event.path[1].style.backgroundColor = '';
    });
  }

  initialiseState() {
    this.thRow = ['Учень'];
    this.displayedColumns = [];
    this.studentIds = [];
    this.elData = [];
  }
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html'
})
export class BottomSheetOverviewExampleSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private journalsStorageService: JournalsStorageService,
    private bottomSheetRef: MatBottomSheetRef<
      BottomSheetOverviewExampleSheetComponent
    >
  ) {}

  studentFullName = this.data.student.studentFullName;
  mark = this.data.student.marks.find(el => {
    return el.idLesson === +this.data.lessonId;
  });
  selectedVal = this.mark.mark;
  selectedNote = this.mark.note;

  counter(i: number) {
    return new Array(i);
  }

  onValChange(val) {
    this.selectedVal = val;
  }

  daya() {
    console.log(this.selectedVal);
    console.log(this.selectedNote);
    this.journalsStorageService
      .saveMark({
        idLesson: this.data.lessonId,
        idStudent: this.data.student.idStudent,
        mark: this.selectedVal,
        note: this.selectedNote
      })
      .subscribe(
        resp => {
          console.log(resp);
          this.bottomSheetRef.dismiss();
        },
        error => console.log(error)
      );
  }
}

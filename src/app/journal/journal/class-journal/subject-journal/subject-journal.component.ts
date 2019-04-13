import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { JournalsStorageService } from 'src/app/services/journals-storage.service';
import { Journal } from 'src/app/models/journal-data';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  journal: Journal;
  dataSource;
  thRow = ['Учень'];
  idSubject: number;
  idClass: number;
  displayedColumns = [];
  studentIds = [];

  constructor(
    private journalsStorageService: JournalsStorageService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idSubject = +params.subId;
      this.idClass = +params.classId;
      console.log(this.idSubject);
      console.log(this.idClass);
    });

    this.journalsStorageService
      .getJournaL(this.idSubject, this.idClass)
      .subscribe(journal => {
        let studentData = { studentFullName: '' };
        for (const student of journal) {
          studentData.studentFullName = student.studentFullName;
          // studentData.idStudent = student.idStudent;
          this.studentIds.push(student.idStudent);
          for (const mark of student.marks) {
            studentData[mark.idLesson] = mark.mark;
            if (this.thRow.length <= student.marks.length) {
              this.thRow.push(mark.dateMark);
            }
          }
          elData.push(studentData);
          studentData = {};
        }
        // this.thRow = journal[0].marks[0].dateMark;
        this.dataSource = elData;

        console.log('this.thRow');
        console.log(this.thRow);

        console.log('elData');
        console.log(elData);

        const temp = Object.keys(elData[0]);
        temp.unshift(...temp.splice(temp.length - 1, 1));
        temp.push('star');

        this.displayedColumns = temp;
        this.journal = journal;

        console.log('this.journal');
        console.log(this.journal);
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

  onClc(idLesson, studentEl, element) {
    // console.log(studentEl);
    // console.log(element);
    if (!Number.isInteger(+idLesson)) {
      return;
    }

    this.bottomSheet.open(BottomSheetOverviewExampleSheetComponent, {
      data: { lessonId: idLesson, student: studentEl }
    });
  }

  openBottomSheet(mark, idLesson): void {
    console.log(mark, idLesson);
    this.bottomSheet.open(BottomSheetOverviewExampleSheetComponent, {
      data: { names: 12 }
    });
  }
}

const elData = [];
const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', zas: 123 },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

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
    // console.log(el.idLesson, this.data.lessonId);
    return el.idLesson === +this.data.lessonId;
  });
  selectedVal = this.mark.mark;

  counter(i: number) {
    return new Array(i);
  }

  onValChange(val) {
    this.selectedVal = val;
  }

  daya() {
    console.log(this.selectedVal);
    this.journalsStorageService
      .saveMark({
        idLesson: this.data.lessonId,
        idStudent: this.data.student.idStudent,
        mark: this.selectedVal
      })
      .subscribe(
        resp => {
          console.log(resp);
        },
        error => console.log(error)
      );
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

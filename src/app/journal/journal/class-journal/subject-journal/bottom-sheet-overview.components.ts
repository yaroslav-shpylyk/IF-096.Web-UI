import { Component, Inject } from '@angular/core';
import { JournalsStorageService } from '../../../../services/journals-storage.service';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html'
})
export class BottomSheetOverviewSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private journalsStorageService: JournalsStorageService,
    public snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewSheetComponent>
  ) {}

  studentFullName = this.data.student.studentFullName;
  mark = this.data.student.marks.find(el => {
    return el.idLesson === +this.data.lessonId;
  });

  journalIndx = this.data.student.marks.indexOf(this.mark);

  selectedVal = this.mark.mark;
  selectedNote = this.mark.note;
  elData = this.data.elData;
  id = this.data.id;
  lessonId = this.data.lessonId;
  journal = this.data.journal;
  valChanged = false;

  counter(i: number) {
    return new Array(i);
  }

  onValChange(mark?) {
    if (this.selectedVal || mark) {
      this.valChanged = true;
      this.selectedVal = mark ? mark : this.selectedVal;
    }
  }

  onNoteChange() {
    this.valChanged = true;
  }

  openSnackBar(message: string, classMessage: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = [classMessage];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }

  onSave() {
    this.journalsStorageService
      .saveMark({
        idLesson: this.data.lessonId,
        idStudent: this.data.student.idStudent,
        mark: this.selectedVal,
        note: this.selectedNote
      })
      .subscribe(
        resp => {
          this.elData[this.id][this.lessonId] = resp.body.data.mark;
          this.bottomSheetRef.dismiss();
          this.openSnackBar(`Нові дані внесено`, 'snack-class-success-journal');
          this.journal[this.id].marks[this.journalIndx].mark =
            resp.body.data.mark;
          this.journal[this.id].marks[this.journalIndx].note =
            resp.body.data.note;
        },
        error => {
          console.log(error);
          this.bottomSheetRef.dismiss();
          this.openSnackBar(
            `На сервері відбулась помилка`,
            'snack-class-fail-journal'
          );
        }
      );
  }
}

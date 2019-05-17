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
  mark = this.data.student.marks.find((el: { idLesson: number }) => {
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

  /**
   * Method creates buttons for marks toggler.
   * @param i - index of a button to be created.
   */
  counter(i: number) {
    return new Array(i);
  }

  /**
   * Method reacts on changing value into textarea for comment and given mark.
   * Depending on that the local variable is set which is used as a source for
   * desabling/enabling Save button from a template.
   * @param mark - number representing selected mark.
   */
  onValChange(mark?: number) {
    if (this.selectedVal || mark) {
      this.valChanged = true;
      this.selectedVal = mark ? mark : this.selectedVal;
    }
  }

  /**
   * Method opens and provides configuration for a snackbar.
   * @param message - message to be used in a snackbar.
   * @param classMessage - class to be assigned for a snackbar.
   */
  openSnackBar(message: string, classMessage: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = [classMessage];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }

  /**
   * Method gathers provided by user information, creates an object from
   * that and sends it to the server by saveMark method in order to
   * save a new mark.
   */
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
          this.elData[this.id][this.lessonId] = resp.data.mark;
          this.bottomSheetRef.dismiss();
          this.openSnackBar(`Нові дані внесено`, 'snack-class-success-journal');
          this.journal[this.id].marks[this.journalIndx].mark = resp.data.mark;
          this.journal[this.id].marks[this.journalIndx].note = resp.data.note;
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

  /**
   * Method closes bottom sheet dialog.
   */
  onBack() {
    this.bottomSheetRef.dismiss();
  }
}

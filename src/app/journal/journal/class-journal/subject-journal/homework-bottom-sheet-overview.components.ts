import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';
import { HomeworkStorageService } from 'src/app/services/homework-storage.service.ts.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-homework-bottom-sheet',
  templateUrl: 'homework-bottom-sheet-overview.html'
})
export class HomeworkBottomSheetOverviewSheetComponent implements OnInit {
  file: any;
  valChanged = false;
  homeworkForm: FormGroup;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private homeworkStorageService: HomeworkStorageService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<
      HomeworkBottomSheetOverviewSheetComponent
    >
  ) {}

  lessonId = this.data.lessonId;
  homeworks = this.data.homeworks;
  markType = this.data.markType;

  ngOnInit() {
    this.homeworkForm = this.formBuilder.group({
      message: [
        this.homeworks[this.lessonId].homework
          ? this.homeworks[this.lessonId].homework
          : ''
      ],
      homeworkFile: [''],
      homeworkGetFile: [
        this.homeworks[this.lessonId].fileName
          ? this.homeworks[this.lessonId].fileName
          : ''
      ]
    });
  }

  dwnl() {
    this.homeworkStorageService.saveFile(3072).subscribe(data => {
      const blobData = this.convertBase64ToBlobData(data.fileData);
      const blob = new Blob([blobData], { type: data.filetype });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.fileName;
      link.click();
    });
  }

  onValChange() {
    this.valChanged = true;
  }

  openSnackBar(message: string, classMessage: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = [classMessage];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    console.log(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.file = reader.result;
  }

  onSubmit() {
    this.homeworkStorageService
      .saveHomework({
        fileData: this.file,
        homework: this.homeworks[this.lessonId].homework,
        idLesson: this.lessonId
      })
      .subscribe(
        resp => {
          console.log(resp);
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

  convertBase64ToBlobData(
    base64Data: string,
    contentType: string = 'image/png',
    sliceSize = 512
  ) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  // onSave() {
  //   this.journalsStorageService
  //     .saveMark({
  //       idLesson: this.data.lessonId,
  //       idStudent: this.data.student.idStudent,
  //       mark: this.selectedVal,
  //       note: this.selectedNote
  //     })
  //     .subscribe(
  //       resp => {
  //         this.elData[this.id][this.lessonId] = resp.body.data.mark;
  //         this.bottomSheetRef.dismiss();
  //         this.openSnackBar(`Нові дані внесено`, 'snack-class-success-journal');
  //         this.journal[this.id].marks[this.journalIndx].mark =
  //           resp.body.data.mark;
  //         this.journal[this.id].marks[this.journalIndx].note =
  //           resp.body.data.note;
  //       },
  //       error => {
  //         console.log(error);
  //         this.bottomSheetRef.dismiss();
  //         this.openSnackBar(
  //           `На сервері відбулась помилка`,
  //           'snack-class-fail-journal'
  //         );
  //       }
  //     );
  // }
}

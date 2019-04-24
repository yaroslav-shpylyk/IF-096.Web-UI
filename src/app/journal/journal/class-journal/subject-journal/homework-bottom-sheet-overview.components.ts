import { Component, Inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  file: string;
  fileName: string;
  fileType: string;
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
    this.homeworkStorageService.saveFile(this.lessonId).subscribe(data => {
      console.log(data);
      const blobData = this.convertBase64ToBlobData(data);
      const blob = new Blob([blobData], { type: data.filetype });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.fileName;
      link.click();
    });
  }

  onBack() {
    this.bottomSheetRef.dismiss();
  }

  onClear() {
    this.homeworkStorageService
      .saveHomework({
        homework: '',
        idLesson: +this.lessonId,
        fileData: '',
        fileType: '',
        fileName: ''
      })
      .subscribe(
        () => {
          this.homeworks[this.lessonId].homework = '';
          this.homeworks[this.lessonId].fileName = '';
          this.bottomSheetRef.dismiss();
          this.openSnackBar(`Завдання видалено`, 'snack-class-success-journal');
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
    this.fileName = file.name;
    this.fileType = file.type;
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.file = reader.result.split(',')[1];
    console.log(this.file);
  }

  onSubmit() {
    this.homeworkStorageService
      .saveHomework({
        homework: this.homeworkForm.value.message,
        idLesson: this.lessonId,
        fileData: this.homeworkForm.value.homeworkFile ? this.file : null,
        fileType: this.fileType ? this.fileType : null,
        fileName: this.fileName ? this.fileName : null
      })
      .subscribe(
        resp => {
          console.log(resp);
          this.homeworks[
            this.lessonId
          ].homework = this.homeworkForm.value.message;
          if (this.fileName) {
            this.homeworks[this.lessonId].fileName = this.fileName;
          }
          this.bottomSheetRef.dismiss();
          this.openSnackBar(`Нові дані внесено`, 'snack-class-success-journal');
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

  convertBase64ToBlobData(data) {
    const sliceSize = 512;
    console.log(data);
    const byteCharacters = atob(data.fileData);
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

    const blob = new Blob(byteArrays, { type: data.fileType });
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

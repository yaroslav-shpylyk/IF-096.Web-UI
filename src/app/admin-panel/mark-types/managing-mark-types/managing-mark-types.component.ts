import { Component, OnInit, Inject } from '@angular/core';
import { MarkType } from '../../../models/mark-type';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MarkTypesService } from '../../../services/mark-types.service';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MarkTypesValidator } from './validators';

@Component({
  selector: 'app-managing-mark-types',
  templateUrl: './managing-mark-types.component.html',
  styleUrls: ['./managing-mark-types.component.scss']
})
export class ManagingMarkTypesComponent {
  request: Observable<MarkType>;
  markTypeForm = this.fb.group({
    typeTitle: [
      this.markTypeData[0].markType,
      [ Validators.required,
        Validators.pattern('[А-Я+ІЇЄҐ][а-яіїєґ()\' -]+'),
        Validators.maxLength(50),
        MarkTypesValidator(this.markTypeData[1], this.markTypeData[0].markType)
      ]],
    description: [this.markTypeData[0].description, [Validators.maxLength(300)]],
  });

  constructor(
    public dialogRef: MatDialogRef<ManagingMarkTypesComponent>,
    public markTypesService: MarkTypesService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public markTypeData: MarkType
  ) { }

  /**
   * Method save a new or modify exist mark type
   */
  saveMarkType() {
    console.log('save');
    let message: string;
    this.markTypeData[0].markType = this.markTypeForm.get('typeTitle').value;
    this.markTypeData[0].description = this.markTypeForm.get('description').value;

    if (this.markTypeData[0].id > 0) {
      message = 'Зміни збережено';
      this.request = this.markTypesService.changeMarkType(this.markTypeData[0].id, this.markTypeData[0]);
    } else {
      message = 'Новий тип оцінок створено';
      this.request = this.markTypesService.createMarkType(this.markTypeData[0]);
    }
    this.request.subscribe(
      res => {
        this.dialogRef.close(res);
        this.displaySnackBar(message);
      }
    );
  }

  /**
   * Display popup message
   * @param message - text of message
   */
  private displaySnackBar( message: string ): void {
    const config = new MatSnackBarConfig();
    config.panelClass = 'green-snackbar';
    config.duration = 3000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Changes active property of current mark type and display snackbar with status message
   */
  changeActiveStatus(): void {
    let message: string;
    if (this.markTypeData[0].active) {
      this.markTypeData[0].active = false;
      message = 'Даний тип оцінок перенесено в архів';
    } else {
      this.markTypeData[0].active = true;
      message = 'Даний тип оцінок відновлено';
    }
    this.markTypesService.changeMarkType(this.markTypeData[0].id, this.markTypeData[0]).subscribe(
      res => {
        this.dialogRef.close(res);
        this.displaySnackBar(message);
      }
    );
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MarkType } from '../../../models/mark-type';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MarkTypesService } from '../../../services/mark-types.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-managing-mark-types',
  templateUrl: './managing-mark-types.component.html',
  styleUrls: ['./managing-mark-types.component.scss']
})
export class ManagingMarkTypesComponent {
  request: Observable<MarkType>;
  constructor(
    public dialogRef: MatDialogRef<ManagingMarkTypesComponent>,
    public markTypesService: MarkTypesService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public markTypeData: MarkType
  ) { }

  /**
   * Method save a new or modify exist mark type
   */
  saveMarkType() {
    let message: string;
    if (this.markTypeData.id > 0) {
      message = 'Зміни збережено';
      this.request = this.markTypesService.changeMarkType(this.markTypeData.id, this.markTypeData);
    } else {
      message = 'Новий тип оцінок створено';
      this.request = this.markTypesService.createMarkType(this.markTypeData);
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
}

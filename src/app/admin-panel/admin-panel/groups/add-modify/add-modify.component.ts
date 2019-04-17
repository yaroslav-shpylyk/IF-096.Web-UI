import { Component, OnInit, Inject } from '@angular/core';

import { Group } from '../../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-add-modify',
  templateUrl: './add-modify.component.html',
  styleUrls: ['./add-modify.component.scss']
})

export class AddModifyGroupComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddModifyGroupComponent>,
    private groupServices: GroupsService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  /**
   * Method reports about closing bottom sheet
   */
  abort(): void {
    this.dialogRef.close();
  }

  /**
   * Method saves data about a new or modified class
   */
  save() {
    const group = new Group(this.data);
    this.groupServices.addGrup(group).subscribe((dataResponse: any) => {
      if (group.id && !(dataResponse === undefined)) {
        this.dialogRef.close(dataResponse);
        this.openSnackBar(
          `Клас ${dataResponse.className}  ${dataResponse.classYear} року. Зміни збережено`,
          'snack-class-success'
        );
      } else if (group.id === undefined && !(dataResponse === undefined)) {
        this.dialogRef.close(dataResponse);
        this.openSnackBar(
          `Клас ${dataResponse.className}  ${dataResponse.classYear} року створений`,
          'snack-class-success'
        );
      } else if (dataResponse === undefined) {
        this.openSnackBar(
          `НЕ ЗБЕРЕЖЕНО!!! Можливо даний клас вже існує`,
          'snack-class-fail'
        );
      }
    });
  }

  /**
   * Method opens the snack-bar with a message
   * @param message - message which must be displayed
   * @param classMessage - Extra CSS classes to be added to the snack bar container.
   */
  openSnackBar(message: string, classMessage: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = [classMessage];
    config.duration = 3000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }
}

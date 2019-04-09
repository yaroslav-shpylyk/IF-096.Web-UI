import { Component, Inject } from '@angular/core';
import { SubjectData } from 'src/app/models/subject-data';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

/**
   * This component have empty html.Its need for create modal window with own Id
*/

@Component({
  template: ''
})
export class SubjectsDatails {

  constructor(public dialog: MatDialog) {this.openDialog();}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModifySubjectsComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}

@Component({
  selector: 'app-modify-subjects',
  templateUrl: './modify-subjects.component.html',
  styleUrls: ['./modify-subjects.component.scss']
})
export class ModifySubjectsComponent {

  constructor(public dialogRef: MatDialogRef<ModifySubjectsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: SubjectData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

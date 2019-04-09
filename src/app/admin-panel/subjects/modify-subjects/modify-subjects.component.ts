import { Component, Inject } from '@angular/core';
import { SubjectData } from 'src/app/models/subject-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

import { Component, Inject } from '@angular/core';
import { SubjectData } from '../../../models/subject-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-modify-subjects',
  templateUrl: './modify-subjects.component.html',
  styleUrls: ['./modify-subjects.component.scss']
})
export class ModifySubjectsComponent {

  constructor(public dialogRef: MatDialogRef<ModifySubjectsComponent>,
              public subjectService: SubjectService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Method save a new o modify subject
   */
  saveNewSubject() {
    const subj = new SubjectData(this.data);
    if (subj.subjectId > 0) {
      this.subjectService.editSubject(subj.subjectId, subj).subscribe((res) => {
        this.dialogRef.close(res);
      });
    } else {
      this.subjectService.addSubject(subj).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }
}

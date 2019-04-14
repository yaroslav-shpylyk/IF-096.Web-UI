import { Component, Inject } from '@angular/core';
import { SubjectData } from 'src/app/models/subject-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-modify-subjects',
  templateUrl: './modify-subjects.component.html',
  styleUrls: ['./modify-subjects.component.scss']
})
export class ModifySubjectsComponent {

  constructor(public dialogRef: MatDialogRef<ModifySubjectsComponent>,
    public SubjectService: SubjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveNewSubject() {
    const subj = new SubjectData(this.data);
    if (subj.subjectId > 0) {
      this.SubjectService.editSubject(subj.subjectId, subj).subscribe((subj) => {
        this.dialogRef.close(subj);
      });
    }
    else {
      this.SubjectService.addSubject(subj).subscribe((subj) => {
        this.dialogRef.close(subj);
      });
    }
  }
}

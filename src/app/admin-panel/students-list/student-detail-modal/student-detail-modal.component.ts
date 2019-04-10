import { Component, Inject } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Student } from '../../../models/student';

/*
   * This component have empty html.Its need for create modal window with own Id
*/

@Component({
  template: ''
})
export class StudentDatails {
  paramId: number;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.paramId = params.id);
    this.openDialog();
  }

  /*
    *Method open and close modal window.In data you can sent
    *object with data to modal window
  */

  openDialog(): void {
    const dialogRef = this.dialog.open(StudentDetailModalComponent, {
      width: '250px',
      data: { paramId: this.paramId }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true });
    });
  }
}

/*
 * This component its modal window
*/


@Component({
  selector: 'app-student-detail-modal',
  templateUrl: 'student-detail-modal.component.html',
  styleUrls: ['student-detail-modal.component.scss']
})
export class StudentDetailModalComponent {

  studentInfo: Student;

  constructor(
    public dialogRef: MatDialogRef<StudentDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentServise: StudentsService,
    private route: ActivatedRoute,
    private router: Router) {
    this.studentServise.getOneStudent(this.data.paramId)
      .subscribe((student: Student) => this.studentInfo = student);
  }

  /*
  * This method close modal window, and redirect back
  */

  goBack(): void {
    this.dialogRef.close();
  }

  /*
  * This method redirect for edit component, where you can edit students data 
  */

  editStudent() {
    this.router.navigate(['admin', 'students', this.data.paramId, 'edit'], { relativeTo: this.route, replaceUrl: true });
  }

}

import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { StudentsService } from '../../services/students.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit, OnDestroy {
  activeClass: Array<any>;
  notActiveClass: Array<any>;
  studentList: Array<any>;
  routeQueryParams$: Subscription;
  studentChoose:any;



  constructor(
    private classList: ClassService,
    private students: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {

    this.routeQueryParams$ = route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    })

  }

  ngOnInit() {
    this.classList.getClasses().subscribe((data: any) => {
      this.activeClass = data.filter((items: any) => items.isActive === true);
      this.notActiveClass = data.filter((items: any) => items.isActive === false);

    });
  }

  ngOnDestroy() {
    this.routeQueryParams$.unsubscribe();
  }

  /**
   * Method return students list from student service
   * @returns - array with students
   */

  onSelectionClass($event): void {
    this.students.getStudents($event.value).subscribe(list => this.studentList = list);

  }

  chooseStudents($event): any {
    this.studentChoose=$event;
  }

  AddStudent() {
    console.log('button add student',this.studentChoose)
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { student: this.studentChoose }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.studentList = result;
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  clickedStudent:any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // this.clickedStudent=this.data;
     }



  onNoClick(): void {
    // this.students.getStudents()
    console.log("this.data.id",this.data.student);
    this.dialogRef.close();
  }

}

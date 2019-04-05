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
export class StudentsListComponent implements OnInit {
  activeClass: Array<any>;
  notActiveClass: Array<any>;
  studentList: Array<any>;
  // routeQueryParams$: Subscription;
  // studentChoose: any;



  constructor(
    private classList: ClassService,
    private students: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
    ) {

    // this.routeQueryParams$ = route.queryParams.subscribe(params => {
    //   if (params['dialog']) {
    //     this.openDialog();
    //   }
    // }
    // )

  }

  ngOnInit() {
    this.classList.getClasses().subscribe((data: any) => {
      this.activeClass = data.filter((items: any) => items.isActive === true);
      this.notActiveClass = data.filter((items: any) => items.isActive === false);

    });
  }

  // ngOnDestroy() {
  //   this.routeQueryParams$.unsubscribe();
  // }

  /**
   * Method return students list from student service
   * @returns - array with students
   */

  onSelectionClass($event): void {
    this.students.getStudents($event.value).subscribe(list => this.studentList = list);

  }

  // chooseStudents($event): any {
  //   this.studentChoose = $event;
  // }

  AddStudent() {
    console.log('button add student')
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px'
  //     // data: { student: this.studentChoose }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.studentList = result;
  //     this.router.navigate(['../'], { relativeTo: this.route });
  //   });
  // }

}

@Component({
  template: ''
})
export class ModalStudent {
  paramId: number;


  constructor(public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.paramId = params.id);

    // this.studentServise.getOneStudent(this.paramId).subscribe(student=>{console.log(student);return this.studentInfo=student})

    this.openDialog();
    // console.log(this.studentInfo)



  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { paramId: this.paramId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}

export interface proba {
  avatar: any;
  classId: number
  classe: any;
  dateOfBirth: string;
  email: any;
  firstname: string;
  id: number;
  lastname: string;
  login: string;
  patronymic: string;
  phone: any;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  // clickedStudent: any;
  // idStudent: any;
  studentInfo: proba;


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentServise: StudentsService,
    private route: ActivatedRoute,
    private router: Router) {

    this.studentServise.getOneStudent(this.data.paramId)
    .subscribe((student: proba) => this.studentInfo = student);

  }

  // ngOnInit(){
  //   this.studentServise.getOneStudent(this.data.paramId).subscribe((student:proba)=>this.studentInfo=student);
  //   setTimeout(()=>console.log(this.studentInfo),3000)
  // }

  goBack(): void {
    // this.students.getStudents()
    // console.log("this.data.id", this.data.student);
    this.dialogRef.close();
  }

  editStudent() {
    this.router.navigate(['edit', this.studentInfo.id], { relativeTo: this.route })
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}

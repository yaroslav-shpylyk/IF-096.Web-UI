import { Component, Inject } from '@angular/core';
import { FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentsService } from '../../../services/students.service';
import { ClassInfo } from '../../../models/class-info';
import { ClassService } from '../../../services/class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Student } from '../../../models/student';
import { Subscription } from 'rxjs';


/*
* This component have empty html.Its need for create modal window with own Id
*/

@Component({
  template: ''
})
export class AddStudentModalComponent {
  paramId: number;
  studentData: Student;
  probaStudent;

  constructor(public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentsService, ) {
    this.route.params.subscribe(params => {
      this.paramId = params.id;
      // this.studentService.idStudent = params.id;
    });
    this.studentService.getOneStudent(this.paramId)
      .subscribe((student: Student) => this.studentData = student);



    this.studentService.StudentSubject.subscribe(
      (proba: any) => {
        console.log('proba', proba);
      });

    

    this.openDialog();
  }

/*
*Method open and close modal window.In data you can sent
* object with data to modal window
*/

openDialog(): void {
  const dialogRef = this.dialog.open(AddStudentComponent, {
    width: '250px',
    data: {
      paramId: this.paramId,
      student: this.studentData
    }
  });
  dialogRef.afterClosed().subscribe(() => {
    this.router.navigate(['../'], { relativeTo: this.route });
  });
}
}


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {

  allClasses: Array<ClassInfo>;
  addMode: any = {
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    patronymic: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    classId: [''],
    login: [''],
    phone: [''],
    email: [''],
    avatar: [''],
  };
  id: any=55;
  // studentData: Student;
  editMode: any = {
    avatar: [''],
    dateOfBirth: [''],
    email: [this.id],
    firstname: [''],
    lastname: [''],
    login: ['panas'],
    newPass: [''],
    patronymic: [''],
    phone: [''],
  };


  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private classService: ClassService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.classService.getClasses('all').subscribe((res: Array<ClassInfo>) => this.allClasses = res);
    // this.studentService.getOneStudent(this.data.paramId)
    //   .subscribe((student: Student) => this.studentData = student);
    // this.id = this.data.paramId;
    // setTimeout(() => console.log(this.studentData), 2000);
    // console.log(this.data)
  }
  addStudent = this.fb.group(this.toCheckMode());

  toCheckMode() {
    if (this.data.paramId) {
      return this.editMode;
    }
    return this.addMode;
  }



  onSubmit(data) {

    // this.studentService.addStudents(data).subscribe(res => console.log('Student add'));

    this.studentService.changeStudent(235, data).subscribe(res => console.log('Student add', res));
  }
}

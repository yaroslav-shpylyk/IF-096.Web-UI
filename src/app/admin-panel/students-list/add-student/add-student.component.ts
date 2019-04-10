import { Component, Inject, OnInit } from '@angular/core';
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

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.paramId = params.id;
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
export class AddStudentComponent implements OnInit {

  allClasses: Array<ClassInfo>;
  avatar: string | ArrayBuffer = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private classService: ClassService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.classService.getClasses('all').subscribe((res: Array<ClassInfo>) => this.allClasses = res);
  }
  addStudent = this.fb.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    patronymic: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    classId: [''],
    login: ['', Validators.required],
    phone: [''],
    email: [''],
    avatar: [''],
  });

  ngOnInit() {
    if (this.data.paramId) {
      this.studentService.getOneStudent(this.data.paramId)
        .subscribe((student: Student) => {
          this.addStudent = this.fb.group({
            avatar: [this.checkAvatar(student.avatar)],
            dateOfBirth: [student.dateOfBirth],
            email: [student.email],
            firstname: [student.firstname],
            lastname: [student.lastname],
            login: [student.login],
            classId: [{ value: student.classId, disabled: true }],
            newPass: [''],
            patronymic: [student.patronymic],
            phone: [student.phone],
          });
          setTimeout(() => console.log(student), 2000);
        });
    }
  }

  onUpload($event) {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.avatar = reader.result;
    };
    reader.readAsDataURL(file);
    // this.ngOnInit();
  }

  checkAvatar(img) {
    if (img === null || img === '') {
      return this.avatar;
    } else {
      return img;
    }
  }

  onSubmit(data) {
    if (this.data.paramId) {
      this.studentService.changeStudent(this.data.paramId, data).subscribe(res => console.log('Student edited', res));
    } else {
      this.studentService.addStudents(data).subscribe(res => console.log('Student added'));
    }
  }
}

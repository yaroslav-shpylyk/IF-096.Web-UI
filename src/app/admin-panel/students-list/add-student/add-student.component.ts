import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from '../../../services/students.service';
import { ClassInfo } from '../../../models/class-info';
import { ClassService } from '../../../services/class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Student } from '../../../models/student';
import {
  validText,
  validPhone,
  validLogin
} from '../validator';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  allClasses: Array<ClassInfo>;
  avatar: any = '';
  startDate: Date = new Date(2010, 0, 1);
  show = false;

  addStudent = this.fb.group({
    lastname: ['', validText],
    firstname: ['', validText],
    patronymic: ['', validText],
    dateOfBirth: ['', Validators.required],
    classId: [''],
    login: [''],
    phone: ['', validPhone],
    email: [''],
    avatar: ['']
  });

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private classService: ClassService,
    public dialogRef: MatDialogRef<AddStudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.classService.getClasses('active').subscribe((res: Array<ClassInfo>) => {
      this.allClasses = res;
      this.initStudentData();
    });
  }

  /**
   * Method upload student avatar
   */

  onUpload($event): void {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.avatar = reader.result;
    };
    reader.readAsDataURL(file);
    this.initStudentData();
  }

  /**
   * Method type form (add mode or edit), submit form and sent data to server
   */

  onSubmit(data: any): void {
    if (typeof (data.dateOfBirth) !== 'string') {
      data.dateOfBirth = data.dateOfBirth.toLocaleDateString().split('.').reverse().join('-');
    }
    data.avatar = this.avatar;
    if (this.data.paramId) {
      this.studentService.changeStudent(this.data.paramId, data).subscribe(res => {
        this.studentService.loadStudents(this.data.classId);
        this.openSnackBar('Дані змінено', 'успішно');
      },
        err => this.openSnackBar('Дані не змінено', err));
    } else {
      data.avatar = this.avatar;
      this.studentService.addStudents(data).subscribe(res => {
        this.studentService.loadStudents(data.classId);
        this.openSnackBar('Студента додано', '');
      },
        err => this.openSnackBar('Сталась помилка, можливо неправильні дані', err));
    }
    this.dialogRef.close();
  }

  /**
   * Method check param Id and if is ID make subscribe on student
   */

  initStudentData(): void {
    if (this.data.paramId) {
      this.studentService.getOneStudent(this.data.paramId)
        .subscribe((student: Student) => {
          this.editStudentForm(student);
        });
    }
  }

  /**
   * After check initStudent data make init edit mode form
   */

  private editStudentForm(student: Student): void {
    this.addStudent = this.fb.group({
      avatar: [student.avatar],
      dateOfBirth: [student.dateOfBirth],
      email: [student.email],
      firstname: [student.firstname, validText],
      lastname: [student.lastname, validText],
      login: [student.login, validLogin],
      classId: [{ value: student.classId }],
      newPass: [''],
      patronymic: [student.patronymic, validText],
      phone: [student.phone, validPhone]
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

/**
 * This component have empty html.Its need for create modal window with own route
 */

@Component({
  template: ''
})
export class AddStudentModalComponent {
  paramId: number;
  classId: number;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.paramId = params.id;
    });
    this.route.queryParams.subscribe(params => {
      this.classId = params.classId;
    });
    this.openDialog();
  }

  /**
   * Method open and close dialog.In data you can sent
   * object with data to dialog
   */

  openDialog(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '300px',
      data: {
        paramId: this.paramId,
        classId: this.classId
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['admin-panel', 'students'], { skipLocationChange: true });
    });
  }
}

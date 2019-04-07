import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TeachersService } from '../../teachers.service';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import {
  MustMatch,
  validConfig,
  validEmail,
  validPhone,
  validDate
} from '../../validators';
import { Teacher } from '../../teacher.model';
import { MatSnackBar } from '@angular/material';

@Injectable()
@Component({
  template: ''
})
export class EditDialogEntryComponent implements OnInit {
  teacher;
  id: number;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private teachersService: TeachersService
  ) {
    this.openDialog();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.teachersService.editMode = params.id != null;
      this.teachersService.modalsId = this.id;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogOverviewComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/admin', 'teachers'], { relativeTo: this.route });
    });
  }
}

@Component({
  selector: 'app-edit-dialog-overview',
  templateUrl: './edit-dialog.html',
  styleUrls: ['./edit-dialog.scss']
})
export class EditDialogOverviewComponent implements OnInit {
  teacher: Teacher;
  subscription: Subscription;
  teacherForm: FormGroup;
  editMode: boolean;
  ava;

  constructor(
    public dialogRef: MatDialogRef<EditDialogOverviewComponent>,
    private teachersService: TeachersService,
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.editMode = this.teachersService.editMode;
    if (this.editMode) {
      this.teachersStorageService
        .getTeacher(this.teachersService.modalsId)
        .subscribe(
          teacher => {
            this.teacher = teacher;
            this.initForm();
            return;
          },
          error => console.log(error)
        );
      this.initForm();
    }
    this.initForm();
  }

  private initForm() {
    let teacherFirstname = '';
    let teacherLastname = '';
    let teacherPatronymic = '';
    let teacherDateOfBirth = '';
    let teacherEmail = '';
    let teacherPhone = '';
    let teacherLogin = '';

    if (this.teacher) {
      teacherFirstname = this.teacher.firstname;
      teacherLastname = this.teacher.lastname;
      teacherPatronymic = this.teacher.patronymic;
      teacherDateOfBirth = this.teacher.dateOfBirth;
      teacherEmail = this.teacher.email;
      teacherPhone = this.teacher.phone;
      teacherLogin = this.teacher.login;
    }

    this.teacherForm = this.formBuilder.group(
      {
        teacherFirstname: [teacherFirstname, validConfig],
        teacherLastname: [teacherLastname, validConfig],
        teacherPatronymic: [teacherPatronymic, validConfig],
        teacherDateOfBirth: [teacherDateOfBirth, [Validators.required, validDate]],
        teacherEmail: [teacherEmail, validEmail],
        teacherPhone: [teacherPhone, validPhone],
        teacherLogin: [teacherLogin, Validators.required],
        oldPassword: [''],
        newPassword: [''],
        confirmPassword: [''],
        teacherAvatar: ['']
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      }
    );
  }

  onSubmit() {
    const newValues = {
      avatar: this.editMode ? this.teacher.avatar : this.ava,
      dateOfBirth: this.teacherForm.value.teacherDateOfBirth
        .split('.')
        .reverse()
        .join('-'),
      email: this.teacherForm.value.teacherEmail,
      firstname: this.teacherForm.value.teacherFirstname,
      lastname: this.teacherForm.value.teacherLastname,
      login: this.teacherForm.value.teacherLogin,
      newPass: this.teacherForm.value.newPassword,
      oldPass: this.teacherForm.value.oldPassword,
      patronymic: this.teacherForm.value.teacherPatronymic,
      phone: this.teacherForm.value.teacherPhone
    };
    if (!this.editMode) {
      this.teachersStorageService.addTeacher(newValues).subscribe(res => {
        this.teachersStorageService.getTeachers();
      });
    } else {
      this.teachersStorageService
        .updateTeacher(this.teachersService.modalsId, newValues)
        .subscribe(
          () => {
            this.teachersStorageService.getTeachers();
          },
          error => console.log(error)
        );
    }
    this.dialogRef.close();
    this.router.navigate(['/admin/teachers/']);
    this.openSnackBar(this.editMode ? 'Нові дані внесено' : `Викладач ${newValues.lastname} ${newValues.lastname} створений`);
  }

  onCancel(): void {
    this.dialogRef.close();
    this.router.navigate(['admin', 'teachers'], {
      relativeTo: this.route
    });
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    if (this.editMode) {
      this.teacher.avatar = reader.result;
    } else {
      this.ava = reader.result;
    }
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snack-class'];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }
}

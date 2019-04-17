import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import {
  MustMatch,
  validConfig,
  validEmail,
  validPhone,
  validDate
} from '../../helpers/validators';
import { MatSnackBar } from '@angular/material';
import { TeacherData } from 'src/app/models/teacher-data';



@Component({
  selector: 'app-edit-dialog-overview',
  templateUrl: './edit-dialog.html',
  styleUrls: ['./edit-dialog.scss']
})
export class EditDialogOverviewComponent implements OnInit, OnDestroy {
  teacher: TeacherData;
  subscription: Subscription;
  teacherForm: FormGroup;
  editMode: boolean;
  ava;

  constructor(
    public dialogRef: MatDialogRef<EditDialogOverviewComponent>,
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.editMode = this.teachersStorageService.editMode;
    if (this.editMode) {
      this.teachersStorageService
        .getTeacher(this.teachersStorageService.modalsId)
        .subscribe(
          teacher => {
            this.teacher = teacher;
            this.initForm();
            return;
          },
          error => {
            console.log(error);
            this.openSnackBar(
              `На сервері відбулась помилка`,
              'snack-class-fail'
            );
          }
        );
      this.initForm();
    }
    this.initForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
        teacherDateOfBirth: [
          teacherDateOfBirth,
          [Validators.required, validDate]
        ],
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
      console.log(newValues.avatar);
      this.teachersStorageService.addTeacher(newValues).subscribe(
        (res) => {
          console.log(res);
          this.teachersStorageService.getTeachers();
          this.openSnackBar(
            `Викладач ${newValues.lastname} ${newValues.lastname} створений`,
            'snack-class-success'
          );
        },
        error => {
          console.log(error);
          this.openSnackBar(`На сервері відбулась помилка`, 'snack-class-fail');
        }
      );
    } else {
      this.teachersStorageService
        .updateTeacher(this.teachersStorageService.modalsId, newValues)
        .subscribe(
          () => {
            this.teachersStorageService.getTeachers();
            this.openSnackBar(`Нові дані внесено`, 'snack-class-success');
          },
          error => {
            console.log(error);
            this.openSnackBar(
              `На сервері відбулась помилка`,
              'snack-class-fail'
            );
          }
        );
    }
    this.dialogRef.close();
    this.router.navigate(['/admin-panel/teachers/'], {
      replaceUrl: true
    });
  }

  onCancel(): void {
    this.dialogRef.close();
    this.router.navigate(['admin-panel', 'teachers'], {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    console.log(e);
    const reader = e.target;
    if (this.editMode) {
      this.teacher.avatar = reader.result;
    } else {
      this.ava = reader.result;
      console.log(this.ava);
    }
  }

  openSnackBar(message: string, classMessage: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = [classMessage];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }
}

@Injectable()
@Component({
  template: ''
})
export class EditDialogEntryComponent implements OnInit, OnDestroy {
  teacher;
  id: number;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private teachersStorageService: TeachersStorageService
  ) {
    this.openDialog();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.teachersStorageService.editMode = params.id != null;
      this.teachersStorageService.modalsId = this.id;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogOverviewComponent, {
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/admin-panel', 'teachers'], {
        relativeTo: this.route,
        replaceUrl: true
      });
    });
  }
}

import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TeachersStorageService } from '../../../../services/teachers-storage.service';
import {
  MustMatch,
  validConfig,
  validEmail,
  validPhone,
  validDate
} from '../../helpers/validators';
import { MatSnackBar } from '@angular/material';
import { TeacherData } from '../../../../models/teacher-data';

@Component({
  selector: 'app-edit-dialog-overview',
  templateUrl: './edit-dialog.html',
  styleUrls: ['./edit-dialog.scss']
})
export class EditDialogOverviewComponent implements OnInit {
  teacher: TeacherData;
  teacherForm: FormGroup;
  editMode: boolean;
  ava: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogOverviewComponent>,
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Right at the begining it has to be defined the mode we're in. Depending
   * on that the teacher object is fetched/not fetched and initialized form method.
   */
  ngOnInit() {
    this.editMode = this.teachersStorageService.editMode;
    if (this.editMode) {
      if (this.teachersStorageService.teacherToDisplay) {
        this.teacher = { ...this.teachersStorageService.teacherToDisplay };
        this.teachersStorageService.teacherToDisplay = null;
      } else {
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
                'snack-class-fail-teacher'
              );
            }
          );
      }
      this.initForm();
    }
    this.initForm();
  }

  /**
   * No matter current mode the set of variables for form
   * fields are declared being empty strings.
   */
  private initForm() {
    let teacherFirstname = '';
    let teacherLastname = '';
    let teacherPatronymic = '';
    let teacherDateOfBirth = '';
    let teacherEmail = '';
    let teacherPhone = '';
    let teacherLogin = '';

    /**
     * If it's edit mode - values are taken from already fetched object.
     * Otherwise the fields persist empty as they are.
     */
    if (this.teacher) {
      teacherFirstname = this.teacher.firstname;
      teacherLastname = this.teacher.lastname;
      teacherPatronymic = this.teacher.patronymic;
      teacherDateOfBirth = this.teacher.dateOfBirth;
      teacherEmail = this.teacher.email;
      teacherPhone = this.teacher.phone;
      teacherLogin = this.teacher.login;
    }

    /**
     * Form group with vilidation configuration is created accordingly
     * in accordance to the values of above mentioned variables.
     */
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

  /**
   * Once the form is about to be submitted the new values are gathered in
   * newValues viriable and slightly transformed to fit the server's format needs.
   */
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
      this.teachersStorageService.addTeacher(newValues).subscribe(
        res => {
          this.teachersStorageService.getTeachers();
          this.openSnackBar(
            `Викладач ${newValues.lastname} ${newValues.lastname} створений`,
            'snack-class-success-teacher'
          );
        },
        error => {
          console.log(error);
          this.openSnackBar(
            `На сервері відбулась помилка`,
            'snack-class-fail-teacher'
          );
        }
      );
    } else {
      this.teachersStorageService
        .updateTeacher(this.teachersStorageService.modalsId, newValues)
        .subscribe(
          res => {
            res.dateOfBirth = res.dateOfBirth
              .split('-')
              .reverse()
              .join('.');
            const id = this.teachersStorageService.modalsId;
            res.id = id;
            this.teachersStorageService.teacherEdited.next({
              id,
              obj: res
            });
            this.openSnackBar(
              `Нові дані внесено`,
              'snack-class-success-teacher'
            );
          },
          error => {
            console.log(error);
            this.openSnackBar(
              `На сервері відбулась помилка`,
              'snack-class-fail-teacher'
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
    const reader = e.target;
    if (this.editMode) {
      this.teacher.avatar = reader.result;
    } else {
      this.ava = reader.result;
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

/**
 * Dummy component for the path ':id/edit' and 'new' that manages opening,
 * closing, and passing data to the dialog. When the dummy component gets
 * initialized on ‘:id/edit’ or 'new' navigation, it will open the dialog.
 */
@Injectable()
@Component({
  template: ''
})
export class EditDialogEntryComponent implements OnInit {
  prevModalId = +this.route.snapshot.params.id;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private teachersStorageService: TeachersStorageService
  ) {
    this.openDialog();
  }

  /**
   * As OverviewComponent component doesn’t have direct access to the
   * activated route its parameter 'id'/'new' is taken from current component
   * and passed along using a service.
   * So that OverviewComponent knows id of a teacher to work with and mode it is in.
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.teachersStorageService.editMode = params.id != null;
      this.teachersStorageService.modalsId = +params.id;
      if (
        this.teachersStorageService.editMode &&
        this.prevModalId !== +params.id
      ) {
        this.prevModalId = +params.id;
        this.openDialog();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogOverviewComponent, {
      maxWidth: '90vw',
      panelClass: 'teacher-edit-dialog'
    });
    dialogRef.backdropClick().subscribe(() => {
      this.router.navigate(['/admin-panel', 'teachers'], {
        relativeTo: this.route,
        replaceUrl: true
      });
    });
  }
}

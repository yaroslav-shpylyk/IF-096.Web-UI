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
import { imageValidator } from '../../../../validators/image-type.validator';
import { BehaviorSubject } from 'rxjs';
import { avatarValidationMessage } from '../../../../animations/animation';
@Component({
  selector: 'app-edit-dialog-overview',
  templateUrl: './edit-dialog.html',
  styleUrls: ['./edit-dialog.scss'],
  animations: [avatarValidationMessage]
})
export class EditDialogOverviewComponent implements OnInit {
  teacher: TeacherData;
  teacherForm: FormGroup;
  editMode: boolean;
  ava: string;
  file = new BehaviorSubject<File>(null);
  messageVisible = false;

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
        teacherAvatar: ['', null, imageValidator(this.file)]
      },
      {
        updateOn: 'blur',
        validator: MustMatch('newPassword', 'confirmPassword'),
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
        () => {
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

  /**
   * Method closes editing dialog without applying any changes.
   */
  onCancel(): void {
    this.dialogRef.close();
    this.router.navigate(['admin-panel', 'teachers'], {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  /**
   * Method handle upload mechanism from component
   * @param event - event object containing uploaded file.
   */
  onFileSelected(event: { target: { files: any[] } }) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      this.file.next(file);
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  /**
   * Method takes uploaded object file, derives from there file data
   * and assigns it to the local variable
   * @param e - event object containing uploaded file.
   */
  _handleReaderLoaded(e: { target: any }) {
    const reader = e.target;
    const avatarFormControl = this.teacherForm.get('teacherAvatar');
    avatarFormControl.updateValueAndValidity();
    this.teacherForm.get('teacherAvatar').statusChanges.subscribe(
      () => {
        if (avatarFormControl.valid) {
          if (this.editMode) {
            this.teacher.avatar = reader.result;
          } else { this.ava = reader.result; }
        } else {
          this.messageVisible = true;
          setTimeout(() => this.messageVisible = false, 2000);
        }
      }
    );
  }

  /**
   * Method opens the snack-bar with a message
   * @param message - message which must be displayed
   * @param classMessage - Extra CSS classes to be added to the snack bar container.
   */
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

  /**
   * Method opening a modal window and subscribing to back button click
   * in order to navigate back to to the previous screen on closing.
   */
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

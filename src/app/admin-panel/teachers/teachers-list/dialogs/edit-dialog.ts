import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TeachersService } from '../../teachers.service';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import {
  MustMatch,
  validConfig,
  validEmail,
  validPhone
} from '../../validators';
import { Teacher } from '../../teacher.model';

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
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }
}

@Component({
  selector: 'app-edit-dialog-overview',
  templateUrl: './edit-dialog.html'
})
export class EditDialogOverviewComponent implements OnInit {
  teacher: Teacher;
  subscription: Subscription;
  teacherForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogOverviewComponent>,
    private teachersService: TeachersService,
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.teachersService.editMode) {
      this.teachersStorageService
        .getTeacher(this.teachersService.modalsId)
        .subscribe(
          teacher => {
            console.log(teacher);
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
    let teacherAvatar = '';
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
      teacherAvatar = '';
    }

    this.teacherForm = this.formBuilder.group(
      {
        teacherFirstname: [teacherFirstname, validConfig],
        teacherLastname: [teacherLastname, validConfig],
        teacherPatronymic: [teacherPatronymic, validConfig],
        teacherAvatar: [teacherAvatar],
        teacherDateOfBirth: [teacherDateOfBirth, Validators.required],
        teacherEmail: [teacherEmail, validEmail],
        teacherPhone: [teacherPhone, validPhone],
        teacherLogin: [teacherLogin, Validators.required],
        oldPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    this.dialogRef.close();
    this.router.navigate(['admin', 'teachers', this.teacher.id, 'edit'], {
      relativeTo: this.route
    });
  }
}

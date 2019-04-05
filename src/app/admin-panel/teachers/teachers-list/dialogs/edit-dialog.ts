import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TeachersService } from '../../teachers.service';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';

@Injectable()
@Component({
  template: ''
})
export class EditDialogEntryComponent implements OnInit {
  teacher;
  id: number;
  subscription: Subscription;
  editMode;

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
      this.editMode = params.id != null;
      console.log(this.id);
      this.teachersService.modalsId = this.id;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogOverviewComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
      console.log('nazad');
    });
  }
}

@Component({
  selector: 'app-edit-dialog-overview',
  templateUrl: './edit-dialog.html'
})
export class EditDialogOverviewComponent implements OnInit {
  teacher;
  subscription: Subscription;
  editMode = true;
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
    this.teacher = this.teachersStorageService.getTeacher(
      this.teachersService.modalsId
    );
    this.subscription = this.teachersService.teacherChanged.subscribe(
      teacher => {
        this.teacher = teacher;
        console.log(teacher);
        this.initForm();
        return;
      }
    );
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

    this.teacherForm = this.formBuilder.group({
      teacherFirstname: [
        teacherFirstname,
        [Validators.required, Validators.pattern(/[А-ЯІЇЄҐа-яіїєґ()' -]+/)]
      ],
      teacherLastname: [
        teacherLastname,
        [Validators.required, Validators.pattern(/[А-ЯІЇЄҐа-яіїєґ()' -]+/)]
      ],
      teacherPatronymic: [
        teacherPatronymic,
        [Validators.required, Validators.pattern(/[А-ЯІЇЄҐа-яіїєґ()' -]+/)]
      ],
      teacherAvatar: [teacherAvatar],
      teacherDateOfBirth: [teacherDateOfBirth, Validators.required],
      teacherEmail: [teacherEmail, Validators.pattern(/^.+@.+$/)],
      teacherPhone: [teacherPhone, Validators.pattern(/^-?\d+$/)],
      teacherLogin: [teacherLogin, Validators.required],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    this.dialogRef.close();
    this.router.navigate(['admin', 'teachers', this.teacher.id, 'edit'], {
      relativeTo: this.route
    });
  }
}

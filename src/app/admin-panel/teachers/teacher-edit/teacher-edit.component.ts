import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TeachersService } from '../teachers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.scss']
})
export class TeacherEditComponent implements OnInit {
  id: number;
  editMode = false;
  teacherForm: FormGroup;
  subscription: Subscription;
  teacher;

  constructor(
    private route: ActivatedRoute,
    private teachersService: TeachersService,
    private teachersStorageService: TeachersStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      if (this.editMode) {
        this.teacher = this.teachersStorageService.getTeacher(this.id);
        this.subscription = this.teachersService.teacherChanged.subscribe(
          teacher => {
            this.teacher = teacher;
            this.initForm();
            return;
          }
        );
      }

      this.initForm();
    });
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
    let oldPassword = '';
    let newPassword = '';
    console.log(this.teacher);
    if (this.editMode && this.teacher) {
      teacherFirstname = this.teacher.firstname;
      teacherLastname = this.teacher.lastname;
      teacherPatronymic = this.teacher.patronymic;
      // teacherAvatar = this.teacher.avatar;
      teacherDateOfBirth = this.teacher.dateOfBirth;
      teacherEmail = this.teacher.email;
      teacherPhone = this.teacher.phone;
      teacherLogin = this.teacher.login;
    }
    this.teacherForm = new FormGroup({
      teacherFirstname: new FormControl(teacherFirstname, [
        Validators.required,
        Validators.pattern(/[А-ЯІЇЄҐа-яіїєґ()' -]+/)
      ]),
      teacherLastname: new FormControl(teacherLastname, [
        Validators.required,
        Validators.pattern(/[А-ЯІЇЄҐа-яіїєґ()' -]+/)
      ]),
      teacherPatronymic: new FormControl(teacherPatronymic, [
        Validators.required,
        Validators.pattern(/[А-ЯІЇЄҐа-яіїєґ()' -]+/)
      ]),
      teacherAvatar: new FormControl(teacherAvatar),
      teacherDateOfBirth: new FormControl(
        teacherDateOfBirth,
        Validators.required
      ),
      teacherEmail: new FormControl(teacherEmail, Validators.pattern(/^.+@.+$/)),
      teacherPhone: new FormControl(teacherPhone, Validators.pattern(/^-?\d+$/)),
      teacherLogin: new FormControl(teacherLogin, Validators.required),
      oldPassword: new FormControl(oldPassword),
      newPassword: new FormControl(newPassword)
    });
  }
  
  onSubmit() {
 
    let testos = {
      avatar: this.teacher.avatar,
      dateOfBirth: this.teacherForm.value['teacherDateOfBirth'].split('.').reverse().join('-'),
      email: this.teacherForm.value['email'],
      firstname: this.teacherForm.value['teacherFirstname'],
      lastname: this.teacherForm.value['teacherLastname'],
      login: this.teacherForm.value['teacherLogin'],
      newPass: this.teacherForm.value['newPassword'],
      oldPass: this.teacherForm.value['oldPassword'],
      patronymic: this.teacherForm.value['teacherPatronymic'],
      phone: this.teacherForm.value['teacherPhone']
    };

    console.log(this.teacher)
    console.log(this.teacher)
    
    this.teachersStorageService
      .updateTeacher(this.id, testos)
      .subscribe(
        (response: Response) => console.log(response),
        error => console.log(error)
      );
  }
}

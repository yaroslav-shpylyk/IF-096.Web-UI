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

      // if (teacher['ingredients']) {
      //   for (let ingredient of teacher.ingredients) {
      //     teacherIngredients.push(
      //       new FormGroup({
      //         name: new FormControl(ingredient.name, Validators.required),
      //         amount: new FormControl(ingredient.amount, [
      //           Validators.required,
      //           Validators.pattern(/^[1-9]+[0-9]*$/)
      //         ])
      //       })
      //     );
      //   }
      // }
    }
    this.teacherForm = new FormGroup({
      teacherFirstname: new FormControl(teacherFirstname, Validators.required),
      teacherLastname: new FormControl(teacherLastname, Validators.required),
      teacherPatronymic: new FormControl(
        teacherPatronymic,
        Validators.required
      ),
      teacherAvatar: new FormControl(teacherAvatar),
      teacherDateOfBirth: new FormControl(
        teacherDateOfBirth,
        Validators.required
      ),
      teacherEmail: new FormControl(teacherEmail, Validators.email),
      teacherPhone: new FormControl(teacherPhone),
      teacherLogin: new FormControl(teacherLogin),
      oldPassword: new FormControl(oldPassword),
      newPassword: new FormControl(newPassword)
    });
  }

  onSubmit() {

    let test = {
      avatar: 'asdasd',
      dateOfBirth: '2002-02-01',
      email: 'null@ukr.net',
      firstname: 'Валерка',
      lastname: 'Бубликок',
      login: 'aEinst14sw',
      newPass: 'password1',
      oldPass: 'password',
      patronymic: 'Опанасовичі',
      phone: '03123123123'
    };

    this.teachersStorageService.updateTeacher(this.id, test)
    .subscribe(
      (response: Response) => console.log(response),
      error => console.log(error)
    );
  }
}

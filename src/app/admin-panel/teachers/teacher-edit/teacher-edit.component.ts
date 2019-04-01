import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TeachersService } from '../teachers.service';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MustMatch } from '../must-match.validator';

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

  registerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private teachersService: TeachersService,
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private formBuilder: FormBuilder
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

    this.registerForm = this.formBuilder.group(
      {
        password: [''],
        confirmPassword: ['']
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
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

    if (this.editMode && this.teacher) {
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
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      }
    );
  }

  onSubmit() {
    let newValues = {
      avatar: this.teacher
        ? this.teacher.avatar
        : 'https://png.pngtree.com/svg/20161212/f93e57629c.svg',
      dateOfBirth: this.teacherForm.value['teacherDateOfBirth']
        .split('.')
        .reverse()
        .join('-'),
      email: this.teacherForm.value['teacherEmail'],
      firstname: this.teacherForm.value['teacherFirstname'],
      lastname: this.teacherForm.value['teacherLastname'],
      login: this.teacherForm.value['teacherLogin'],
      newPass: this.teacherForm.value['newPassword'],
      oldPass: this.teacherForm.value['oldPassword'],
      patronymic: this.teacherForm.value['teacherPatronymic'],
      phone: this.teacherForm.value['teacherPhone']
    };

    console.log(`шлю `)
    console.log(newValues)

    if (!this.editMode) {
      console.log('das');
      this.teachersStorageService.addTeacher(newValues).subscribe(
        (response: Response) => {
          this.teachersStorageService.getTeachers();
        },
        error => console.log(error)
      );
    } else {
      this.teachersStorageService
        .updateTeacher(this.id, newValues)
        .pipe(
          map(response => {
            let teacher = response['data'];
            if (!teacher['avatar']) {
              teacher['avatar'] =
                'https://png.pngtree.com/svg/20161212/f93e57629c.svg';
            }
            teacher.id = this.id;
            return teacher;
          })
        )
        .subscribe(
          (response: Response) => {
            let outdatedTeachers = this.teachersService.getTeachers();
            for (let i = 0; i < outdatedTeachers.length; i++) {
              if (outdatedTeachers[i].id == this.id) {
                outdatedTeachers.splice(i, 1, response);
              }
            }
            this.teachersService.setTeachers(outdatedTeachers);
          },
          error => console.log(error)
        );
    }
    this.router.navigate(['/admin/teachers/'], {
      queryParams: {
        message: this.editMode
          ? 'Нові дані успішно внесено'
          : 'Нового викладача додано'
      }
    });
  }

  onCancel() {
    this.router.navigate(['/admin/teachers/'], {
      queryParams: { message: 'Будь ласка, обиріть викладача' }
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

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
            return
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
    // let newPassword = '';
    // let oldPassword = '';
    console.log(this.teacher)
    if (this.editMode && this.teacher) {
     

      teacherFirstname = this.teacher.firstname;
      teacherLastname = this.teacher.lastname;
      teacherPatronymic = this.teacher.patronymic;
      teacherAvatar = this.teacher.avatar;
      teacherDateOfBirth = this.teacher.dateOfBirth;
      teacherEmail = this.teacher.email;
      teacherPhone = this.teacher.phone;


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
      firstname: new FormControl(teacherFirstname, Validators.required),
      teacherLastname: new FormControl(teacherLastname, Validators.required),
      teacherPatronymic: new FormControl(teacherPatronymic, Validators.required),
      teacherAvatar: new FormControl(teacherAvatar),
      teacherDateOfBirth: new FormControl(teacherDateOfBirth, Validators.required),
      teacherEmail: new FormControl(teacherEmail),
      teacherPhone: new FormControl(teacherPhone)
    });
  }
}

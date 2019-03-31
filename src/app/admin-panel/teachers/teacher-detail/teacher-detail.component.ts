import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeachersService } from '../teachers.service';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {
  teacher;
  id: number;
  subscription: Subscription;

  constructor(
    private teachersService: TeachersService,
    private route: ActivatedRoute,
    private teachersStorageService: TeachersStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.teacher = this.teachersStorageService.getTeacher(this.id);
      this.subscription = this.teachersService.teacherChanged.subscribe(
        teacher => {
          this.teacher = teacher;
        }
      );
    });
  }
}
 
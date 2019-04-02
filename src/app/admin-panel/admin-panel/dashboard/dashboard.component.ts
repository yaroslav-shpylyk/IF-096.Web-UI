import {Component, OnInit, ViewChild} from '@angular/core';
import { SubjectService } from '../../../services/subject.service';
import { TeacherService } from '../../../services/teacher.service';
import { TeacherData } from '../../../models/teacher-data';
import { SubjectData } from '../../../models/subject-data';
import { ClassService} from '../../../services/class.service';
import { ClassData } from '../../../models/class-data';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public data = {
    subjects: 0,
    students: 0,
    classes: 0,
    teachers: 0
  };
  public icons = ['library_books', 'school', 'group_work', 'person'];
  public titles = ['Предмети', 'Учні', 'Класи', 'Вчителі'];
  public listLinks = ['/subjects', '/students', '/classes', '/teachers'];
  public buttonTitles = ['СПИСОК ПРЕДМЕТІВ', 'СПИСОК СТУДЕНТІВ', 'СПИСОК КЛАСІВ', 'СПИСОК ВЧИТЕЛІВ'];
  public logoBgColors = ['#7e57c2', '#42a5f5', '#ffb300', '#66bb6a'];
  constructor(private subjectService: SubjectService, private teacherService: TeacherService,
              private classService: ClassService, private studentsService: StudentService) { }
  public dataValues(): any {
    return Object.values(this.data);
}
  ngOnInit() {
    this.subjectService.getSubjects().subscribe((result: SubjectData[]) => this.data.subjects = result.length);
    this.teacherService.getTeachers().subscribe((result: TeacherData[]) => this.data.teachers = result.length);
    this.studentsService.getActiveStudents().subscribe((result: number) => this.data.students = result);
    this.classService.getActiveClasses().subscribe((result: ClassData[]) => this.data.classes = result.length);
  }
}


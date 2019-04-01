import { Component, OnInit } from '@angular/core';
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
  public subjects: number;
  public students: number;
  public classes: number;
  public teachers: number;
  constructor(private subjectService: SubjectService, private teacherService: TeacherService,
              private classService: ClassService, private studentsService: StudentService) { }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe((result: SubjectData[]) => this.subjects = result.length);
    this.teacherService.getTeachers().subscribe((result: TeacherData[]) => this.teachers = result.length);
    this.studentsService.getActiveStudents().subscribe((result: number) => this.students = result);
    this.classService.getActiveClasses().subscribe((result: ClassData[]) => this.classes = result.length);
  }
}

import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../services/subject.service';
import { TeacherService } from '../../../services/teacher.service';
import { TeacherData } from '../../../models/teacher-data';
import { SubjectData } from '../../../models/subject-data';
import { ClassService} from '../../../services/class.service';
import { ClassData } from '../../../models/class-data';

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
              private classService: ClassService) { }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe((result: SubjectData[]) => this.subjects = result.length);
    this.teacherService.getTeachers().subscribe((result: TeacherData[]) => this.teachers = result.length);
    this.classService.getClasses().subscribe((result: ClassData[]) => {
      this.classes = result.filter(currClass => currClass.isActive).length;
      this.students = result.reduce((students, currClass) => {
        return currClass.isActive ?
          students + currClass.numOfStudents : students;
      }, 0);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../services/subject.service';
import { TeacherService } from '../../../services/teacher.service';
import { TeacherData } from '../../../models/teacher-data';
import { SubjectData } from '../../../models/subject-data';
import { ClassService} from '../../../services/class.service';
import { ClassData } from '../../../models/class-data';
import { StudentService } from '../../../services/student.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public streamClasses: FormGroup;
  public data = {
    subjects: 0,
    students: 0,
    classes: 0,
    teachers: 0
  };
  public icons = ['library_books', 'school', 'group_work', 'person'];
  public titles = ['Предмети', 'Учні', 'Класи', 'Вчителі'];
  public listLinks = ['/subjects', '/students', '/classes', '/teachers'];
  public buttonTitles = ['СПИСОК ПРЕДМЕТІВ', 'СПИСОК УЧНІВ', 'СПИСОК КЛАСІВ', 'СПИСОК ВЧИТЕЛІВ'];
  public peopleChartLabels = [];
  public peopleChartData = [];
  public peopleChartType = 'doughnut';
  public peopleChartOptions = {
    legend: {
      position: 'right',
      align: 'end',
      labels: {
        fontColor: '#585858',
        boxWidth: 20,
        padding: 20,

      }
    }
  };
  constructor(private subjectService: SubjectService, private teacherService: TeacherService,
              private classService: ClassService, private studentService: StudentService) { }
  public dataValues(): any {
    return Object.values(this.data);
}
  ngOnInit() {
    this.createStreamClassesForm();
    this.subjectService.getSubjects().subscribe((result: SubjectData[]) => this.data.subjects = result.length);
    this.teacherService.getTeachers().subscribe((result: TeacherData[]) => this.data.teachers = result.length);
    this.studentService.getStudents('active').subscribe((result: number) => this.data.students = result);
    this.classService.getClasses('active').subscribe((result: ClassData[]) => this.data.classes = result.length);
    this.classService.getClassesByStream(Math.floor(Math.random() * 12) + 1).subscribe((result: ClassData[]) => {
      const data = [];
      const labels = [];
      result.forEach(item => {
        data.push(item.numOfStudents);
        labels.push(item.className);
      });
      this.peopleChartLabels = labels;
      this.peopleChartData = data;
      console.log(data);
    });
  }

  createStreamClassesForm(): void {
    this.streamClasses = new FormGroup({
      classes: new FormControl('', [
        Validators.required
      ])
    });
  }
}


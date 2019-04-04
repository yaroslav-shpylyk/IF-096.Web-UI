import {Component, OnInit, ViewChild} from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { TeacherService } from '../../services/teacher.service';
import { TeacherData } from '../../models/teacher-data';
import { SubjectData } from '../../models/subject-data';
import { ClassService} from '../../services/class.service';
import { ClassData } from '../../models/class-data';
import { StudentService } from '../../services/student.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentsOfStream } from '../../models/students-of-stream';
import { ChartType, ChartOptions } from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;
  public streamClasses: FormGroup;
  public data = {
    subjects: 0,
    students: 0,
    classes: 0,
    teachers: 0
  };
  public graphTypes = {
    bar: 'Лінійний',
    pie: 'Пиріг',
    doughnut: 'Бублик',
  };
  public objectKeys = Object.keys;
  public numberOfClasses = new Array(12).fill('');
  public studentsOfStream = 0;
  public classesStream: number;
  public icons = ['library_books', 'school', 'group_work', 'person'];
  public titles = ['Предмети', 'Учні', 'Класи', 'Вчителі'];
  public listLinks = ['/subjects', '/students', '/classes', '/teachers'];
  public buttonTitles = ['СПИСОК ПРЕДМЕТІВ', 'СПИСОК УЧНІВ', 'СПИСОК КЛАСІВ', 'СПИСОК ВЧИТЕЛІВ'];
  public chartLabels = [];
  public chartData = [];
  public chartType = 'bar';
  public chartRoundOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right'
    }
  };
  public chartVerticalOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        title: (tooltipItem, data) => {
          return '';
        }
      }
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: value => {
            if (value % 1 === 0) {
              return value;
            }
          }
        }
      }]
    }
  };
  constructor(private subjectService: SubjectService, private teacherService: TeacherService,
              private classService: ClassService, private studentService: StudentService) { }
  public dataValues(): any {
    return Object.values(this.data);
}
  ngOnInit(): void {
    this.createStreamClassesForm();
    this.subjectService.getSubjects().subscribe((result: SubjectData[]) => this.data.subjects = result.length);
    this.teacherService.getTeachers().subscribe((result: TeacherData[]) => this.data.teachers = result.length);
    this.studentService.getNumberOfStudents('active').subscribe((result: number) => this.data.students = result);
    this.classService.getClasses('active').subscribe((result: ClassData[]) => this.data.classes = result.length);
    this.studentService.getStudentsByStream(8).subscribe((result: { allStudents: number, studentsData: StudentsOfStream[]}) => {
      this.updateChart(result);
    });
  }

  private createStreamClassesForm(): void {
    this.streamClasses = new FormGroup({
      classes: new FormControl('', [
        Validators.required
      ]),
      graphType: new FormControl('bar', [
        Validators.required
      ])
    });
  }

  public submitChartChange(form: FormGroup): void {
    const controls = form.controls;
    const values = form.value;
    if (controls.graphType.errors || controls.classes.errors) {
      return;
    }
    this.studentService.getStudentsByStream(values.classes)
      .subscribe((result: { allStudents: number, studentsData: StudentsOfStream[]}) => {
        this.chartType = values.graphType;
        this.updateChart(result);
    });
  }
  private updateChart(response) {
    const data = [];
    const labels = [];
    if (this.chartType === 'bar') {
      response.studentsData.forEach(item => {
        const form = {
          data: [item.numOfStudents],
          label: item.className
        };
        data.push(form);
      });
    } else {
      response.studentsData.forEach(item => {
        data.push(item.numOfStudents);
        labels.push(item.className);
      });
    }
    this.classesStream = parseInt(response.studentsData[0].className, 10);
    this.studentsOfStream = response.allStudents;
    this.chartLabels = labels;
    this.chartData = data;
  }
}


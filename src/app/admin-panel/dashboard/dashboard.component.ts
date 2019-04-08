import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { TeacherService } from '../../services/teacher.service';
import { TeacherData } from '../../models/teacher-data';
import { SubjectData } from '../../models/subject-data';
import { ClassService} from '../../services/class.service';
import { ClassData } from '../../models/class-data';
import { StudentsService } from '../../services/students.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChartType, ChartOptions } from 'chart.js';
import { ClassesFromStream } from '../../models/classes-from-stream';
import { AsyncStreamValidator } from './async-stream.validator';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(FormGroupDirective) chartOptions;
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
  public listLinks = ['subjects', 'students', 'classes', 'teachers'];
  public buttonTitles = ['СПИСОК ПРЕДМЕТІВ', 'СПИСОК УЧНІВ', 'СПИСОК КЛАСІВ', 'СПИСОК ВЧИТЕЛІВ'];
  public chartLabels = [];
  public chartData = [];
  public chartType: ChartType = 'bar';
  public chartRoundOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    }
  };
  public chartVerticalOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        title: () => {
          return '';
        }
      }
    },
    legend: {
      display: false,
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
              private classService: ClassService, private studentService: StudentsService) { }

  /**
   * Method returns values of dashboard data
   * @returns - Array with values of dashboard data
   */
  public dataValues(): number[] {
    return Object.values(this.data);
  }
  ngOnInit(): void {
    this.createStreamClassesForm();
    this.subjectService.getSubjects().subscribe((result: SubjectData[]) => this.data.subjects = result.length);
    this.teacherService.getTeachers().subscribe((result: TeacherData[]) => this.data.teachers = result.length);
    this.studentService.getNumberOfStudents('active').subscribe((result: number) => this.data.students = result);
    this.classService.getClasses('active').subscribe((result: ClassData[]) => this.data.classes = result.length);
    this.classService.getClassesByStream().subscribe((result: ClassesFromStream) => {
      this.updateChart(result);
    });
  }

  /**
   * Method creates a reactive form for chart options
   */
  private createStreamClassesForm(): void {
    this.streamClasses = new FormGroup({
      classes: new FormControl('', [
        Validators.required,
      ], AsyncStreamValidator.createValidator(this.classService)),
      graphType: new FormControl('bar', [
        Validators.required
      ])
    });
  }

  /**
   * Method which called after formSubmit of chart options
   * @param form - Object of form with, which gives form controls and form values
   */
  public submitChartChange(form: FormGroup): void {
    const controls = form.controls;
    const values = form.value;
    console.log(form);
    if (controls.graphType.errors || controls.classes.errors) {
      return;
    }
    this.classService.getClassesByStream(values.classes)
      .subscribe((result: ClassesFromStream) => {
        this.chartType = values.graphType;
        this.updateChart(result);
        this.chartOptions.resetForm();
        this.streamClasses.reset({
          classes: '',
          graphType: 'bar'
        });
    });
  }

  /**
   * Method updates data in chart
   * @param response - Object with number of all students in stream and array with classNames and number of
   * students in each class
   */
  private updateChart(response): void {
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

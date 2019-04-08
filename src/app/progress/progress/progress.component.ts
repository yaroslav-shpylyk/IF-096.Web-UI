import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { SubjectData } from '../../models/subject-data';
import { ClassService } from '../../services/class.service';
import { ClassData } from '../../models/class-data';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  public chartOptions: FormGroup;
  public subjects: SubjectData[];
  public classes: ClassData[];
  public students: Student[];
  constructor(private subjectService: SubjectService, private classService: ClassService, private studentService: StudentsService) { }

  ngOnInit() {
    this.createForm();
    this.subjectService.getSubjects().subscribe(result => this.subjects = result);
    this.classService.getClasses('active').subscribe(result => this.classes = result);

  }
  private createForm(): void {
    this.chartOptions = new FormGroup({
      subjects: new FormControl('', [
        Validators.required
      ]),
      classes: new FormControl('', [
        Validators.required
      ]),
      students: new FormControl({value: ''}),
      startDate: new FormControl('', [
        Validators.required
      ]),
      endDate: new FormControl('', [
        Validators.required
      ]),
    });
  }
  public chartOptionChange(fieldName: string, event) {
    switch (fieldName) {
      case 'subjects': {
        this.classService.getClasses('active', event.value).subscribe(result => this.classes = result);
        break;
      }
      case 'classes': {
        this.subjectService.getSubjects(event.value).subscribe(result => this.subjects = result);
        this.studentService.getStudents(event.value).subscribe(result => this.students = result);
        break;
      }
      case 'startDate': {
        break;
      }
      case 'endDate': {
        break;
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { ClassService } from '../../services/class.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { SubjectService } from '../../services/subject.service';
import { TeachersJournalService } from '../../services/teachers-journal.service';
import { MatStepperModule } from '@angular/material/stepper';
import { SubjectData } from '../../models/subject-data';
import { ClassData } from '../../models/class-data';
import { TeacherData } from '../../models/teacher-data';

@Component({
  selector: 'app-teacher-connection',
  templateUrl: './teacher-connection.component.html',
  styleUrls: ['./teacher-connection.component.scss']
})
export class TeacherConnectionComponent implements OnInit {

  constructor(
    private teacherService: TeacherService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private teacherjournalServise: TeachersJournalService
  ) {}
  teachers: TeacherData[];
  subjects: SubjectData[];
  classes: ClassData[];
  teacherChoise = 'Виберіть вчителя';
  subjectChoise = 'Виберіть предмет';
  classesChoise = 'Виберіть клас';

  myForm = this.fb.group({
    class: ['', Validators.required],
    subject: ['', Validators.required],
    teacher: ['', Validators.required]
  });

  /**
   * Method adds after selecting the current teacher
   * to the label before the next step
   * @param event - object that is emitted when the select value has changed
   */
  addTeacherChoice(event) {
    this.teacherChoise = `Вибрано вчителя: ${event.value.firstname} ${
      event.value.lastname
    }`;
  }

  /**
   * Method adds after selecting the current subject
   * to the label before the next step
   * @param event - object that is emitted when the select value has changed
   */
  addSubjChoice(event) {
    this.subjectChoise = `Вибрано предмет: ${event.value.subjectName}`;
  }

  /**
   * Method adds after selecting the current class
   * to the label before the next step
   * @param event - object that is emitted when the select value has changed
   */
  addClassesChoice(event) {
    this.classesChoise = `Вибрано клас: ${event.value.className}`;
  }

   /**
   * The method that is called after the formSubmit
   * confirmation of the choice of values ​​to add them to the journl
   * @param data - object of the form that gives values ​​selected in the form
   */
  onSubmit(data) {
    this.teacherjournalServise
      .sentDataToJournal(
        data,
        data.teacher.id,
        data.class.id,
        data.subject.subjectId
      )
      .subscribe();
  }

  ngOnInit() {
    /**
     * Getting an array of teachers from the service of teachers,
     * for further use of specific data
     */
    this.teacherService
      .getTeachers()
      .subscribe(teachers => {this.teachers = teachers;});

    /**
     * Getting an array of subjects from the subject service,
     * for further use of specific data
     */
    this.subjectService
      .getSubjects()
      .subscribe(subjects => {this.subjects = subjects;});

    /**
     * Getting an array of classes from the class service,
     * for further use of specific data
     */
    this.classService
      .getClasses('all')
      .subscribe(classes => {this.classes = classes;});
  }
}

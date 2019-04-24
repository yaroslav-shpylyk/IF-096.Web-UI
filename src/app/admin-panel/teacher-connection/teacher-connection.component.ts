import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import { ClassService } from 'src/app/services/class.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';
import { TeachersJournalService } from 'src/app/services/teachers-journal.service';
import { MatStepperModule } from '@angular/material/stepper';
import { SubjectData } from "src/app/models/subject-data";
import { ClassData } from "src/app/models/class-data";
import { TeacherData } from "src/app/models/teacher-data";
@Component({
  selector: 'app-teacher-connection',
  templateUrl: './teacher-connection.component.html',
  styleUrls: ['./teacher-connection.component.scss']
})
export class TeacherConnectionComponent implements OnInit {
  teachers: TeacherData[];
  subjects: SubjectData[];
  classes: ClassData[];
  teacherChoise = "Виберіть вчителя";
  subjectChoise = "Виберіть предмет";
  classesChoise = "Виберіть клас";

  constructor(
    private teacherService: TeacherService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private teacherjournalServise: TeachersJournalService
  ) {}

  addTeacherChoice(event) {
    this.teacherChoise = `Вибрано вчителя: ${event.value.firstname} ${
      event.value.lastname
    }`;
  }

  addSubjChoice(event) {
    this.subjectChoise = `Вибрано предмет: ${event.value.subjectName}`;
  }

  addClassesChoice(event) {
    this.classesChoise = `Вибрано клас: ${event.value.className}`;
  }

  myForm = this.fb.group({
    class: ["", Validators.required],
    subject: ["", Validators.required],
    teacher: ["", Validators.required]
  });

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
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });

    this.subjectService
      .getSubjects()
      .subscribe(subjects => (this.subjects = subjects));

    this.classService
      .getClasses('all')
      .subscribe(classes => (this.classes = classes));
  }
}

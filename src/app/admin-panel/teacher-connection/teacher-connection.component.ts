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

@Component({
  selector: 'app-teacher-connection',
  templateUrl: './teacher-connection.component.html',
  styleUrls: ['./teacher-connection.component.scss']
})
export class TeacherConnectionComponent implements OnInit {
  teachers;
  subjects;
  classes;

  constructor(
    private teacherService: TeacherService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private teacherjournalServise: TeachersJournalService
  ) {}

  myForm = this.fb.group({
    classId: ['', Validators.required],
    subjectId: ['', Validators.required],
    teacherId: ['', Validators.required]
  });

  onSubmit(data) {
    this.teacherjournalServise.sentDataToJournal(
      data,
      data.teacherId,
      data.classId,
      data.subjectId
    ).subscribe(data);
  }

  ngOnInit() {
    this.teacherService
      .getTeachers()
      .subscribe(teachers => (this.teachers = teachers));

    this.subjectService
      .getSubjects()
      .subscribe(subjects => (this.subjects = subjects));

    this.classService
      .getClasses('all')
      .subscribe(classes => (this.classes = classes));
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { TeachersStorageService } from '../../../../services/teachers-storage.service';
import { SubjectService } from '../../../../services/subject.service';
import { ClassService } from '../../../../services/class.service';
import { TeacherService } from '../../../../services/teacher.service';
import { TeachersJournalService } from '../../../../services/teachers-journal.service';
import { SubjectData } from '../../../../models/subject-data';
import { ClassData } from '../../../../models/class-data';
import { TeacherData } from '../../../../models/teacher-data';

@Component({
  template: ''
})
export class ConnectToJournalComponent implements OnInit {
  private teacherId: number;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private teacherStorageService: TeachersStorageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.teacherId = params.id;
    });

    this.teacherStorageService.getTeacher(this.teacherId).subscribe(teacher => {
      setTimeout(() => {
        const teacherName = `${teacher.firstname} ${teacher.lastname}`;
        this.openDialog(teacherName);
      }, 0);
    });
  }  
    
  openDialog(teacherName: string): void {
    const dialogRef = this.dialog.open(ConnectToJournalDialogComponent, {
      width: '400px',
      data: {
        id: this.teacherId,
        name: teacherName
      }
    });
    dialogRef.backdropClick().subscribe(() => {
      this.router.navigate(['../../'], {
        relativeTo: this.route,
        replaceUrl: true
      });
    });
  }
}

@Component({
  selector: 'app-connect-to-journal-dialog',
  templateUrl: './connect-to-journal-dialog.component.html',
  styleUrls: ['./connect-to-journal-dialog.component.scss']
})
export class ConnectToJournalDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private teachersStorageService: TeachersStorageService,
    private teacherService: TeacherService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private teacherjournalServise: TeachersJournalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  teachers: TeacherData[];
  subjects: SubjectData[];
  classes: ClassData[];
  teacher: boolean;
  subject: boolean;
  class: boolean;

  myForm = this.fb.group({
    class: ['', Validators.required],
    subject: ['', Validators.required],
    teacher: [this.data.id, Validators.required]
  });

  /**
   * The method that is called after the formSubmit
   * confirmation of the choice of values ​​to add them to the journl
   * @param data - object of the form that gives values ​​selected in the form
   */
  onSubmit(data) {
    this.teacherjournalServise
      .sentDataToJournal(
        data,
        this.data.id,
        data.class.id,
        data.subject.subjectId
      )
      .subscribe();
  }

  /**
     * Getting an array of teacher from the teachersStorageService service,
     * for further use of specific data
     */
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.data;
    });

    /**
     * Getting an array of subjects from the subject service,
     * for further use of specific data
     */
    this.subjectService
      .getSubjects()
      .subscribe(subjects => { this.subjects = subjects; });

    /**
     * Getting an array of classes from the class service,
     * for further use of specific data
     */
    this.classService
      .getClasses('all')
      .subscribe(classes => { this.classes = classes; });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { StudentBookData } from '../../../models/student-book-data';

@Component({
  selector: 'app-subject-marks',
  templateUrl: './subject-marks.component.html',
  styleUrls: ['./subject-marks.component.scss']
})
export class SubjectMarksComponent implements OnInit {

  constructor() { }
  @Input() subjectMarks: StudentBookData;
  @Input() subjectTitle: string;

  ngOnInit() { }

}

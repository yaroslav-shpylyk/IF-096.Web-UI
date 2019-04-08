import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectData } from 'src/app/models/subject-data';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public subjects: SubjectData[];

  constructor(private SubjectService: SubjectService) { }

  ngOnInit() {
    this.SubjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
  }
}

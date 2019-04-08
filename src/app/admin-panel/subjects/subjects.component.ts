import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectData } from 'src/app/models/subject-data';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public subjects: SubjectData[];
  public displayedColumns: string[] = ['subjectName', 'subjectDescription', 'edit'];
  public dataSource: MatTableDataSource<SubjectData>;

  constructor(private SubjectService: SubjectService) { }

  ngOnInit() {
    this.SubjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
      this.dataSource = new MatTableDataSource(this.subjects);
    });
  }
}

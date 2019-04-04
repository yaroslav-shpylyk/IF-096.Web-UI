import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Subj } from '../../../models/subjects-data';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public subjects: Subj[];
  public filteredSubjects: Subj[];
  public searchBar: string;

  constructor(private SubjectsService: SubjectsService) { }

  ngOnInit() {
    this.SubjectsService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
      this.filteredSubjects = subjects;
    });
  }

  onChange(ev) {
    this.searchBar = ev.target.value.toLowerCase();
    this.filteredSubjects = this.subjects.filter(subj => {
      return subj.subjectName.toLowerCase().indexOf(this.searchBar) !== -1;
    });
    
  }

}

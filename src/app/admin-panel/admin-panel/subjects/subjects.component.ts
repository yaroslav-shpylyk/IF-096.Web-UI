import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public subjects: any;
  public filteredSubjects: any;
  public searchBar: string;

  constructor(private SubjectsService: SubjectsService) { }

  ngOnInit() {
    this.SubjectsService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
      this.filteredSubjects = subjects;
    });
  }

  onChange(ev) {
    this.searchBar = ev.target.value;
   
    let rx = new RegExp(this.searchBar,'i');

    this.filteredSubjects = 				
      this.subjects.filter(subj => {
        return subj.subjectName.match(rx);
      });
    
  }

}

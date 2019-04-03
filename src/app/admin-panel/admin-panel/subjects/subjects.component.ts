import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjects: any;

  constructor(private SubjectsService: SubjectsService) { }

  ngOnInit() {
  }

  showList(){
    this.SubjectsService.getSubjects().subscribe(result =>  this.subjects = result)
  }

}

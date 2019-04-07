import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  constructor(private progressService: ProgressService) { }

  ngOnInit() {
    this.progressService.getClassesWithSubjects().subscribe(result => console.log(result));
  }

}

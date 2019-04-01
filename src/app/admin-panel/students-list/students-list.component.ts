import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { ActivatedRoute } from "@angular/router";
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  activeClass: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.data.students)
    this.activeClass = this.route.snapshot.data.students;
  }
}

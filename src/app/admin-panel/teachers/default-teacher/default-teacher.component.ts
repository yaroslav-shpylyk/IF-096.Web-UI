import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-default-teacher',
  templateUrl: './default-teacher.component.html',
  styleUrls: ['./default-teacher.component.scss']
})
export class DefaultTeacherComponent implements OnInit {
  message: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.queryParams.message) {
      this.message = this.route.snapshot.queryParams.message
    }
  }

}

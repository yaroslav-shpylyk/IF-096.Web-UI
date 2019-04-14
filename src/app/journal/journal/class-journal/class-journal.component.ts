import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-journal',
  templateUrl: './class-journal.component.html',
  styleUrls: ['./class-journal.component.scss']
})
export class ClassJournalComponent implements OnInit {
  idClass: number;
  idTeacher: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idClass = +params.idClass;
      this.idTeacher = +params.idTeacher;
      console.log(`idClass ${this.idClass}`);
      console.log(`idTeacher ${this.idTeacher}`);
      if (!this.idClass && !this.idTeacher) {
        this.idTeacher = this.authService.getUserId();
        console.log(`shas ${this.idTeacher}`);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import { TeachersService } from '../teachers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {
  teachers; 
  subscription: Subscription;

  constructor(
    private teachersStorageService: TeachersStorageService,
    private teachersService: TeachersService
  ) {}

  ngOnInit() {
    this.teachers = this.teachersStorageService.getTeachers();
    this.subscription = this.teachersService.teachersChanged.subscribe(
      teachers => {
        this.teachers = teachers;
      }
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}

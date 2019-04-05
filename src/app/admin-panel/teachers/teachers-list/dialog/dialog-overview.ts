import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeachersService } from '../../teachers.service';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';

@Injectable()
@Component({
  template: ''
})
export class DialogEntryComponent implements OnInit {
  teacher;
  id: number;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private teachersService: TeachersService
  ) {
    this.openDialog();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      console.log(this.id);
      this.teachersService.modalsId = this.id;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}


@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html'
})
export class DialogOverviewExampleDialog implements OnInit {
  teacher;
  subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private teachersService: TeachersService,
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.teacher = this.teachersStorageService.getTeacher(
      this.teachersService.modalsId
    );

    this.subscription = this.teachersService.teacherChanged.subscribe(
      teacher => {
        this.teacher = teacher;
        this.router.navigate([this.teacher.id], { relativeTo: this.route });
      }
    );
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    this.dialogRef.close();
    this.router.navigate([ 'admin', 'teachers', this.teacher.id, 'edit'], { relativeTo: this.route });
  }
}

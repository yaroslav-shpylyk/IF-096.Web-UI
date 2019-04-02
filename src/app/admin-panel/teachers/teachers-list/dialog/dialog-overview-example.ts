import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeachersService } from '../../teachers.service';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';

@Injectable()
@Component({
  template: ''
})
export class DialogEntryComponent {
  teacher;
  id: number;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private teachersService: TeachersService,
    private teachersStorageService: TeachersStorageService
  ) {
    this.openDialog();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // console.log(params.id)
      this.id = +params.id;
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
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
  styleUrls: []
})
export class DialogOverviewExample {}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
})
export class DialogOverviewExampleDialog {
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

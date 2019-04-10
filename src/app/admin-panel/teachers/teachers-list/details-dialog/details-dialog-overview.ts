import { Component, Injectable, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Teacher } from '../../helpers/teacher.model';

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
    private teachersStorageService: TeachersStorageService
  ) {
    this.openDialog();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.teachersStorageService.modalsId = this.id;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DetailsDialogOverviewComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['../'], {
        relativeTo: this.route,
        replaceUrl: true
      });
    });
  }
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'details-dialog-overview.html',
  styleUrls: ['./details-dialog-overview.scss']
})
export class DetailsDialogOverviewComponent implements OnInit {
  teacher: Teacher;
  teacherJournal;

  constructor(
    public dialogRef: MatDialogRef<DetailsDialogOverviewComponent>,
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit() {
    this.teachersStorageService
      .getTeacher(this.teachersStorageService.modalsId)
      .subscribe(
        teacher => {
          this.teacher = teacher;
          this.teacher.id = this.teachersStorageService.modalsId;
        },
        error => console.log(error)
      );

    this.teachersStorageService
      .getTeacherJournal(this.teachersStorageService.modalsId)
      .subscribe(
        teacherJournal => {
          this.teacherJournal = teacherJournal;
        },
        error => console.log(error)
      );
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    this.dialogRef.close();
    this.router.navigate(['admin-panel', 'teachers', this.teacher.id, 'edit'], {
      relativeTo: this.route,
      replaceUrl: true
    });
  }
}

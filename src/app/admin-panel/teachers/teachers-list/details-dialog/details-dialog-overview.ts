import { Component, Injectable, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TeacherData } from 'src/app/models/teacher-data';

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'details-dialog-overview.html',
  styleUrls: ['./details-dialog-overview.scss']
})
export class DetailsDialogOverviewComponent implements OnInit {
  teacher: TeacherData;

  constructor(
    public dialogRef: MatDialogRef<DetailsDialogOverviewComponent>,
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  /**
   * Once component is loaded it tries to get previously stored teacher
   * object from service. If there is no one found it will take parameter
   * for the current route and use it to fetch from server a single teacher.
   */
  ngOnInit() {
    this.teacher = this.teachersStorageService.teacherToDisplay;
    this.teachersStorageService.teacherToDisplay = null;
    if (!this.teacher) {
      this.teachersStorageService
        .getTeacherAndJournal(this.teachersStorageService.modalsId)
        .subscribe(teacher => {
          this.teacher = teacher;
        });
    }
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    this.teachersStorageService.teacherToDisplay = this.teacher;
    this.dialogRef.close();
    this.router.navigate(['admin-panel', 'teachers', this.teacher.id, 'edit'], {
      relativeTo: this.route,
      replaceUrl: true
    });
  }
}

/**
 * Dummy component for the path 'teachers:id' that manages opening,
 * closing, and passing data to the dialog. When the dummy component gets
 * initialized on ‘teachers:id’ navigation, it will open the dialog.
 */
@Injectable()
@Component({
  template: ''
})
export class DialogEntryComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private teachersStorageService: TeachersStorageService
  ) {
    this.openDialog();
  }

  /**
   * As OverviewComponent component doesn’t have direct access to the
   * activated route its parameter 'id' is taken from current component
   * and passed along using a service.
   * So that OverviewComponent knows which teacher must be showed.
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.teachersStorageService.modalsId = +params.id;
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

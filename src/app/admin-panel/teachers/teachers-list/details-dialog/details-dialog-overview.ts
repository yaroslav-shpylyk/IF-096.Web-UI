import { Component, Injectable, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TeachersStorageService } from '../../../../services/teachers-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TeacherData } from '../../../../models/teacher-data';

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
          teacher.id = this.teachersStorageService.modalsId;
          this.teacher = teacher;
        });
    }
  }

  /**
   * Method closes information dialog.
   */
  onBackClick(): void {
    this.dialogRef.close();
    this.router.navigate(['admin-panel', 'teachers'], {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  /**
   * Method navigates to the new rout which is
   * dedicated for a component editing selected teacher.
   */
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
  prevModalId = +this.route.snapshot.params.id;
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
      if (this.prevModalId !== +params.id) {
        this.prevModalId = +params.id;
        this.openDialog();
      }
    });
  }

  /**
   * Method opening a modal window and subscribing to back button click
   * in order to navigate back to to the previous screen on closing.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DetailsDialogOverviewComponent, {
      width: '400px',
      panelClass: 'teacher-details-dialog'
    });
    dialogRef.backdropClick().subscribe(() => {
      this.router.navigate(['../'], {
        relativeTo: this.route,
        replaceUrl: true
      });
    });
  }
}

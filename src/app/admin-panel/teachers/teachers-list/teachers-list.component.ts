import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit, OnDestroy {
  teachers;
  subscription: Subscription;
  filteredTeachers = '';

  constructor(
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.teachers = this.teachersStorageService.getTeachers();
    this.subscription = this.teachersStorageService.teachersChanged.subscribe(
      teachers => {
        this.teachers = teachers;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewTeacher() {
    this.router.navigate(['new'], { relativeTo: this.route, replaceUrl: true });
  }

  onTeacherDetails(id) {
    this.teachersStorageService.modalsId = id;
    this.router.navigate([id], { relativeTo: this.route, replaceUrl: true });
  }

  onEdit(id) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route, replaceUrl: true });
  }

  onDelete(teacher): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '20em',
      height: '12em',
      panelClass: ['confirmation-dialog'],
      data: {
        id: teacher.id,
        name: teacher.firstname,
        lastname: teacher.lastname
      }
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog/app-confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog/app-confirmation-dialog.scss']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private teachersStorageService: TeachersStorageService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  onDeleteClick() {
    this.teachersStorageService
      .deleteTeacher(this.data.id)
      .subscribe(response => {
        this.teachersStorageService.getTeachers();
        this.dialogRef.close();
        this.openSnackBar(
          `Викладач ${response.lastname} ${response.firstname} видалений`,
          'snack-class-success'
        );
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, classMessage: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = [classMessage];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }
}

let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('mine').style.bottom = '3.5em';
  } else {
    document.getElementById('mine').style.bottom = '-75px';
  }
  prevScrollpos = currentScrollPos;
};

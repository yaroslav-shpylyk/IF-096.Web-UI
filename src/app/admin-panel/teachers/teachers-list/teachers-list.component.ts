import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatSnackBarConfig,
  MatSort,
  MatTableDataSource
} from '@angular/material';

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
        this.teachersStorageService.teacherDeleted.next(this.data.id);
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

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit, OnDestroy {
  teachers;
  addSubscription: Subscription;
  editSubscription: Subscription;
  deleteSubscription: Subscription;
  dataSource;
  mappedTeachers = new Object() as any;


  displayedColumns: string[] = ['num', 'teacherCard', 'classes', 'subjects'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.addSubscription = this.teachersStorageService.teacherAdded.subscribe(resp => {
      const newTeacher: any = resp;
      this.mappedTeachers[newTeacher.id] = newTeacher;
      this.dataSource = new MatTableDataSource(Object.values(this.mappedTeachers));
    });

    this.editSubscription = this.teachersStorageService.teacherEdited.subscribe(resp => {
      const newTeacher: any = resp;
      Object.assign(this.mappedTeachers[newTeacher.id], newTeacher.obj);
      this.dataSource = new MatTableDataSource(Object.values(this.mappedTeachers));
    });

    this.deleteSubscription = this.teachersStorageService.teacherDeleted.subscribe(resp => {
      const toDelete: any = resp;
      delete this.mappedTeachers[toDelete];
      this.dataSource = new MatTableDataSource(Object.values(this.mappedTeachers));
    });

    this.teachersStorageService.getTeacherS().subscribe(arr => {
      const data = [];
      for (const teacher of arr) {
        data.push(this.teachersStorageService.getTeacherSubjectsClasses2(teacher));
      }

      forkJoin(data).subscribe(datas => {
        for (const el of datas) {
          this.mappedTeachers[el.id] = el;
        }
        this.teachers = datas;
        console.log(this.mappedTeachers);
        this.dataSource = new MatTableDataSource(datas);
        this.dataSource.sort = this.sort;
      });
    });


    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('mine').style.bottom = '4.5em';
      } else {
        document.getElementById('mine').style.bottom = '-75px';
      }
      prevScrollpos = currentScrollPos;
    };
  }

  ngOnDestroy() {
    this.addSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    window.onscroll = null;
  }

  onNewTeacher() {
    this.router.navigate(['new'], { relativeTo: this.route, replaceUrl: true });
  }

  onTeacherDetails(id) {
    // this.teachersStorageService.modalsId = id;
    this.teachersStorageService.teacherToDisplay = this.mappedTeachers[id];
    this.router.navigate([id], {
      relativeTo: this.route
    });
  }

  onEdit(id) {
    this.router.navigate([id, 'edit'], {
      relativeTo: this.route
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  valik(e) {
    console.log(e.target);
  }
}

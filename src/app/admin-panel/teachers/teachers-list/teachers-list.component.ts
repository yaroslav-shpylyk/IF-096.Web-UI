import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TeachersStorageService } from '../../../services/teachers-storage.service';
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

  /**
   * Method deletes previosly selected teacher by making
   * a request via deleteTeacher method from teachersStorageService,
   * then closes the current modal dialog and inform result in a snackbar.
   */
  onDeleteClick() {
    this.teachersStorageService
      .deleteTeacher(this.data.id)
      .subscribe(response => {
        this.teachersStorageService.teacherDeleted.next(this.data.id);
        this.dialogRef.close();
        this.openSnackBar(
          `Викладач ${response.lastname} ${response.firstname} видалений`,
          'snack-class-success-teacher'
        );
      });
  }

  /**
   * Method closes confirmation dialog without doing any action.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Method opens the snack-bar with a message
   * @param message - message which must be displayed
   * @param classMessage - Extra CSS classes to be added to the snack bar container.
   */
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
  addSubscription: Subscription;
  editSubscription: Subscription;
  deleteSubscription: Subscription;
  dataSource: MatTableDataSource<{}> | MatTableDataSource<any>;
  mappedTeachers = new Object() as any;

  displayedColumns: string[] = [
    'num',
    'teacherCard',
    'classes',
    'subjects',
    'dots'
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterInp')
  filt: ElementRef;

  constructor(
    private teachersStorageService: TeachersStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.addSubscription = this.teachersStorageService.teacherAdded.subscribe(
      resp => {
        const newTeacher = resp;
        this.mappedTeachers[newTeacher.id] = newTeacher;
        this.dataSource = new MatTableDataSource(
          Object.values(this.mappedTeachers)
        );
        this.dataSource.sort = this.sort;
      }
    );

    this.editSubscription = this.teachersStorageService.teacherEdited.subscribe(
      resp => {
        const newTeacher = resp;
        Object.assign(this.mappedTeachers[newTeacher.id], newTeacher.obj);
        this.dataSource = new MatTableDataSource(
          Object.values(this.mappedTeachers)
        );
        this.dataSource.sort = this.sort;
      }
    );

    this.deleteSubscription = this.teachersStorageService.teacherDeleted.subscribe(
      resp => {
        const toDelete = resp;
        delete this.mappedTeachers[toDelete];
        this.dataSource = new MatTableDataSource(
          Object.values(this.mappedTeachers)
        );
        this.dataSource.sort = this.sort;
        this.filt.nativeElement.value = '';
      }
    );

    /**
     * Right after getting an array of teachers it is transformed into
     * mapped type object with teachers ids being as keys.
     * So that one may manipulate further on
     * and react to adding/editing/deleting teachers.
     */
    this.teachersStorageService.getTeachersWithClasses().subscribe(teachers => {
      for (const el of teachers) {
        this.mappedTeachers[el.id] = el;
      }
      this.dataSource = new MatTableDataSource(teachers);
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * Method navigates to the new rout which is
   * dedicated for a component creating a new teacher.
   */
  onNewTeacher() {
    this.router.navigate(['new'], { relativeTo: this.route, replaceUrl: true });
  }

  /**
   * Once the teacher is cliked its object is passed
   * to the service so that it may be fetched from there
   * and used as source of data for appropriate component.
   * @param id - id number of a tecaher to be shown.
   */
  onTeacherDetails(id: number) {
    this.teachersStorageService.teacherToDisplay = this.mappedTeachers[id];
    this.router.navigate([id], {
      relativeTo: this.route
    });
  }

  /**
   * Method navigates to the new rout which is
   * dedicated for a component editing selected teacher.
   * @param id - id number of a tecaher to be edited.
   */
  onEdit(id: number) {
    this.teachersStorageService.teacherToDisplay = this.mappedTeachers[id];
    this.router.navigate([id, 'edit'], {
      relativeTo: this.route
    });
  }

  /**
   * Method takes teacher object and opens a deleting
   * modal dialog passing there teacher information.
   * @param teacher - object representing a tecaher to be deleted.
   */
  onDelete(teacher: { id: number; firstname: string; lastname: string }): void {
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

  /**
   * Method receives input data from a filter field,
   * turns it into lower case and assigns it
   * to the table data source.
   * @param filterValue - string of provided value to filter by.
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.addSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }
}

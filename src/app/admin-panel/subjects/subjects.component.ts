import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectData } from 'src/app/models/subject-data';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ModifySubjectsComponent } from './modify-subjects/modify-subjects.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public subjects: SubjectData[];
  public displayedColumns: string[] = ['subjectName', 'subjectDescription', 'edit'];
  public dataSource: MatTableDataSource<SubjectData>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public subjectService: SubjectService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.showList();
  }

  /**
   * Method shows a list of subjects
   */
  showList() {
    this.subjectService.getSubjects().subscribe(result => {
      this.subjects = result;
      this.dataSource = new MatTableDataSource(this.subjects);
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * Method which filter value in table,removes the leading
   * and trailing white space and line terminator characters from a string.
   * @param filterValue - input value for which is filtered
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Method open a dialog window, send data to the dialog window,
   * update list of subjects
   * @param subject - data which sends to the dialog window
   */
  openDialog(subject: any): void {
    const dialogRef = this.dialog.open(ModifySubjectsComponent, {
      data: (subject) ? { ...subject } : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) { return; }
      const index = this.subjects.findIndex(subj => subj.subjectId === result.data.subjectId);
      if (index >= 0) {
        this.subjects[index] = result.data;
      } else {
        this.subjects = [...this.subjects, result.data];
      }
      this.dataSource.data = this.subjects;
    });
  }
}

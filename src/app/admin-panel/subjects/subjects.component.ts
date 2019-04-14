import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectData } from 'src/app/models/subject-data';
import { MatTableDataSource } from '@angular/material';
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

  constructor(public subjectService: SubjectService,
  public dialog: MatDialog) { }

  ngOnInit() {
    this.showList();
  }

  showList() {
    this.subjectService.getSubjects().subscribe(result => {
      this.subjects = result;
      this.dataSource = new MatTableDataSource(this.subjects);
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

  openDialog(element: Object): void {
    const dialogRef = this.dialog.open(ModifySubjectsComponent, {
      data: (element) ? element : SubjectData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.subjects = [...this.subjects, result.data];
      this.subjects = this.dataSource.data;
    });
  }
}

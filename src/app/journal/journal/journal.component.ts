import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TeacherData } from '../../models/teacher-data';
import { TeachersStorageService } from '../../services/teachers-storage.service';
import { ClassService } from '../../services/class.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  filter: string;
  activeClasses = [];
  inactiveClasses = [];
  teachers: TeacherData[];
  chosenOption = 'activeClasses';

  displayedColumns: string[] = ['nums', 'className', 'classYear'];
  dataSource: MatTableDataSource<{}>;

  @ViewChild('sortCol') sortCol: MatSort;

  constructor(
    private teachersStorageService: TeachersStorageService,
    private classService: ClassService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Method fetches from all class and teachers, sorts them in appropriate
   * arrays and creates a tables depending on received values.
   */
  ngOnInit() {
    this.classService.getClasses('all').subscribe(classes => {
      for (const clas of classes) {
        if (clas.isActive) {
          this.activeClasses.push(clas);
        } else {
          this.inactiveClasses.push(clas);
        }
      }

      this.dataSource = new MatTableDataSource(this[this.chosenOption]);
      this.dataSource.sort = this.sortCol;
    });

    this.teachersStorageService.getTeacherS().subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  /**
   * Method receives event object from a radio group and
   * depending upon its value provides data for the table source.
   * On each radio toggling the filter is applied.
   * @param e - event object from a radio group.
   */
  handleChange(e: { value: string; }) {
    this.displayedColumns =
      e.value === 'teachers'
        ? ['nums', 'lastname', 'firstname']
        : ['nums', 'className', 'classYear'];
    this.dataSource = new MatTableDataSource(this[e.value]);
    this.dataSource.sort = this.sortCol;
    this.applyFilter(this.filter);
  }

  /**
   * Method receives input data from a filter field
   * in class table turns it into lower case and assigns it
   * to the table data source.
   * @param filterValue - string of provided value to filter by.
   */
  applyFilter(filterValue: string = '') {
    this.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filter;
  }

  /**
   * Method navigates to the route with
   * selected class from appropriate row
   * @param row - object representing a class.
   * @param chosenOption - string representing either class or teacher id.
   */
  selectRow(row: { id: any; }, chosenOption: string) {
    const path = chosenOption === 'teachers' ? 'teacher' : 'class';
    this.router.navigate([path, row.id], {
      relativeTo: this.route
    });
  }
}

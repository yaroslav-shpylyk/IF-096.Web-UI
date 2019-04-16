import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Group } from '../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { AddModifyGroupComponent } from './add-modify/add-modify.component';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  groups: Group[];
  displayedColumns: string[] = ['className', 'classYear', 'isActive', 'id'];
  dataSourceActivClass: MatTableDataSource<Group>;
  dataSourceCloseClass: MatTableDataSource<Group>;


  constructor(
    private groupServices: GroupsService,
    public dialog: MatDialog
   ) { }

  ngOnInit() {
    this.refreshGroups();

    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('buttonAdd').style.bottom = '1.3em';
      } else {
        document.getElementById('buttonAdd').style.bottom = '-1.3em';
      }
      prevScrollpos = currentScrollPos;
    };
  }

  ngOnDestroy() {
    window.onscroll = null;
  }

  /**
   * Method filters the search for open classes
   */
  applyFilterForActiveClass(filterValue: string) {
    this.dataSourceActivClass.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Method filters the search for closed classes
   */
  applyFilterForCloseClass(filterValue: string) {
    this.dataSourceCloseClass.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Method open popups sheet, send data to the popups sheet,
   *  updates list of class after closing popups sheet
   */
  openPopupsSheet(element: object) {
    const sheet = this.dialog.open(AddModifyGroupComponent, {
      hasBackdrop: true,
      data: (element) ? element : Group
    });

    sheet.afterClosed().subscribe((data?) => {
      if (data) {
        this.groups.push(data);
        this.matTableFilter();
      }
    });
  }

  /**
   * Method updates list of class
   */
  refreshGroups() {
    this.groupServices.getGroups().subscribe(data => {
      this.groups = data;
      this.matTableFilter();
    });
  }

  /**
   * Method creates the possibility for sorting classes
   */
  matTableFilter() {
    this.dataSourceActivClass = new MatTableDataSource(this.groups
      .filter((value: Group, index: number, array: Group[]) => array[index].isActive));
    this.dataSourceActivClass.sort = this.sort;
    this.dataSourceCloseClass = new MatTableDataSource(this.groups
      .filter((value: Group, index: number, array: Group[]) => !array[index].isActive));
    this.dataSourceCloseClass.sort = this.sort;
  }
}

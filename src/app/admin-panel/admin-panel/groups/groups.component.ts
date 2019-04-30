import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { Group } from '../../../models/group-data.model';
import { GroupsService } from '../../../services/groups.service';
import { AddModifyGroupComponent } from './add-modify/add-modify.component';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  groups: Group[];
  displayedColumns: string[] = ['className', 'classYear', 'isActive', 'id'];
  dataSourceActivClass: MatTableDataSource<Group>;
  dataSourceCloseClass: MatTableDataSource<Group>;
  prevScrollpos = window.pageYOffset;

  @HostListener('window:scroll', [])
  onScrollEvent() {
    const currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      document.getElementById('buttonAdd').style.bottom = '0.9em';
    } else {
      document.getElementById('buttonAdd').style.bottom = '-2.3em';
    }
    this.prevScrollpos = currentScrollPos;
  }

  constructor(
    private groupServices: GroupsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshGroups();
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
  openPopupsSheet(element: any): void {
    const sheet = this.dialog.open(AddModifyGroupComponent, {
      data: (element) ? { ...element } : {}
    });

    sheet.afterClosed().subscribe((data) => {
      if (data === undefined) { return; }
      let addOrEdit = true;
      this.groups.filter((value: Group, index: number, array: Group[]) => {
        if (array[index].id === data.id) {
          this.groups[index] = data;
          addOrEdit = false;
        }
      });
      if (addOrEdit) {
        this.groups = [...this.groups, data];
      }
      this.sorting();
      this.matTableFilter();
    });
  }

  /**
   * Method updates list of class
   */
  refreshGroups() {
    this.groupServices.getGroups().subscribe(data => {
      this.groups = data;
      this.sorting();
      this.matTableFilter();
    });
  }

  /**
   * Method creates the possibility for sorting classes
   */
  matTableFilter() {
    this.dataSourceActivClass = new MatTableDataSource(this.groups
      .filter(gr => gr.isActive));
    this.dataSourceActivClass.sort = this.sort;
    this.dataSourceCloseClass = new MatTableDataSource(this.groups
      .filter(gr => !gr.isActive));
    this.dataSourceCloseClass.sort = this.sort;
  }

  /**
   * Method sorts classes
   */
  sorting() {
    this.groups.sort( (a, b) => parseInt(a.className, 10) - parseInt(b.className, 10));
  }
}

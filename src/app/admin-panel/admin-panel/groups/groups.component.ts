import { Component, OnInit, ViewChild } from '@angular/core';

import { Group } from '../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
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
  

  constructor(private groupServices: GroupsService,
  public dialog: MatDialog) { }
           
  ngOnInit() {
    this.refreshGroups()
  }

  applyFilterForActiveClass(filterValue: string) {
    this.dataSourceActivClass.filter = filterValue.trim().toLowerCase();
  }

  applyFilterForCloseClass(filterValue: string) {
    this.dataSourceCloseClass.filter = filterValue.trim().toLowerCase();
  }


  /**
  * Method open bottom sheet, send data to the bottom sheet,
  *  updates list of class after closing bottom sheet
  */
  openBottomSheet(element:Object) {
    let sheet = this.dialog.open(AddModifyGroupComponent,{
      hasBackdrop: true,
      data: (element) ? element : Group   
    });
    sheet.afterClosed().subscribe(()=> this.refreshGroups())
  }
    
  /**
  * Method updates list of class and creates the possibility of sorting them
  */
  refreshGroups(){
    this.groupServices.getGroups().subscribe( data =>  {
      this.groups = data;
      this.dataSourceActivClass = new MatTableDataSource(this.groups
        .filter((value: Group, index: number, array: Group[]) => {
         return array[index].isActive;
      }));
      this.dataSourceActivClass.sort = this.sort;
      this.dataSourceCloseClass = new MatTableDataSource(this.groups
        .filter((value: Group, index: number, array: Group[]) => {
         return !array[index].isActive;
      }));
      this.dataSourceCloseClass.sort = this.sort;
    });
  }
}
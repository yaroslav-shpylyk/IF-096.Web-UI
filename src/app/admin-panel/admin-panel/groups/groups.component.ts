import { Component, OnInit, ViewChild } from '@angular/core';

import { Group } from '../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { AddModifyComponent } from './add-modify/add-modify.component';
import {MatBottomSheet, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  groups: Group[];
  displayedColumns: string[] = ['className', 'classYear', 'isActive', 'id'];
  dataSource: MatTableDataSource<Group>;

  constructor(private groupServices: GroupsService,
              private bottomSheet: MatBottomSheet) { }
           
    ngOnInit() {
      this.refreshGroups()
    }

   /**
   * Method open bottom sheet, send data to the bottom sheet,
   *  updates list of class after closing bottom sheet
   */
    openBottomSheet(element:Object) {
      let sheet = this.bottomSheet.open(AddModifyComponent,{
        hasBackdrop: true,
        data: (element) ? element : Group   
      });
      sheet.afterDismissed().subscribe(()=> this.refreshGroups())
    }
    
   /**
   * Method updates list of class and creates the possibility of sorting them
   */
  refreshGroups(){
    this.groupServices.getGroups().subscribe( data =>  {
      this.groups = data;
      this.dataSource = new MatTableDataSource(this.groups);
      this.dataSource.sort = this.sort;
    });
  }

}

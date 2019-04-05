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

    openBottomSheet(element: Object) {
      this.bottomSheet.open(AddModifyComponent,{
        hasBackdrop: true,
        data: element
      });
    }

    openBottomSheetAdd() {
      let sheet = this.bottomSheet.open(AddModifyComponent,{
        hasBackdrop: true,
        data: Group
      });

      sheet.afterDismissed().subscribe(()=>{
        this.refreshGroups()
      }) 
    }
    
  ngOnInit() {
    this.refreshGroups()
    setTimeout(()=>console.log(this.groups), 5000); 
  }
  
  refreshGroups(){
    this.groupServices.getGroups().subscribe( data =>  {
      this.groups = data;
      this.dataSource = new MatTableDataSource(this.groups);
      console.log(this.dataSource)
      this.dataSource.sort = this.sort;
    });
  }

}

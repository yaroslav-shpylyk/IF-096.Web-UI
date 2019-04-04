import { Component, OnInit } from '@angular/core';

import { Group } from '../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { FormControl } from '@angular/forms';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { map } from 'rxjs/operators';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';




@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  
  groups: Group[];
  groupsTrue = [];
  groupsFolse = [];
  groupCh:any
  displayedColumns: string[] = ['className', 'classYear', 'isActive'];
  
  constructor(private groupServices: GroupsService,
    private bottomSheet: MatBottomSheet
    ) { }

  
    openBottomSheet(): void {
      this.bottomSheet.open(BottomSheetOverviewExampleSheet);
    }

  ngOnInit() {
    this.refreshGroups()
    console.log(this.groups)
    
  }

  refreshGroups(){
    this.groupServices.getGroups().subscribe( data => this.groups = data);
    
  }

  dataChengGroup(group: any){
    return this.groupCh = group;
  }

  dataAddGroup(fields: Object){
    const group = new Group(fields);
    group.classDescription = null;
    group.className = null;
    group.classYear = null;
    group.id = null;
    group.isActive = false;
    return this.groupCh = group;
  }
  test(){
    for (let i = 0; i < this.groups.length; i++){
      if (this.groups[i].isActive === true){
        this.groupsTrue.push(this.groups[i]);
      }else {
        this.groupsFolse.push(this.groups[i]);
      }
    }
    console.log(this.groups)
    console.log(this.groupsTrue)
    console.log(this.groupsFolse)

  }

}
////////////////////////////////////////////////////////////////////*/
@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'add-modify/add-modify.component.html',
  styleUrls: ['add-modify/add-modify.component.scss']
})


export class BottomSheetOverviewExampleSheet implements OnInit {

  groups: Group[];
  toggleForID = false;
  dataСhosenRechange:any;
  nameChange:any;
  yearChange:any;
  infaChange:any;
  idChange:any;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    private groupServices: GroupsService,
    private groupComponent: GroupsComponent) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit() {
   // this.changeGroup(this.groupComponent.groupCh)
  }

  addGrup(fields: Object) {
    const group = new Group(fields);
    if (Number(group.id)){
      this.groupServices.addGrup(group).subscribe(
        _ => this.groupComponent.refreshGroups()
      )
    }else {
      this.groupServices.addGrup(group).subscribe(
        (group) => {
          return this.groupComponent.groups.push(group)
        }
      );
    }
  }

  changeGroup(groupData: any){

    this.dataСhosenRechange = groupData; 
    
    this.nameChange = new FormControl('');
    this.nameChange.setValue(this.dataСhosenRechange.className);
    this.yearChange = new FormControl('');
    this.yearChange.setValue(this.dataСhosenRechange.classYear);
    this.infaChange = new FormControl('');
    this.infaChange.setValue(this.dataСhosenRechange.classDescription);
    this.idChange = new FormControl('');
    this.idChange.setValue(this.dataСhosenRechange.id);
  }
}


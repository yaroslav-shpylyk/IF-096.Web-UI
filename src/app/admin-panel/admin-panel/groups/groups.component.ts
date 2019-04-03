import { Component, OnInit } from '@angular/core';

import { Group } from '../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { FormControl } from '@angular/forms';
import { AddModifyComponent } from './add-modify/add-modify.component';



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  
  
  groups: Group[];
  
  groupCh:any

  
 
  constructor(private groupServices: GroupsService) { }

  ngOnInit() {
    this.refreshGroups()
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
    group.isActive = true;
    group.numOfStudents = null;
    return this.groupCh = group;
  }
}


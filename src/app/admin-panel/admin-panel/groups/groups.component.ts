import { Component, OnInit } from '@angular/core';

import { Group } from '../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { FormControl } from '@angular/forms';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { map } from 'rxjs/operators';




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
  
  constructor(private groupServices: GroupsService) { }

  


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


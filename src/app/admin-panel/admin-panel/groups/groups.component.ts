import { Component, OnInit } from '@angular/core';

import { Group } from '../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  
  
  groups: Group[];
  
 
  constructor(private groupServices: GroupsService) { }

  ngOnInit() {
    this.refreshGroups()
  }

  refreshGroups(){
    this.groupServices.getGroups().subscribe( data => this.groups = data);
  }
  go(){

  }
}


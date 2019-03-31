import { Component, OnInit } from '@angular/core';


import { Group } from '../../../models/group-data.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GroupsService } from 'src/app/services/groups.service';



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  
  groups: Group[];
  isShow: boolean = false;
  isShow2: boolean = false;
 
  constructor(private groupServices: GroupsService) { }

  ngOnInit() {
    this.refreshGroups()
  }

  refreshGroups(){
    this.groupServices.getGroups().subscribe( data => this.groups = data);
  }

  addGrup(fields: Object) {
    const group = new Group(fields);
    this.groupServices.addGrup(group).subscribe(
      group => this.groups.push(group)
    );
  }
}

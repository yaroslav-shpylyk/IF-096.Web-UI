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
  
  groups: Observable<Group[]>
  response: any;

  
  constructor(private groupServices: GroupsService) { }

  ngOnInit() {
    this.groups = this.groupServices.getGroups()
  }

}

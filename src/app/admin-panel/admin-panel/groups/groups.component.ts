import { Component, OnInit } from '@angular/core';


import { Group } from '../../../models/group-data.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GroupsService } from 'src/app/services/groups.service';
import { FormControl } from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';




@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  
  groups: Group[];
  toggleForAcniveGroups: boolean = false;
  toggleForNotAcniveGroups: boolean = false;
  toggleForAddGroups: boolean = false;
  toggleForRechangeGroups: boolean = false;
  dataСhosenRechange:any;
  dataСhosenRechange2 = 'fdf';
  nameChange:any;
  yearChange:any;
  infaChange:any;
  idChange:any;
 
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

  changeGroup(groupCh:any){
    this.toggleForRechangeGroups = !this.toggleForRechangeGroups
    if(this.toggleForAcniveGroups){
      this.toggleForAcniveGroups = !this.toggleForAcniveGroups
    }
    if (this.toggleForNotAcniveGroups){
      this.toggleForNotAcniveGroups = !this.toggleForNotAcniveGroups
    }
    this.dataСhosenRechange = groupCh;

    this.nameChange = new FormControl('');
    this.nameChange.setValue(this.dataСhosenRechange.className);

    this.yearChange = new FormControl('');
    this.yearChange.setValue(this.dataСhosenRechange.classYear);

    this.infaChange = new FormControl('');
    this.infaChange.setValue(this.dataСhosenRechange.classDescription);

    this.idChange = new FormControl('');
    this.idChange.setValue(this.dataСhosenRechange.id);

    console.log(typeof this.dataСhosenRechange);
    console.log(this.dataСhosenRechange);
  }
}

import { Component, OnInit, Output } from '@angular/core';

import { Group } from '../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { FormControl } from '@angular/forms';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { map } from 'rxjs/operators';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  
  groups: Group[];
  groupsTrue = [];
  groupsFolse = [];

  displayedColumns: string[] = ['className', 'classYear', 'isActive'];
  
  constructor(private groupServices: GroupsService,
    private bottomSheet: MatBottomSheet,
    ) { }

  
    openBottomSheet(element?: Object) {
      let sheet = this.bottomSheet.open(AddModifyComponent,{
        backdropClass: "my-bakdrop",
        hasBackdrop: true,
        data: element
      });

      sheet.backdropClick().subscribe(()=> {
        console.log("bd cliced")
      })

      sheet.afterDismissed().subscribe((group)=>{
        this.groupServices.addGrup(group).subscribe(
          _ => this.refreshGroups()
        )
        console.log(group)
      })
    }

    
    openBottomSheetAdd() {
      let sheet = this.bottomSheet.open(AddModifyComponent,{
        backdropClass: "my-bakdrop",
        hasBackdrop: true,
        data: Group
      });

      sheet.backdropClick().subscribe(()=> {
        console.log("bd cliced")
      })

      sheet.afterDismissed().subscribe((group)=>{
        this.groupServices.addGrup(group).subscribe(
          (group) => {
            return this.groups.push(group)
          }
        );
        console.log(group)
      })
    }
    
    
  ngOnInit() {
    this.refreshGroups()
  }
  

  refreshGroups(){
    this.groupServices.getGroups().subscribe( data => this.groups = data);
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




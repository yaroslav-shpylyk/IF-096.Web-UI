import { Component, OnInit, Inject } from '@angular/core';

import { Group } from '../../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-add-modify',
  templateUrl: './add-modify.component.html',
  styleUrls: ['./add-modify.component.scss']
})
export class AddModifyComponent implements OnInit {

  myFirstReactiveForm: FormGroup;

  constructor(private bottomSheetRef: MatBottomSheetRef<AddModifyComponent>,
    private groupServices: GroupsService,
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

    abort(){
      this.bottomSheetRef.dismiss()
    }

    ngOnInit() {
    }
  
  save(fields: Object) {
    const group = new Group(fields);
    if (Number(group.id)){
      this.groupServices.addGrup(group);
    }else {
      this.groupServices.addGrup(group);
    }
  }
  
}

import { Component, OnInit, Inject } from '@angular/core';

import { Group } from '../../../../models/group-data.model';
import { GroupsService } from 'src/app/services/groups.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-modify',
  templateUrl: './add-modify.component.html',
  styleUrls: ['./add-modify.component.scss']
})

export class AddModifyGroupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddModifyGroupComponent>,
    private groupServices: GroupsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  /**
  * Method reports about closing bottom sheet
  */
  abort(group?: Object) {
    this.dialogRef.close(group)
  }

  /**
  * Method saves data about a new or modified class
  * @param formValue - data about the class that we want to change or create
  */
  save(data: Object) {
    const group = new Group(data);
    this.groupServices.addGrup(group).subscribe((data) => {
      if (group.id === undefined) {
        this.abort(data)
      } else {
        this.abort()
      }
    });
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddModifyComponent } from './admin-panel/groups/add-modify/add-modify.component';
import {MatInputModule, MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [AdminPanelComponent, GroupsComponent, AddModifyComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule

  ]
})
export class AdminPanelModule { }

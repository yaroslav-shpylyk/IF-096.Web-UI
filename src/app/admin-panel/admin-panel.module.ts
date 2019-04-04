import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent, BottomSheetOverviewExampleSheet } from './admin-panel/groups/groups.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddModifyComponent } from './admin-panel/groups/add-modify/add-modify.component';
import {MatInputModule, MatDialogModule, MatIconModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [AdminPanelComponent, GroupsComponent, AddModifyComponent,BottomSheetOverviewExampleSheet],
  entryComponents: [
    BottomSheetOverviewExampleSheet
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatListModule

  ],
  providers: [GroupsComponent]
})
export class AdminPanelModule { }

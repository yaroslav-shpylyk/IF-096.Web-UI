import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { GroupsComponent } from './admin-panel/groups/groups.component';

@NgModule({
  declarations: [AdminPanelComponent, GroupsComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule
  ]
})
export class AdminPanelModule { }

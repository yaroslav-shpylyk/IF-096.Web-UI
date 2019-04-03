import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }

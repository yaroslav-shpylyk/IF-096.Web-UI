import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentsListComponent } from './students-list/students-list.component';
import {ClassListResolve} from '../services/class-servise.resolve'

@NgModule({
  declarations: [AdminPanelComponent, StudentsListComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ],
  providers: [
    ClassListResolve
  ],
})
export class AdminPanelModule { }

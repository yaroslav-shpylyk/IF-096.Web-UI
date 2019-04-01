import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { ClassListResolve } from '../services/class-servise.resolve';
import { MatListModule } from '@angular/material/list';
import {PlatformModule} from '@angular/cdk/platform';

@NgModule({
  declarations: [AdminPanelComponent, StudentsListComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatListModule,
    PlatformModule
  ],
  providers: [
    ClassListResolve
  ],
})
export class AdminPanelModule { }

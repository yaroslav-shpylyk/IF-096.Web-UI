import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { MatListModule } from '@angular/material/list';
import { PlatformModule } from '@angular/cdk/platform';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [AdminPanelComponent, StudentsListComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatListModule,
    PlatformModule,
    MatButtonModule,
    MatSelectModule,
  ]

})
export class AdminPanelModule { }

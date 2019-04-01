import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { MatCardModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [AdminPanelComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class AdminPanelModule { }

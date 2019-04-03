import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShellComponent} from '../shell/shell/shell.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: ScheduleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }

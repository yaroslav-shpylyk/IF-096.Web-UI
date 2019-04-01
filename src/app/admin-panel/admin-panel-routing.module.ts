import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';
import { ShellComponent } from '../shell/shell/shell.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentsListComponent } from './students-list/students-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,

  },
  {
    path: 'students',
    component: StudentsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SubjectsComponent } from './admin-panel/subjects/subjects.component';
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent
  },
  {
    path: 'subjects',
    component: SubjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }

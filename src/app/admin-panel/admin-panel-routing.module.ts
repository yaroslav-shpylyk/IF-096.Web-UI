import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from '../shell/shell/shell.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DialogEntryComponent } from './teachers/teachers-list/details-dialog/details-dialog-overview';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { EditDialogEntryComponent } from './teachers/teachers-list/edit-dialog/edit-dialog';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent
  },
  {
    path: 'students',
    component: StudentsListComponent
  },
  {
    path: 'teachers',
    component: TeachersListComponent,
    children: [
      { path: 'new', component: EditDialogEntryComponent },
      {
        path: ':id',
        component: DialogEntryComponent
      },
      { path: ':id/edit', component: EditDialogEntryComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {}

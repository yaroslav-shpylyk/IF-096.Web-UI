import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from '../shell/shell/shell.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeachersComponent } from './teachers/teachers.component';
import { DefaultTeacherComponent } from './teachers/default-teacher/default-teacher.component';
import { TeacherDetailComponent } from './teachers/teacher-detail/teacher-detail.component';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { DialogEntryComponent } from './teachers/teachers-list/dialog/dialog-overview-example';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
 
const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent
  },
  { path: 'teachers/new', component: TeacherEditComponent },
  {
    path: 'teachers',
    component: TeachersListComponent,
    children: [
      {
        path: ':id',
        component: DialogEntryComponent
      }
    ]
  },
  { path: 'teachers/:id/edit', component: TeacherEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {}

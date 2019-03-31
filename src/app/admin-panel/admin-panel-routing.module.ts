import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from '../shell/shell/shell.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeachersComponent } from './teachers/teachers.component';
import { DefaultTeacherComponent } from './teachers/default-teacher/default-teacher.component';
import { TeacherDetailComponent } from './teachers/teacher-detail/teacher-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    children: [
      { path: '', component: DefaultTeacherComponent },
      { path: ':id', component: TeacherDetailComponent }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {}

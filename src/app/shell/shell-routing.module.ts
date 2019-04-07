import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { AdminPanelGuard } from '../admin-panel/admin-panel.guard';
import { StudentGuard } from '../services/student.guard';
import { TeachersGuard } from '../services/teachers.guard';

const routes: Routes = [
  {
    path: 'admin-panel',
    canActivate: [StudentGuard, TeachersGuard],
    canLoad: [StudentGuard, TeachersGuard],
    loadChildren: '../admin-panel/admin-panel.module#AdminPanelModule'
  },
  {
    path: 'journal',
    canActivate: [AdminPanelGuard, StudentGuard],
    canLoad: [AdminPanelGuard, StudentGuard],
    loadChildren: '../journal/journal.module#JournalModule'
  },
  {
    path: 'progress',
    canActivate: [AdminPanelGuard, StudentGuard],
    canLoad: [AdminPanelGuard, StudentGuard],
    loadChildren: '../progress/progress.module#ProgressModule'
  },
  {
    path: 'student-book',
    canActivate: [AdminPanelGuard, TeachersGuard],
    canLoad: [AdminPanelGuard, TeachersGuard],
    loadChildren: '../student-book/student-book.module#StudentBookModule'
  },
  {
    path: '',
    component: ShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }

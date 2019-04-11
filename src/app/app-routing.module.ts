import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellGuard } from './services/shell.guard';
import { AdminPanelGuard } from './services/admin-panel.guard';
import { TeachersGuard } from './services/teachers.guard';
import { StudentGuard } from './services/student.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'admin-panel',
    canActivate: [AdminPanelGuard],
    canLoad: [AdminPanelGuard],
    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule'
  },
  {
    path: 'journal',
    canActivate: [TeachersGuard],
    canLoad: [TeachersGuard],
    loadChildren: './journal/journal.module#JournalModule'
  },
  {
    path: 'student-book',
    canActivate: [StudentGuard],
    canLoad: [StudentGuard],
    loadChildren: './student-book/student-book.module#StudentBookModule'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

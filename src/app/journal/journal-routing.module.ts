import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { ClassJournalComponent } from './journal/class-journal/class-journal.component';
import { SubjectJournalComponent } from './journal/class-journal/subject-journal/subject-journal.component';
import { TeachersGuard } from '../services/teachers.guard';
import { AdminPanelGuard } from '../services/admin-panel.guard';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent
  },
  {
    path: 'class/:classId/subject/:subId',
    component: SubjectJournalComponent
  },
  {
    path: 'class/:id',
    component: ClassJournalComponent
  },
  {
    path: 'my-journals',
    component: ClassJournalComponent,
    canActivate: [TeachersGuard],
    canLoad: [TeachersGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule {}

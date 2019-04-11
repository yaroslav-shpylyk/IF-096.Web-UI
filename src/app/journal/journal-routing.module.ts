import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { ClassJournalComponent } from './journal/class-journal/class-journal.component';
import { SubjectJournalComponent } from './journal/class-journal/subject-journal/subject-journal.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule {}

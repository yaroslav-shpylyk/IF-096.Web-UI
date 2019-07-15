import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentBookComponent } from './student-book/student-book.component';
import { ScoresReportComponent } from './scores-report/scores-report.component';
const routes: Routes = [
  {
    path: '',
    component: StudentBookComponent
  },
  {
    path: 'scores',
    component: ScoresReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentBookRoutingModule { }

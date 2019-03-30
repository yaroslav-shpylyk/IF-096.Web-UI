import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPanelComponent} from '../admin-panel/admin-panel/admin-panel.component';
import {JournalComponent} from './journal/journal.component';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }

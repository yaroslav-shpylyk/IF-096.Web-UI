import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShellComponent} from '../shell/shell/shell.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {GroupsComponent} from './admin-panel/groups/groups.component';
import {AddModifyComponent} from './admin-panel/groups/add-modify/add-modify.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent
  },
  {
    path: 'groups',
    component: GroupsComponent,
    children: [
    {
      path: 'add-modify',
      component: AddModifyComponent
    }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }

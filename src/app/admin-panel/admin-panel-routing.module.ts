import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShellComponent} from '../shell/shell/shell.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import { GroupsComponent } from './admin-panel/groups/groups.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent
  },{
    path: 'groups',
    component: GroupsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }

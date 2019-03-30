import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MaterialModule } from '../material';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { DefaultTeacherComponent } from './teachers/default-teacher/default-teacher.component';

@NgModule({
  declarations: [AdminPanelComponent, TeachersComponent, TeachersListComponent, DefaultTeacherComponent],
  imports: [CommonModule, AdminPanelRoutingModule, MaterialModule]
})
export class AdminPanelModule {}

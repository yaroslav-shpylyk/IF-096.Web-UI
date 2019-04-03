import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SubjectsComponent } from './admin-panel/subjects/subjects.component';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [AdminPanelComponent, SubjectsComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AdminPanelModule { }

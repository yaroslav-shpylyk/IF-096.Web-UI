import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MaterialModule } from '../material';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogEntryComponent } from './teachers/teachers-list/dialog/dialog-overview';
import { StudentsListComponent } from './students-list/students-list.component';
import { MatListModule } from '@angular/material/list';
import { PlatformModule } from '@angular/cdk/platform';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatInputModule,
  MatRadioModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AdminPanelComponent,
    TeachersComponent,
    TeachersListComponent,
    TeacherEditComponent,
    DialogEntryComponent,
    StudentsListComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    PlatformModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ChartsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule

  ]

})
export class AdminPanelModule {}

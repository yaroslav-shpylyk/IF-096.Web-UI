import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MaterialModule } from '../material';
import { TeachersListComponent, ConfirmationDialogComponent } from './teachers/teachers-list/teachers-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogEntryComponent, DetailsDialogOverviewComponent } from './teachers/teachers-list/details-dialog/details-dialog-overview';
import { StudentsListComponent } from './students-list/students-list.component';
import { MatListModule } from '@angular/material/list';
import { PlatformModule } from '@angular/cdk/platform';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { EditDialogEntryComponent, EditDialogOverviewComponent } from './teachers/teachers-list/edit-dialog/edit-dialog';
import { FilterPipe } from './teachers/helpers/filter.pipe';

@NgModule({
  declarations: [
    AdminPanelComponent,
    TeachersComponent,
    TeachersListComponent,
    DialogEntryComponent,
    StudentsListComponent,
    EditDialogEntryComponent,
    FilterPipe,
    DetailsDialogOverviewComponent,
    EditDialogOverviewComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    DetailsDialogOverviewComponent,
    EditDialogOverviewComponent,
    ConfirmationDialogComponent
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
    MatSelectModule
  ]
})
export class AdminPanelModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MaterialModule } from '../material.module';
import { TeachersListComponent, ConfirmationDialogComponent } from './teachers/teachers-list/teachers-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogEntryComponent, DetailsDialogOverviewComponent } from './teachers/teachers-list/details-dialog/details-dialog-overview';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentDatails, StudentDetailModalComponent } from './students-list/student-detail-modal/student-detail-modal.component';
import { MatListModule } from '@angular/material/list';
import { PlatformModule } from '@angular/cdk/platform';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddModifyGroupComponent } from './admin-panel/groups/add-modify/add-modify.component';
import { MatInputModule, MatDialogModule, MatIconModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { EditDialogEntryComponent, EditDialogOverviewComponent } from './teachers/teachers-list/edit-dialog/edit-dialog';
import { FilterPipe } from './teachers/helpers/filter.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSortModule } from '@angular/material/sort';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { MatMenuModule } from '@angular/material';

@NgModule({
  declarations: [
    AdminPanelComponent,
    GroupsComponent,
    AddModifyGroupComponent,
    TeachersComponent,
    TeachersListComponent,
    DialogEntryComponent,
    StudentsListComponent,
    EditDialogEntryComponent,
    FilterPipe,
    DetailsDialogOverviewComponent,
    EditDialogOverviewComponent,
    ConfirmationDialogComponent,
    DashboardComponent,
    StudentDatails,
    StudentDetailModalComponent
  ],
  entryComponents: [
    DetailsDialogOverviewComponent,
    EditDialogOverviewComponent,
    ConfirmationDialogComponent,
    StudentDetailModalComponent,
    DashboardComponent,
    AddModifyGroupComponent,

  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    PlatformModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    ChartsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MaterialModule
  ],
  providers: [GroupsComponent]
})
export class AdminPanelModule { }

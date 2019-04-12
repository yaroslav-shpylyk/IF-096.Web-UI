import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatListModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDividerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    FlexLayoutModule,
    LayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatBottomSheetModule
  ],
  exports: [
    MatButtonModule,
    FlexLayoutModule,
    LayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatBottomSheetModule
  ]
})
export class MaterialModule {}
